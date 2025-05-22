import React, { useState, useEffect, useCallback } from 'react';
import { getRealServerStatus } from '../services/minecraftService';

// IP e porta corretos do servidor Minecraft
const MINECRAFT_SERVER_IP = '190.102.40.99';
const MINECRAFT_SERVER_PORT = '26040';
const MINECRAFT_SERVER_ADDRESS = `${MINECRAFT_SERVER_IP}:${MINECRAFT_SERVER_PORT}`;

const PlayerCounter = () => {
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const [maxPlayers, setMaxPlayers] = useState<number>(20);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [serverOnline, setServerOnline] = useState(false);
  
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

  return (
    <div className="card text-center p-8 max-w-md mx-auto shadow-lg border-t-4 border-secondary">
      <h2 className="text-2xl font-bold text-primary mb-6">Jogadores Online</h2>
      
      {isLoading ? (
        <div className="text-gray-500">Carregando...</div>
      ) : error ? (
        <div className="flex flex-col items-center">
          <div className="text-red-500 mb-2">{error}</div>
          <div className="text-5xl font-bold text-gray-400">0</div>
          <div className="text-gray-500">Servidor indisponível</div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold text-secondary mb-2">
            {playerCount !== null ? playerCount : '0'}
          </div>
          <div className="text-gray-600">
            {serverOnline 
              ? `jogadores ativos agora` 
              : `servidor offline`}
          </div>
        </div>
      )}
      
      <div className="mt-8">
        <p className="font-medium">
          Entre agora: <span className="text-secondary font-bold select-all">{MINECRAFT_SERVER_ADDRESS}</span>
        </p>
      </div>
    </div>
  );
};

export default PlayerCounter;
