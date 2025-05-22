
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.0.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// Desativar verificação JWT para esta função (webhook público)
// Configure no config.toml: verify_jwt = false

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2022-11-15",
      httpClient: Stripe.createFetchHttpClient(),
    });
    
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("Assinatura do webhook não encontrada");
    }

    // Obter o webhook secret do ambiente
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET não configurada");
    }

    // Obter o corpo da requisição como texto
    const body = await req.text();
    
    // Verificar assinatura do webhook
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error(`Erro na validação do webhook: ${err.message}`);
      return new Response(JSON.stringify({ error: `Assinatura de webhook inválida` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // Inicializar o cliente Supabase com a chave de serviço para bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
    );

    console.log(`Evento webhook recebido: ${event.type}`);

    // Processar diferentes tipos de eventos
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const { username, product_type, product_id } = session.metadata;
        const { customer, amount_total, payment_status } = session;
        
        console.log(`Checkout concluído: ${session.id}, usuário: ${username}, tipo: ${product_type}`);

        // Registrar o pedido no banco de dados
        if (product_type === 'subscription') {
          // Para assinaturas, precisamos buscar detalhes da assinatura
          const subscriptions = await stripe.subscriptions.list({
            customer,
            limit: 1,
          });
          
          if (subscriptions.data.length > 0) {
            const subscription = subscriptions.data[0];
            const endDate = new Date(subscription.current_period_end * 1000);
            
            // Criar ou atualizar registro de assinatura
            await supabaseAdmin.from('subscriptions').upsert({
              username,
              email: session.customer_details.email,
              subscription_type: product_id, // 'vip' ou 'top'
              stripe_customer_id: customer,
              stripe_subscription_id: subscription.id,
              end_date: endDate.toISOString(),
              status: 'active',
              updated_at: new Date().toISOString()
            }, { onConflict: 'username,subscription_type' });
          }
        } else {
          // Para compras únicas (itens)
          await supabaseAdmin.from('orders').insert({
            email: session.customer_details.email,
            username,
            stripe_session_id: session.id,
            product_type,
            product_id,
            amount: amount_total,
            status: payment_status === 'paid' ? 'completed' : 'pending'
          });
        }
        
        // Aqui você pode adicionar código para interagir com a API do Minecraft
        // Por exemplo, dar itens ao jogador ou ativar recursos VIP
        break;
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const customer = await stripe.customers.retrieve(subscription.customer);
        const username = customer.metadata.username;
        const status = subscription.status;
        
        console.log(`Assinatura atualizada: ${subscription.id}, status: ${status}`);
        
        if (username) {
          // Atualizar status da assinatura no banco de dados
          await supabaseAdmin.from('subscriptions').update({
            status: status === 'active' ? 'active' : 'inactive',
            end_date: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString()
          }).eq('stripe_subscription_id', subscription.id);
        }
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        console.log(`Assinatura cancelada: ${subscription.id}`);
        
        // Atualizar status da assinatura no banco de dados
        await supabaseAdmin.from('subscriptions').update({
          status: 'canceled',
          updated_at: new Date().toISOString()
        }).eq('stripe_subscription_id', subscription.id);
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200
    });
    
  } catch (error) {
    console.error(`Erro no webhook: ${error.message}`);
    
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500
    });
  }
});
