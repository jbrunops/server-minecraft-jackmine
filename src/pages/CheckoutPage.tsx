import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { createCheckoutSession } from '../services/stripeService';

// Corrigindo a interface para satisfazer a restrição
interface CheckoutParams {
  type?: string;
  itemId?: string;
}

const CheckoutPage = () => {
  // useParams agora espera um tipo Record<string, string | undefined>
  const params = useParams<Record<string, string | undefined>>();
  const { type, itemId } = params;
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: false,
    email: false,
  });

  // Determine what the user is purchasing
  let title = '';
  let price = 0;
  let description = '';

  if (type === 'vip') {
    title = 'Plano VIP';
    price = 19.90;
    description = 'Acesso VIP por 30 dias com itens e permissões exclusivas';
  } else if (type === 'top') {
    title = 'Plano TOP';
    price = 29.90;
    description = 'Acesso TOP por 30 dias com itens raros e todas as permissões';
  } else if (type === 'item' && itemId) {
    // Aqui você deverá ter uma lógica para buscar os detalhes do item pelo ID
    // Este é apenas um exemplo simplificado
    const itemDetails = {
      'enchanted-diamond-sword': {
        title: 'Espada de Diamante Encantada',
        price: 15.00,
        description: 'Espada poderosa com Afiação V e Inquebrável III'
      },
      'elytra': {
        title: 'Elytra',
        price: 25.00,
        description: 'Voe pelos céus com este item raro'
      },
      // Adicione mais itens conforme necessário
    };
    
    const item = itemDetails[itemId as keyof typeof itemDetails];
    if (item) {
      title = item.title;
      price = item.price;
      description = item.description;
    } else {
      navigate('/');
      return null;
    }
  } else {
    navigate('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    const newErrors = {
      username: username.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(email),
    };
    
    setErrors(newErrors);
    
    if (newErrors.username || newErrors.email) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Criar opções para o checkout do Stripe
      const productType = type === 'item' ? 'item' : 'subscription';
      const productId = type === 'item' ? itemId! : type;
      
      // Chamar o serviço real de checkout do Stripe
      const { url } = await createCheckoutSession({
        username,
        email,
        productType,
        productId,
        price,
        productName: title
      });
      
      toast.success("Redirecionando para o checkout...", {
        description: "Você será redirecionado para a página de pagamento do Stripe."
      });
      
      // Redirecionar para o URL de checkout do Stripe
      window.location.href = url;
    } catch (error) {
      console.error("Erro ao criar sessão de checkout:", error);
      toast.error("Erro ao processar o pagamento", {
        description: "Ocorreu um erro ao tentar criar sua sessão de checkout."
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="section-title">Finalizar Compra</h1>
          <p className="text-gray-600">Complete suas informações para prosseguir</p>
        </div>
        
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4 text-primary">Resumo do Pedido</h2>
          
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Produto:</span>
              <span className="font-bold">{title}</span>
            </div>
            <div className="text-gray-600 mb-4">{description}</div>
            <div className="flex justify-between border-t border-gray-200 pt-3">
              <span className="font-medium">Total:</span>
              <span className="text-xl font-bold text-secondary">R$ {price.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="card">
          <h2 className="text-xl font-bold mb-6 text-primary">Suas Informações</h2>
          
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">
              Nome de Usuário no Minecraft
            </label>
            <input
              type="text"
              id="username"
              className={`w-full bg-white border ${
                errors.username ? 'border-red-500' : 'border-gray-300'
              } text-gray-900 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary`}
              placeholder="Seu nome no jogo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                Por favor, informe seu nome de usuário no Minecraft
              </p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              E-mail para Contato
            </label>
            <input
              type="email"
              id="email"
              className={`w-full bg-white border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } text-gray-900 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary`}
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                Por favor, informe um e-mail válido
              </p>
            )}
          </div>
          
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="terms"
              className="mr-2 h-4 w-4 accent-secondary"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              Concordo com os <a href="#" className="text-secondary hover:underline">Termos de Serviço</a>
            </label>
          </div>
          
          <button 
            type="submit" 
            className={`btn-primary w-full text-lg ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Processando...' : 'Prosseguir para Pagamento'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
