
import { supabase } from "@/integrations/supabase/client";

export interface StripeCheckoutOptions {
  username: string;
  email: string;
  productType: 'subscription' | 'item';
  productId: string;
  price: number;
  productName: string;
}

// Criar uma sessão de checkout do Stripe
export const createCheckoutSession = async (options: StripeCheckoutOptions): Promise<{ url: string }> => {
  console.log('Criando sessão de checkout do Stripe com as opções:', options);
  
  try {
    // Chamar a função edge para criar a sessão de checkout
    const { data, error } = await supabase.functions.invoke('create-checkout', {
      body: options
    });
    
    if (error) {
      console.error('Erro ao criar sessão de checkout:', error);
      throw new Error(`Falha ao criar sessão de checkout: ${error.message}`);
    }
    
    if (!data?.url) {
      throw new Error('URL de checkout não retornada pelo servidor');
    }
    
    return { url: data.url };
  } catch (err) {
    console.error('Erro ao processar checkout:', err);
    throw err;
  }
};

// Verificar o status de um pagamento
export const checkPaymentStatus = async (sessionId: string): Promise<{ 
  status: 'paid' | 'pending' | 'failed', 
  details?: Record<string, any> 
}> => {
  console.log('Verificando status do pagamento para a sessão:', sessionId);
  
  // Em um ambiente real, isso faria uma chamada para verificar
  // o status do pagamento através da API do Stripe
  
  // Simulando um atraso de rede
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulando um pagamento bem-sucedido para demonstração
  return {
    status: 'paid',
    details: {
      amount: 1490,
      currency: 'brl',
      payment_method: 'card',
      receipt_url: '#'
    }
  };
};

// Verificar o status da assinatura de um usuário
export const checkSubscriptionStatus = async (username: string): Promise<{
  subscriptionType: 'FREE' | 'VIP' | 'TOP',
  subscriptionEnd: string | null,
  orders: any[]
}> => {
  try {
    // Chamar a função edge para verificar o status da assinatura
    const { data, error } = await supabase.functions.invoke('check-subscription', {
      body: { username }
    });
    
    if (error) {
      console.error('Erro ao verificar status da assinatura:', error);
      throw new Error(`Falha ao verificar assinatura: ${error.message}`);
    }
    
    return {
      subscriptionType: data.subscriptionType || 'FREE',
      subscriptionEnd: data.subscriptionEnd,
      orders: data.orders || []
    };
  } catch (err) {
    console.error('Erro ao verificar assinatura:', err);
    // Em caso de erro, assume que o usuário tem plano FREE
    return {
      subscriptionType: 'FREE',
      subscriptionEnd: null,
      orders: []
    };
  }
};

// Simula a integração com o webhook do Stripe
export const handleWebhookEvent = (eventType: string, data: any) => {
  console.log('Webhook do Stripe recebido:', eventType, data);
  
  // Em um ambiente real, isso processaria eventos do webhook do Stripe
  // como 'checkout.session.completed', 'payment_intent.succeeded', etc.
  
  // E chamaria a API do servidor Minecraft para atualizar a conta do jogador
  if (eventType === 'checkout.session.completed') {
    updateMinecraftAccount(data.customer_email, data.metadata.username, data.metadata.product_type, data.metadata.product_id);
  }
};

// Simula a atualização da conta do jogador no servidor Minecraft
export const updateMinecraftAccount = async (
  email: string, 
  username: string, 
  productType: string, 
  productId: string
): Promise<{ success: boolean, message: string }> => {
  // Em um ambiente real, isso faria uma chamada para a API do servidor Minecraft
  // para atualizar os privilégios e itens da conta do jogador
  
  console.log(`Atualizando conta do jogador ${username} no servidor Minecraft`);
  console.log(`Email: ${email}, Tipo de produto: ${productType}, ID do produto: ${productId}`);
  
  // Simulando um atraso de rede
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Simulando uma resposta bem-sucedida
  return {
    success: true,
    message: `A conta do jogador ${username} foi atualizada com sucesso!`
  };
};
