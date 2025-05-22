import React, { useState, useEffect } from 'react';

const PlayerCounter = () => {
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPlayerCount = async () => {
      setIsLoading(true);
      try {
        // Em produção, você deve implementar uma API que consulta o servidor Minecraft
        // Aqui estamos simulando essa consulta com um número aleatório
        // const response = await fetch('https://api.mcsrvstat.us/2/190.102.40.99:26040');
        // const data = await response.json();
        // setPlayerCount(data.players?.online || 0);
        
        // Simulação de contagem
        setTimeout(() => {
          setPlayerCount(Math.floor(Math.random() * 50) + 10);
          setIsLoading(false);
        }, 1000);
        
      } catch (err) {
        console.error('Erro ao buscar contagem de jogadores:', err);
        setError('Não foi possível obter o número de jogadores online');
        setIsLoading(false);
      }
    };

    fetchPlayerCount();
    
    // Atualizar a cada 5 minutos
    const intervalId = setInterval(fetchPlayerCount, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="card text-center p-8 max-w-md mx-auto shadow-lg border-t-4 border-secondary">
      <h2 className="text-2xl font-bold text-primary mb-6">Jogadores Online</h2>
      
      {isLoading ? (
        <div className="text-gray-500">Carregando...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold text-secondary mb-2">
            {playerCount}
          </div>
          <div className="text-gray-600">
            jogadores ativos agora
          </div>
        </div>
      )}
      
      <div className="mt-8 bg-gray-50 p-4 rounded-md border border-gray-100">
        <p className="font-medium">
          Entre agora: <span className="text-secondary font-bold select-all">190.102.40.99:26040</span>
        </p>
      </div>
    </div>
  );
};

export default PlayerCounter;
