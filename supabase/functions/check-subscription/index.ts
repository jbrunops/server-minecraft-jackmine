
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Inicializar o cliente Supabase
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_ANON_KEY") || ""
    );

    // Obter dados da requisição
    const { username } = await req.json();
    
    if (!username) {
      throw new Error("Nome de usuário não fornecido");
    }

    console.log(`Verificando assinaturas para: ${username}`);

    // Buscar assinaturas ativas do usuário
    const { data: subscriptions, error: subscriptionError } = await supabaseClient
      .from('subscriptions')
      .select('*')
      .eq('username', username)
      .eq('status', 'active')
      .order('subscription_type', { ascending: false }) // 'top' vem antes de 'vip' alfabeticamente
      .limit(1);

    if (subscriptionError) {
      throw new Error(`Erro ao buscar assinaturas: ${subscriptionError.message}`);
    }

    // Buscar pedidos recentes do usuário
    const { data: orders, error: ordersError } = await supabaseClient
      .from('orders')
      .select('*')
      .eq('username', username)
      .eq('status', 'completed')
      .order('created_at', { ascending: false })
      .limit(5);

    if (ordersError) {
      throw new Error(`Erro ao buscar pedidos: ${ordersError.message}`);
    }

    // Determinar o tipo de assinatura atual
    let subscriptionType = "FREE";
    let subscriptionEnd = null;
    
    if (subscriptions && subscriptions.length > 0) {
      const activeSubscription = subscriptions[0];
      subscriptionType = activeSubscription.subscription_type.toUpperCase();
      subscriptionEnd = activeSubscription.end_date;
    }

    console.log(`Status da assinatura para ${username}: ${subscriptionType}`);
    
    return new Response(
      JSON.stringify({
        subscriptionType,
        subscriptionEnd,
        orders: orders || []
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
    
  } catch (error) {
    console.error(`Erro ao verificar assinatura: ${error.message}`);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});
