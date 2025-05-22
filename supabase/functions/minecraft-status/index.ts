import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

interface MinecraftStatusResponse {
  online: boolean;
  players: {
    current: number;
    max: number;
  };
  version?: string;
  motd?: string;
  error?: string;
}

// Parâmetros do servidor Minecraft (configurados diretamente)
const MINECRAFT_SERVER_HOST = '190.102.40.99';
const MINECRAFT_SERVER_PORT = 26040;

serve(async (req) => {
  console.log('minecraft-status Edge Function chamada.');
  // Configurações CORS
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  // Responder ao preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers, status: 204 });
  }

  try {
    const apiUrl = `https://api.mcsrvstat.us/3/${MINECRAFT_SERVER_HOST}:${MINECRAFT_SERVER_PORT}`;
    console.log('Consultando API mcsrvstat.us com URL:', apiUrl);

    // Usando fetch para consultar uma API externa que verifica o status do servidor Minecraft
    const response = await fetch(apiUrl);
    console.log('Resposta recebida da mcsrvstat.us. Status:', response.status);

    const responseText = await response.text();
    console.log('Texto da resposta da mcsrvstat.us:', responseText);
    
    if (!response.ok) {
      console.error('Falha ao consultar status do servidor mcsrvstat.us. Status:', response.status, 'Texto:', responseText);
      throw new Error(`Falha ao consultar status do servidor: ${response.statusText} - ${responseText}`);
    }

    const data = JSON.parse(responseText);
    console.log('Dados JSON parseados da mcsrvstat.us:', JSON.stringify(data, null, 2));
    
    // Formatar a resposta conforme nossa interface
    const result: MinecraftStatusResponse = {
      online: data.online || false,
      players: {
        current: data.players?.online || 0,
        max: data.players?.max || 0
      }
    };

    // Adicionar informações adicionais se disponíveis
    if (data.version) {
      result.version = data.version;
    }
    
    if (data.motd && typeof data.motd === 'object') { // Checando se motd é um objeto
      result.motd = data.motd.clean?.join('\n') || data.motd.raw?.join('\n');
    } else if (typeof data.motd === 'string') { // Se for string, usa direto
      result.motd = data.motd;
    }
    console.log('Resultado formatado a ser retornado pela Edge Function:', JSON.stringify(result, null, 2));

    return new Response(JSON.stringify(result), { headers });
  } catch (error) {
    console.error('Erro crítico na Edge Function minecraft-status:', error.message, error.stack);
    
    const errorResponse: MinecraftStatusResponse = {
      online: false,
      players: {
        current: 0,
        max: 0
      },
      error: error.message
    };
    
    return new Response(JSON.stringify(errorResponse), { 
      headers, 
      status: 500 
    });
  }
}); 