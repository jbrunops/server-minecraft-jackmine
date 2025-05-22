import React from 'react';
import KitDisplay, { KitProps } from '../components/KitDisplay';

const SubscriptionsPage = () => {
  const freeKitItems = [
    { name: "Tábuas de madeira", quantity: 32 },
    { name: "Carvões", quantity: 8 },
    { name: "Cobre bruto", quantity: 16 },
    { name: "Espada de pedra", quantity: 1 },
    { name: "Picareta de madeira", quantity: 1 },
    { name: "Enxada de madeira", quantity: 1 },
    { name: "Pá de madeira", quantity: 1 },
    { name: "Machado de madeira", quantity: 1 },
    { name: "Peitoral de couro", quantity: 1 },
    { name: "Calça de couro", quantity: 1 },
    { name: "Capacete de couro", quantity: 1 },
    { name: "Arco", quantity: 1 },
    { name: "Flechas", quantity: 10 },
    { name: "Vidros", quantity: 16 },
    { name: "Cama", quantity: 1 },
    { name: "Tocha", quantity: 1 },
    { name: "Mesa de trabalho", quantity: 1 },
    { name: "Fornalha", quantity: 1 },
  ];

  const vipKitItems = [
    { name: "Tochas", quantity: 32 },
    { name: "Lanternas", quantity: 6 },
    { name: "Tochas de redstone", quantity: 6 },
    { name: "Bigorna", quantity: 1 },
    { name: "Pó de redstone", quantity: 6 },
    { name: "Packs de vidro", quantity: 2 },
    { name: "Vidros", quantity: 128 },
    { name: "Madeiras", quantity: 128 },
    { name: "Troncos de carvalho descascado", quantity: 64 },
    { name: "Cercas de carvalho", quantity: 64 },
    { name: "Pá de diamante", quantity: 1 },
    { name: "Picareta de diamante", quantity: 1 },
    { name: "Machado de diamante", quantity: 1 },
    { name: "Enxada de diamante", quantity: 1 },
    { name: "Balde", quantity: 1 },
    { name: "Tesoura", quantity: 1 },
    { name: "Capacete de diamante", quantity: 1 },
    { name: "Peitoral de diamante", quantity: 1 },
    { name: "Calça de diamante", quantity: 1 },
    { name: "Bota de diamante", quantity: 1 },
    { name: "Armadura de ferro para cavalo", quantity: 1 },
    { name: "Arco", quantity: 1 },
    { name: "Flechas", quantity: 64 },
    { name: "Pães", quantity: 64 },
    { name: "Diamantes", quantity: 16 },
  ];

  const topKitItems = [
    { name: "Carvões", quantity: 64 },
    { name: "Diamantes", quantity: 64 },
    { name: "Barras de ouro", quantity: 64 },
    { name: "Esmeraldas", quantity: 64 },
    { name: "Quartzos do nether", quantity: 64 },
    { name: "Livro encantado com inquebrável 3", quantity: 1 },
    { name: "Livro encantado com fortuna 3", quantity: 1 },
    { name: "Pós de redstone", quantity: 64 },
    { name: "Frangos assados", quantity: 64 },
    { name: "Biscoitos", quantity: 64 },
    { name: "Maçãs", quantity: 64 },
    { name: "Barras de ferro", quantity: 64 },
    { name: "Vara de pescar", quantity: 1 },
    { name: "Farinhas de osso", quantity: 64 },
    { name: "Fogos de artifícios voo 1", quantity: 32 },
    { name: "Tesoura", quantity: 1 },
    { name: "Perdeneira", quantity: 1 },
    { name: "Espada de diamante", quantity: 1 },
    { name: "Capacete de diamante", quantity: 1 },
    { name: "Peitoral de diamante", quantity: 1 },
    { name: "Calça de diamante", quantity: 1 },
    { name: "Bota de diamante", quantity: 1 },
    { name: "Machado de diamante", quantity: 1 },
    { name: "Picareta de diamante", quantity: 1 },
    { name: "Enxada de diamante", quantity: 1 },
    { name: "Pá de diamante", quantity: 1 },
  ];

  const kits: KitProps[] = [
    {
      type: 'FREE',
      title: 'Plano FREE',
      description: 'Acesso básico ao servidor com itens limitados e poucas permissões.',
      price: 0,
      items: freeKitItems,
      bgColor: 'bg-gray-700',
      borderColor: 'border-gray-500'
    },
    {
      type: 'VIP',
      title: 'Plano VIP',
      description: 'Desbloqueie itens interessantes e permissões exclusivas!',
      price: 19.90,
      days: 30,
      items: vipKitItems,
      bgColor: 'bg-blue-900',
      borderColor: 'border-blue-500'
    },
    {
      type: 'TOP',
      title: 'Plano TOP',
      description: 'A experiência definitiva com itens raros e todas as permissões!',
      price: 29.90,
      days: 30,
      items: topKitItems,
      bgColor: 'bg-purple-900',
      borderColor: 'border-purple-500'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="section-title">Assinaturas</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Escolha o plano perfeito para sua aventura no servidor.
          Cada plano oferece benefícios exclusivos para melhorar sua experiência de jogo.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {kits.map((kit) => (
          <KitDisplay
            key={kit.type}
            type={kit.type}
            title={kit.title}
            description={kit.description}
            price={kit.price}
            days={kit.days}
            items={kit.items}
            bgColor={kit.bgColor}
            borderColor={kit.borderColor}
          />
        ))}
      </div>
      
      <div className="mt-16 bg-white p-8 rounded-xl shadow-sm max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Perguntas Frequentes</h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-secondary mb-2">Como funciona a renovação da assinatura?</h3>
            <p className="text-gray-600">
              As assinaturas não renovam automaticamente. Você precisa comprar novamente após o período de 30 dias.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-secondary mb-2">Posso mudar meu plano antes dos 30 dias?</h3>
            <p className="text-gray-600">
              Sim! Você pode fazer upgrade a qualquer momento. O período restante do seu plano atual
              será convertido proporcionalmente para o novo plano.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-secondary mb-2">Os kits são entregues automaticamente?</h3>
            <p className="text-gray-600">
              Sim! Após o pagamento ser confirmado, você receberá seus benefícios instantaneamente no servidor.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold text-secondary mb-2">O que acontece quando minha assinatura termina?</h3>
            <p className="text-gray-600">
              Quando sua assinatura terminar, você voltará ao plano FREE. Todos os itens que você já tinha
              não serão perdidos, mas você não poderá mais usar as permissões especiais.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
