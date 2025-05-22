
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

  return (
    <div className={`${bgColor} border-2 ${borderColor} p-6 rounded-lg relative ${isActive ? 'ring-4 ring-green-500' : ''}`}>
      {isActive && (
        <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          Seu Plano Atual
        </div>
      )}
      
      <h3 className="text-2xl font-minecraft mb-2">{title}</h3>
      <p className="text-sm mb-4">{description}</p>
      
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-lg font-minecraft text-yellow-300">
            {isFree ? 'GRÁTIS' : `R$ ${price.toFixed(2)}`}
          </p>
          {days && <p className="text-xs text-gray-300">{days} dias</p>}
        </div>
        
        {!isFree && !isActive && (
          <Link 
            to={`/pagamento/${type.toLowerCase()}`} 
            className="minecraft-button bg-green-700 hover:bg-green-600"
          >
            Comprar
          </Link>
        )}
        
        {isFree && !isActive && (
          <span className="text-sm text-gray-300">Plano básico</span>
        )}
        
        {isActive && (
          <span className="bg-green-600 text-white px-3 py-1 rounded text-sm">Ativo</span>
        )}
      </div>
      
      <div className="mb-4">
        <button 
          onClick={() => setShowItems(!showItems)}
          className="text-sm text-blue-400 hover:underline flex items-center"
        >
          {showItems ? 'Esconder itens' : 'Ver todos os itens'}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 ml-1 transform ${showItems ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {showItems && (
          <div className="mt-2 grid grid-cols-2 gap-2 bg-black bg-opacity-30 p-3 rounded text-xs">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span className="text-yellow-300">x{item.quantity}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700">
        <button 
          onClick={() => setShowCheck(!showCheck)} 
          className="text-sm text-blue-400 hover:underline"
        >
          Verificar assinatura
        </button>
        
        {showCheck && (
          <div className="mt-2 bg-black bg-opacity-30 p-3 rounded">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Seu nome no Minecraft"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="flex-grow bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm"
              />
              <button
                onClick={checkUserSubscription}
                disabled={isLoading || !username.trim()}
                className="minecraft-button text-xs px-2 py-1 disabled:opacity-50"
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
