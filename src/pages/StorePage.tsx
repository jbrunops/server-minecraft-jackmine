
import React from 'react';
import { Link } from 'react-router-dom';

interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

const StorePage = () => {
  const storeItems: StoreItem[] = [
    {
      id: 'enchanted-diamond-sword',
      name: 'Espada de Diamante Encantada',
      description: 'Espada poderosa com Afiação V e Inquebrável III',
      price: 15.00,
      imageUrl: '/assets/diamond_sword.png',
      category: 'armas'
    },
    {
      id: 'elytra',
      name: 'Elytra',
      description: 'Voe pelos céus com este item raro',
      price: 25.00,
      imageUrl: '/assets/elytra.png',
      category: 'mobilidade'
    },
    {
      id: 'enderchest',
      name: 'Baú de Ender',
      description: 'Acesse seu inventário de qualquer lugar',
      price: 10.00,
      imageUrl: '/assets/enderchest.png',
      category: 'utilidades'
    },
    {
      id: 'home-command',
      name: 'Comando /home extra',
      description: 'Defina mais um ponto de home para teletransporte',
      price: 8.00,
      imageUrl: '/assets/command.png',
      category: 'comandos'
    },
    {
      id: 'shulker-box',
      name: 'Caixa de Shulker',
      description: 'Armazenamento portátil para seus itens',
      price: 12.00,
      imageUrl: '/assets/shulker.png',
      category: 'utilidades'
    },
    {
      id: 'beacon',
      name: 'Sinalizador',
      description: 'Obtenha efeitos de status em uma área',
      price: 20.00,
      imageUrl: '/assets/beacon.png',
      category: 'utilidades'
    },
  ];

  const categories = ['todos', 'armas', 'mobilidade', 'utilidades', 'comandos'];
  const [activeCategory, setActiveCategory] = React.useState('todos');
  
  const filteredItems = activeCategory === 'todos' 
    ? storeItems 
    : storeItems.filter(item => item.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-minecraft mb-2">Loja JACKMINE</h1>
        <p className="max-w-2xl mx-auto">
          Compre itens especiais e comandos para melhorar sua experiência no servidor.
          Todos os itens são entregues instantaneamente após a confirmação do pagamento.
        </p>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-center flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`minecraft-button px-4 py-2 capitalize ${
                activeCategory === category 
                  ? 'bg-minecraft-grass border-green-700' 
                  : ''
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="minecraft-panel hover:border-minecraft-grass transition-colors">
            <div className="h-40 bg-black bg-opacity-40 flex items-center justify-center mb-4 overflow-hidden">
              <div className="w-24 h-24 bg-gray-800 rounded flex items-center justify-center animate-float">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-20 h-20 object-contain opacity-90"
                />
              </div>
            </div>
            
            <h3 className="text-lg font-minecraft mb-2">{item.name}</h3>
            <p className="text-sm mb-4 text-gray-300">{item.description}</p>
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-yellow-300 font-minecraft">
                R$ {item.price.toFixed(2)}
              </span>
              <Link 
                to={`/pagamento/item/${item.id}`} 
                className="minecraft-button bg-green-700 hover:bg-green-600"
              >
                Comprar
              </Link>
            </div>
            
            <div className="mt-4 text-xs text-gray-400">
              <span className="py-1 px-2 bg-black bg-opacity-30 rounded capitalize">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <Link to="/assinaturas" className="minecraft-button bg-purple-800 hover:bg-purple-700 text-xl px-8 py-3">
          Ver Planos de Assinatura
        </Link>
      </div>
    </div>
  );
};

export default StorePage;
