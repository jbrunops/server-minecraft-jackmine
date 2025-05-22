import React, { useEffect, useState, useRef, CSSProperties } from 'react';
import PlayerCounter from '../components/PlayerCounter';

// Interfaces para tipagem
interface ParticleProps {
  style: CSSProperties;
}

interface MinecraftBlockProps {
  type: string;
  style: CSSProperties;
}

// Componente de partícula para o fundo
const Particle: React.FC<ParticleProps> = ({ style }) => {
  return <div className="absolute rounded-full opacity-20 bg-white" style={style} />;
};

// Componente de bloco flutuante do Minecraft
const MinecraftBlock: React.FC<MinecraftBlockProps> = ({ type, style }) => {
  const blockClasses = {
    grass: "bg-minecraft-grass",
    dirt: "bg-minecraft-dirt",
    stone: "bg-minecraft-stone",
    wood: "bg-minecraft-wood",
    diamond: "bg-minecraft-diamond",
  };

  return (
    <div 
      className={`absolute shadow-lg ${blockClasses[type] || 'bg-gray-500'}`} 
      style={{
        width: '30px',
        height: '30px',
        borderRadius: '4px',
        ...style,
      }}
    />
  );
};

// Estilos para animações personalizadas
const animationStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes spin-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes pulse-glow {
    0%, 100% { opacity: 0.4; filter: blur(8px); }
    50% { opacity: 0.8; filter: blur(12px); }
  }
  
  @keyframes bounce-subtle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
  
  .animate-pulse-glow {
    animation: pulse-glow 4s ease-in-out infinite;
  }
  
  .animate-bounce-subtle {
    animation: bounce-subtle 3s ease-in-out infinite;
  }
  
  .animate-reverse {
    animation-direction: reverse;
  }
  
  .text-shadow {
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
`;

interface Particle {
  id: string;
  size: number;
  x: number;
  y: number;
  opacity: number;
  duration: number;
  delay: number;
}

interface Block {
  id: string;
  type: string;
  x: number;
  y: number;
  rotation: number;
  duration: number;
  delay: number;
  scale: number;
}

const HomePage: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  // Inicializar partículas
  useEffect(() => {
    if (!heroRef.current) return;
    
    // Criar partículas de fundo
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: `particle-${i}`,
      size: Math.random() * 5 + 2, // 2-7px
      x: Math.random() * 100, // posição x em %
      y: Math.random() * 100, // posição y em %
      opacity: Math.random() * 0.5 + 0.1, // 0.1-0.6
      duration: Math.random() * 15 + 10, // 10-25s
      delay: Math.random() * 5, // 0-5s
    }));
    
    // Criar blocos flutuantes
    const blockTypes = ['grass', 'dirt', 'stone', 'wood', 'diamond'];
    const newBlocks = Array.from({ length: 8 }).map((_, i) => ({
      id: `block-${i}`,
      type: blockTypes[Math.floor(Math.random() * blockTypes.length)],
      x: Math.random() * 80 + 10, // 10-90%
      y: Math.random() * 80 + 10, // 10-90%
      rotation: Math.random() * 360, // 0-360 graus
      duration: Math.random() * 20 + 15, // 15-35s
      delay: Math.random() * 5, // 0-5s
      scale: Math.random() * 0.7 + 0.5, // 0.5-1.2
    }));
    
    setParticles(newParticles);
    setBlocks(newBlocks);
  }, []);

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Estilos inline para animações */}
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      
      {/* Hero Section com Logo em Destaque e Animações */}
      <div ref={heroRef} className="relative overflow-hidden py-16 md:py-24 text-center rounded-3xl mb-12">
        {/* Fundo com gradiente animado */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100"></div>
        
        {/* Círculos de brilho animados */}
        <div className="absolute left-1/4 top-1/4 w-64 h-64 rounded-full bg-blue-300/20 animate-pulse-glow"></div>
        <div className="absolute right-1/4 bottom-1/4 w-80 h-80 rounded-full bg-purple-300/20 animate-pulse-glow animate-reverse"></div>
        
        {/* Grade de padrão pixelizado - estilo Minecraft */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[length:16px_16px]"></div>
        
        {/* Partículas flutuantes */}
        {particles.map((particle) => (
          <Particle 
            key={particle.id}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
        
        {/* Blocos estilo Minecraft flutuantes */}
        {blocks.map((block) => (
          <MinecraftBlock 
            key={block.id}
            type={block.type}
            style={{
              left: `${block.x}%`,
              top: `${block.y}%`,
              transform: `rotate(${block.rotation}deg) scale(${block.scale})`,
              animation: `float ${block.duration}s ease-in-out infinite`,
              animationDelay: `${block.delay}s`,
              opacity: 0.7,
              zIndex: 1,
            }}
          />
        ))}
        
        {/* Conteúdo principal com efeitos */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo com animação suave de flutuação */}
          <div className="relative mb-6 animate-float">
            <img 
              src="/logo.png" 
              alt="JackMine Logo" 
              className="w-[21.12rem] md:w-[26.4rem] h-auto drop-shadow-xl"
            />
            
            {/* Efeito de brilho atrás do logo */}
            <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 
                           rounded-full blur-2xl animate-pulse-glow"></div>
          </div>
          
          {/* Descrição com animação de entrada */}
          <p className="text-lg md:text-2xl max-w-3xl mx-auto text-gray-700 mb-8 font-medium animate-bounce-subtle text-shadow">
            Seu novo servidor favorito de Minecraft com os melhores kits e diversão garantida!
          </p>
          
          {/* Botão com efeitos de hover e animação */}
          <div className="relative group mt-2">
            <a 
              href="/assinaturas" 
              className="inline-block btn-secondary text-lg px-8 py-4 rounded-xl transform 
                       transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg 
                       group-hover:shadow-secondary/20 group-active:scale-95 relative z-10"
            >
              Ver Assinaturas
              
              {/* Ícone animado */}
              <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
            </a>
            
            {/* Efeito de brilho no hover */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-secondary/50 to-blue-600/50 
                          opacity-0 group-hover:opacity-100 blur-xl rounded-xl transition-all duration-500"></div>
          </div>
        </div>
      </div>
      
      <div className="my-10">
        <PlayerCounter />
      </div>
      
      <div className="my-10">
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
      
      <div className="my-10 py-8 bg-white rounded-xl shadow-sm">
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
      
      <div className="my-10 py-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl shadow-sm">
        <h2 className="section-title text-center">Siga-nos nas Redes Sociais</h2>
        <div className="flex justify-center items-center mt-4">
          <a 
            href="https://www.instagram.com/jackmineserver/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            <span className="font-medium">@jackmineserver</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
