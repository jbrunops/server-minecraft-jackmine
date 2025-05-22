// Este serviço consulta API pública para obter status do servidor Minecraft
// Agora usando uma API alternativa (mcapi.us) mais confiável

export interface ServerStatus {
  online: boolean;
  players: {
    current: number;
    max: number;
    list: string[];
  };
  version: string;
  motd: string;
}

// Parâmetros do servidor Minecraft
const MINECRAFT_SERVER_IP = '190.102.40.99';
const MINECRAFT_SERVER_PORT = '26040';

// API alternativa que fornece status de servidores Minecraft
// Usando mcapi.us que é conhecida por ser mais confiável para alguns servidores
const ALTERNATIVE_API_URL = `https://mcapi.us/server/status?ip=${MINECRAFT_SERVER_IP}&port=${MINECRAFT_SERVER_PORT}`;

// Função que obtém o status real do servidor Minecraft diretamente da API pública
export const getRealServerStatus = async (): Promise<ServerStatus> => {
  console.log('minecraftService: Iniciando consulta ao servidor Minecraft usando API alternativa');
  try {
    // Adicionando timestamp para evitar cache do navegador
    const noCache = new Date().getTime();
    const urlWithNoCache = `${ALTERNATIVE_API_URL}&_=${noCache}`;
    
    // Consulta direta à API pública com configurações para evitar cache
    console.log('minecraftService: Consultando API alternativa em:', urlWithNoCache);
    const response = await fetch(urlWithNoCache, {
      method: 'GET',
      cache: 'no-store', // Força o navegador a não usar cache
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    if (!response.ok) {
      console.error('minecraftService: Resposta não-ok da API:', response.status);
      throw new Error(`Falha ao consultar status do servidor: ${response.status}`);
    }
    
    // Capturando o texto da resposta primeiro para debugging
    const responseText = await response.text();
    console.log('minecraftService: Texto da resposta da API alternativa:', responseText);
    
    // Parsing do JSON após logar o texto
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('minecraftService: Erro ao parsear JSON:', parseError);
      throw new Error('Resposta inválida da API');
    }
    
    console.log('minecraftService: Dados estruturados da API alternativa:', JSON.stringify(data, null, 2));
    console.log('minecraftService: Status online:', data.online);
    console.log('minecraftService: Jogadores online:', data.players?.now);
    
    // Verificando se o servidor está online
    if (!data.online) {
      console.log('minecraftService: Servidor reportado como offline');
      return {
        online: false,
        players: {
          current: 0,
          max: 0,
          list: []
        },
        version: 'Desconhecida',
        motd: 'Servidor offline'
      };
    }
    
    // Servidor online, retornando dados reais
    // API mcapi.us usa "players.now" em vez de "players.online"
    const playerCount = typeof data.players?.now === 'number' ? data.players.now : 0;
    console.log('minecraftService: Número final de jogadores a retornar:', playerCount);
    
    return {
      online: true,
      players: {
        current: playerCount,
        max: data.players?.max || 20,
        list: data.players?.sample || []
      },
      version: data.server?.name || 'Minecraft',
      motd: data.motd || 'Servidor Minecraft JackMine'
    };
  } catch (error) {
    console.error('minecraftService: Erro ao consultar servidor:', error.message);
    
    // Em caso de erro, retornar status offline em vez de online
    return {
      online: false, // Corrigido: agora retorna false em caso de erro
      players: {
        current: 0,
        max: 20,
        list: []
      },
      version: 'Minecraft',
      motd: 'Erro ao conectar ao servidor JACKMINE'
    };
  }
};

// As funções abaixo são mantidas para compatibilidade com o código existente

// Simula a obtenção do status do servidor (não usado mais)
export const getServerStatus = async (): Promise<ServerStatus> => {
  return getRealServerStatus(); // Agora sempre usa o status real
};

// Simula a verificação se um jogador está online
export const isPlayerOnline = async (username: string): Promise<boolean> => {
  console.log(`Verificando se o jogador ${username} está online`);
  
  // Simulando um atraso de rede
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 30% de chance de o jogador estar online (para simulação)
  return Math.random() < 0.3;
};

// Simula a adição de um item ao inventário do jogador
export const addItemToPlayer = async (
  username: string, 
  itemId: string, 
  quantity: number = 1
): Promise<{ success: boolean, message: string }> => {
  console.log(`Adicionando item ${itemId} (${quantity}x) ao jogador ${username}`);
  
  // Simulando um atraso de rede
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Simulando uma resposta bem-sucedida
  return {
    success: true,
    message: `${quantity}x ${itemId} foi adicionado ao inventário de ${username}`
  };
};

// Simula a atualização do tipo de conta do jogador (VIP, TOP, etc.)
export const updatePlayerAccount = async (
  username: string, 
  accountType: 'FREE' | 'VIP' | 'TOP',
  durationDays: number = 30
): Promise<{ success: boolean, message: string }> => {
  console.log(`Atualizando conta do jogador ${username} para ${accountType} por ${durationDays} dias`);
  
  // Simulando um atraso de rede
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulando uma resposta bem-sucedida
  return {
    success: true,
    message: `A conta do jogador ${username} foi atualizada para ${accountType} por ${durationDays} dias`
  };
};
