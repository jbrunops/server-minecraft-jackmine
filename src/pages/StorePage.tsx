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
        <h1 className="section-title">Loja JACKMINE</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Compre itens especiais e comandos para melhorar sua experiência no servidor.
          Todos os itens são entregues instantaneamente após a confirmação do pagamento.
        </p>
      </div>
      
      <div className="mb-8">
        <div className="flex justify-center flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md font-medium capitalize transition-colors ${
                activeCategory === category 
                  ? 'bg-secondary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
          <div key={item.id} className="card hover:shadow-xl transition-all">
            <div className="h-48 bg-gray-50 flex items-center justify-center mb-4 rounded-md overflow-hidden">
              <div className="w-32 h-32 bg-white rounded-full shadow-inner flex items-center justify-center">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-24 h-24 object-contain"
                />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-primary mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-6">{item.description}</p>
            
            <div className="flex justify-between items-center mt-4">
              <span className="text-2xl font-bold text-primary">
                R$ {item.price.toFixed(2)}
              </span>
              <Link 
                to={`/pagamento/item/${item.id}`} 
                className="btn-secondary"
              >
                Comprar
              </Link>
            </div>
            
            <div className="mt-4 text-xs">
              <span className="py-1 px-2 bg-gray-100 rounded-full text-gray-600 capitalize">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <Link to="/assinaturas" className="btn-primary text-xl px-8 py-4">
          Ver Planos de Assinatura
        </Link>
      </div>
    </div>
  );
};

export default StorePage;
