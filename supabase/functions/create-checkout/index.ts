import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.0.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Inicializar o Stripe com a chave secreta
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2022-11-15",
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Obter dados do corpo da requisição
    const { username, email, productType, productId, price, productName } = await req.json();
    
    if (!username || !email || !productType || !productId || !price || !productName) {
      throw new Error("Dados incompletos para criação do checkout");
    }

    console.log(`Criando checkout para ${username}, produto: ${productName}, preço: ${price}`);

    // Verificar se já existe um cliente Stripe para este email
    const customers = await stripe.customers.list({ email, limit: 1 });
    let customerId;
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      console.log(`Cliente existente encontrado: ${customerId}`);
    } else {
      // Criar novo cliente Stripe
      const customer = await stripe.customers.create({
        email,
        name: username,
        metadata: { username }
      });
      customerId = customer.id;
      console.log(`Novo cliente criado: ${customerId}`);
    }

    // Configurar os itens de linha com base no tipo de produto
    const lineItems = [{
      price_data: {
        currency: "brl",
        product_data: { name: productName },
        unit_amount: Math.round(price * 100), // Stripe usa centavos
      },
      quantity: 1,
    }];

    // Determinar o modo de checkout (subscription ou payment)
    const mode = productType === "subscription" ? "subscription" : "payment";
    
    // Para assinaturas, configurar o intervalo de recorrência
    if (mode === "subscription") {
      lineItems[0].price_data.recurring = { interval: "month" };
    }

    // Criar a sessão de checkout
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: lineItems,
      mode,
      success_url: `${req.headers.get("origin")}/pagamento-sucesso`,
      cancel_url: `${req.headers.get("origin")}/${productType === "subscription" ? "assinaturas" : ""}`,
      metadata: {
        username,
        product_type: productType,
        product_id: productId
      }
    });

    console.log(`Sessão de checkout criada: ${session.id}`);
    
    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        },
        status: 200 
      }
    );
    
  } catch (error) {
    console.error(`Erro no checkout: ${error.message}`);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        },
        status: 500 
      }
    );
  }
});
