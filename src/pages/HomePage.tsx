import React from 'react';
import PlayerCounter from '../components/PlayerCounter';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section com Logo em Destaque */}
      <div className="relative py-12 md:py-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50 rounded-xl"></div>
        <div className="relative z-10 flex flex-col items-center">
          <img 
            src="/logo.png" 
            alt="JackMine Logo" 
            className="w-[19.2rem] md:w-[24rem] h-auto mb-8 drop-shadow-lg"
          />
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700">
            Seu novo servidor favorito de Minecraft com os melhores kits e diversão garantida!
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/assinaturas" className="btn-secondary">Ver Assinaturas</a>
          </div>
        </div>
      </div>
      
      <div className="my-16">
        <PlayerCounter />
      </div>
      
      <div className="my-16">
        <h2 className="section-title text-center">Nossos Destaques</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="card hover:shadow-xl transition-shadow">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">Kits Exclusivos</h3>
              <p className="text-gray-600 text-center">
                Desbloqueie kits exclusivos com itens raros que vão dar uma vantagem
                em sua jornada no servidor.
              </p>
            </div>
          </div>
          
          <div className="card hover:shadow-xl transition-shadow">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">Assinaturas</h3>
              <p className="text-gray-600 text-center">
                Escolha entre FREE, VIP e TOP para obter mais permissões, itens e
                vantagens especiais no servidor.
              </p>
            </div>
          </div>
          
          <div className="card hover:shadow-xl transition-shadow">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">Comunidade</h3>
              <p className="text-gray-600 text-center">
                Junte-se a uma comunidade incrível de jogadores e divirta-se em 
                um ambiente amigável e seguro.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="my-16 py-12 bg-white rounded-xl shadow-sm">
        <h2 className="section-title text-center">Como Começar</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4">1</div>
            <h3 className="font-bold text-lg mb-2">Copie o IP</h3>
            <p className="text-gray-600 text-center">190.102.40.99:26040</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4">2</div>
            <h3 className="font-bold text-lg mb-2">Abra o Minecraft</h3>
            <p className="text-gray-600 text-center">Versão 1.18 ou superior</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4">3</div>
            <h3 className="font-bold text-lg mb-2">Adicione o Servidor</h3>
            <p className="text-gray-600 text-center">Cole o IP no campo "Endereço do Servidor"</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4">4</div>
            <h3 className="font-bold text-lg mb-2">Divirta-se!</h3>
            <p className="text-gray-600 text-center">Explore, construa e sobreviva</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
