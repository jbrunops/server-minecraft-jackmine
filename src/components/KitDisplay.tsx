import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { checkSubscriptionStatus } from '../services/stripeService';

export interface KitItemProps {
  name: string;
  quantity: number;
}

export interface KitProps {
  type: 'FREE' | 'VIP' | 'TOP';
  title: string;
  description: string;
  price: number;
  days?: number;
  items: KitItemProps[];
  bgColor: string;
  borderColor: string;
}

const KitDisplay = (props: KitProps) => {
  const { type, title, description, price, days, items, bgColor, borderColor } = props;
  const [showItems, setShowItems] = useState(false);
  const [userSubscription, setUserSubscription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [showCheck, setShowCheck] = useState(false);

  const checkUserSubscription = async () => {
    if (!username.trim()) {
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await checkSubscriptionStatus(username);
      setUserSubscription(result.subscriptionType);
      
      // Mostrar toast com resultado
      if (result.subscriptionType !== 'FREE') {
        const endDate = result.subscriptionEnd 
          ? new Date(result.subscriptionEnd).toLocaleDateString('pt-BR')
          : 'Indeterminado';
          
        alert(`${username} possui o plano ${result.subscriptionType} ativo até ${endDate}`);
      } else {
        alert(`${username} não possui nenhum plano ativo.`);
      }
    } catch (error) {
      console.error('Erro ao verificar assinatura:', error);
      alert('Erro ao verificar status da assinatura');
    } finally {
      setIsLoading(false);
    }
  };

  const isFree = type === 'FREE';
  const isActive = userSubscription === type;
  
  // Cores do tipo de plano
  const getPlanColors = () => {
    switch(type) {
      case 'VIP':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          highlight: 'text-blue-600',
          buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white'
        };
      case 'TOP':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          highlight: 'text-purple-600',
          buttonClass: 'bg-purple-600 hover:bg-purple-700 text-white'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          highlight: 'text-gray-600',
          buttonClass: 'bg-gray-600 hover:bg-gray-700 text-white'
        };
    }
  };
  
  const colors = getPlanColors();

  return (
    <div className={`card ${colors.bg} ${isActive ? 'ring-4 ring-green-400' : ''} relative`}>
      {isActive && (
        <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
          Seu Plano Atual
        </div>
      )}
      
      <h3 className={`text-2xl font-bold mb-2 ${colors.highlight}`}>{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-2xl font-bold text-primary">
            {isFree ? 'GRÁTIS' : `R$ ${price.toFixed(2)}`}
          </p>
          {days && <p className="text-sm text-gray-500">{days} dias</p>}
        </div>
        
        {!isFree && !isActive && (
          <Link 
            to={`/pagamento/${type.toLowerCase()}`} 
            className={`rounded-md px-6 py-3 font-medium shadow-md transition-all hover:shadow-lg active:translate-y-0.5 ${colors.buttonClass}`}
          >
            Comprar
          </Link>
        )}
        
        {isFree && !isActive && (
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">Plano básico</span>
        )}
        
        {isActive && (
          <span className="bg-green-500 text-white px-3 py-1 rounded-md text-sm font-medium">Ativo</span>
        )}
      </div>
      
      <div className="mb-6">
        <button 
          onClick={() => setShowItems(!showItems)}
          className="text-sm text-secondary hover:text-primary flex items-center font-medium"
        >
          {showItems ? 'Esconder itens' : 'Ver todos os itens'}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 ml-1 transform transition-transform ${showItems ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {showItems && (
          <div className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4 bg-gray-50 p-4 rounded-md text-sm">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-700">{item.name}</span>
                <span className={`font-medium ${colors.highlight}`}>x{item.quantity}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <button 
          onClick={() => setShowCheck(!showCheck)} 
          className="text-sm text-secondary hover:text-primary font-medium"
        >
          Verificar assinatura
        </button>
        
        {showCheck && (
          <div className="mt-4 bg-gray-50 p-4 rounded-md">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Seu nome no Minecraft"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="flex-grow bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button
                onClick={checkUserSubscription}
                disabled={isLoading || !username.trim()}
                className="btn-secondary text-sm px-3 py-2 disabled:opacity-50"
              >
                {isLoading ? 'Verificando...' : 'Verificar'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KitDisplay;
