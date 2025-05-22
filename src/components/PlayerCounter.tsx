import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getRealServerStatus } from '../services/minecraftService';

// IP e porta corretos do servidor Minecraft
const MINECRAFT_SERVER_IP = '190.102.40.99';
const MINECRAFT_SERVER_PORT = '26040';
const MINECRAFT_SERVER_ADDRESS = `${MINECRAFT_SERVER_IP}:${MINECRAFT_SERVER_PORT}`;

// Componente de partícula flutuante
const Particle = ({ color, size, delay, duration, left }: { 
  color: string; 
  size: number; 
  delay: number; 
  duration: number;
  left: string;
}) => {
  return (
    <div 
      className="absolute bottom-0 z-0 rounded-full opacity-60"
      style={{
        backgroundColor: color,
        width: `${size}px`,
        height: `${size}px`,
        left: left,
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    />
  );
};

const PlayerCounter = () => {
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const [maxPlayers, setMaxPlayers] = useState<number>(20);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [serverOnline, setServerOnline] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  
  // Gerar partículas
  const particles = useMemo(() => {
    const particleCount = 12;
    const colors = ['#4299E1', '#9F7AEA', '#ED64A6', '#48BB78', '#ECC94B'];
    
    return Array.from({ length: particleCount }).map((_, i) => ({
      color: colors[i % colors.length],
      size: Math.floor(Math.random() * 6) + 3,
      delay: Math.random() * 5,
      duration: Math.floor(Math.random() * 6) + 7,
      left: `${(i * 100) / particleCount}%`,
      key: i,
    }));
  }, []);
  
  // Função para buscar contagem de jogadores
  const fetchPlayerCount = useCallback(async () => {
    setIsLoading(true);
    setError(null); // Limpar erros anteriores
    console.log('PlayerCounter: Iniciando fetchPlayerCount em:', new Date().toISOString());
    try {
      // Busca o status real do servidor
      console.log('PlayerCounter: Chamando getRealServerStatus');
      const serverStatus = await getRealServerStatus();
      console.log('PlayerCounter: Dados recebidos de getRealServerStatus:', JSON.stringify(serverStatus, null, 2));
      
      setServerOnline(serverStatus.online);
      
      if (serverStatus.online) {
        // Verifica explicitamente se o número de jogadores é um número válido
        const currentPlayers = typeof serverStatus.players.current === 'number' 
          ? serverStatus.players.current 
          : 0;
          
        console.log('PlayerCounter: Atualizando contagem de jogadores para:', currentPlayers);
        setPlayerCount(currentPlayers);
        setMaxPlayers(serverStatus.players.max || 20);
        console.log('PlayerCounter: Servidor online. Contagem de jogadores definida para:', currentPlayers);
      } else {
        setError('Servidor offline no momento. Tente novamente mais tarde.');
        setPlayerCount(0); // Definir como 0 quando offline
        console.warn('PlayerCounter: Servidor reportado como offline pela API.', serverStatus);
      }
    } catch (err) {
      console.error('PlayerCounter: Erro ao buscar contagem de jogadores:', err);
      setError('Não foi possível obter o número de jogadores online');
      setPlayerCount(0); // Definir como 0 em caso de erro
      setServerOnline(false);
    } finally {
      setIsLoading(false);
      console.log('PlayerCounter: fetchPlayerCount finalizado.');
    }
  }, []);
  
  useEffect(() => {
    fetchPlayerCount();
    
    // Atualizar a cada 30 segundos 
    const intervalId = setInterval(fetchPlayerCount, 30 * 1000);
    
    return () => clearInterval(intervalId);
  }, [fetchPlayerCount]);

  const copyServerAddress = () => {
    navigator.clipboard.writeText(MINECRAFT_SERVER_ADDRESS);
    setShowCopiedMessage(true);
    setTimeout(() => setShowCopiedMessage(false), 2000);
  };

  // Classe para animação de brilho
  const glowAnimation = `
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 15px rgba(66, 153, 225, 0.5); }
      50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.8); }
    }
  `;

  return (
    <div className="relative overflow-hidden rounded-2xl max-w-lg mx-auto transform hover:scale-[1.02] transition-all duration-300">
      {/* Estilos para keyframes personalizados */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        ${glowAnimation}
      `}</style>

      {/* Fundo animado com gradientes */}
      <div className="absolute inset-0 bg-gradient-to-br from-minecraft-stone via-minecraft-dirt to-minecraft-grass opacity-20 z-0"></div>
      
      {/* Padrão de grade criado com CSS em vez de imagem */}
      <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] bg-[length:10px_10px] opacity-5 animate-[pulse_8s_ease-in-out_infinite] z-0"></div>
      
      {/* Brilho sutil animado */}
      <div className="absolute -inset-[100px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-30 animate-[spin_15s_linear_infinite] z-0"></div>
      
      {/* Partículas flutuantes */}
      {particles.map((particle) => (
        <Particle key={particle.key} {...particle} />
      ))}
      
      {/* Conteúdo principal com borda brilhante */}
      <div className="relative z-10 bg-white/90 backdrop-blur-sm p-8 border-t-4 border-secondary 
                     shadow-[0_10px_50px_rgba(8,_112,_184,_0.7)] rounded-2xl"
           style={{ animation: 'glow 3s infinite' }}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
        
        {/* Título com efeito de destaque */}
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6 animate-pulse">
          Jogadores Online
        </h2>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-4">
            <div className="w-16 h-16 border-4 border-t-secondary border-b-secondary border-l-transparent border-r-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Verificando servidor...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 mb-4 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="animate-pulse">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="text-red-500 mb-2 font-medium">{error}</div>
            <div className="text-6xl font-bold text-gray-400 mb-2 animate-pulse">0</div>
            <div className="text-gray-500 font-medium">Servidor indisponível</div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Número animado de jogadores */}
            <div className="relative">
              <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-secondary to-purple-500 mb-2" 
                   style={{ animation: 'float 4s ease-in-out infinite' }}>
                {playerCount !== null ? playerCount : '0'}
              </div>
              {/* Efeito de brilho */}
              <div className="absolute -inset-4 bg-blue-500/20 blur-xl rounded-full animate-pulse opacity-70 -z-10"></div>
            </div>
            
            <div className="text-gray-600 text-lg font-medium mb-2">
              {serverOnline 
                ? `jogadores ativos agora` 
                : `servidor offline`}
            </div>
            
            {/* Barra de progresso estilizada */}
            {serverOnline && (
              <div className="w-full mt-2 mb-4">
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-secondary rounded-full transition-all duration-700 ease-in-out"
                    style={{ width: `${Math.max(5, (playerCount || 0) / maxPlayers * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>{maxPlayers} máx</span>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Botão de conexão com animação */}
        <div className="mt-6 relative group">
          <button 
            onClick={copyServerAddress}
            className="w-full py-3 px-4 bg-gradient-to-r from-minecraft-grass to-minecraft-water text-white rounded-lg font-medium 
                     transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/30
                     transform group-hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
          >
            <span style={{ animation: 'float 2s ease-in-out infinite', animationDelay: '0.15s' }}>Entre agora:</span>
            <span className="font-mono font-bold select-all">{MINECRAFT_SERVER_ADDRESS}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          </button>
          
          {/* Mensagem de copiado */}
          <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-md 
                          transition-all duration-300 ${showCopiedMessage ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            IP copiado! ✓
          </div>
          
          {/* Efeito de brilho no hover */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-70 blur-xl rounded-lg transition-opacity duration-500"></div>
        </div>
        
        {/* Decoração com emoji de picareta em vez da imagem */}
        <div className="absolute -bottom-1 -right-1 text-3xl" style={{ animation: 'float 3s ease-in-out infinite', opacity: 0.6 }}>⛏️</div>
      </div>
    </div>
  );
};

export default PlayerCounter;
