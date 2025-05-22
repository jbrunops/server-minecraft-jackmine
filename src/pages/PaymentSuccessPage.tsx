import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { getServerStatus } from '../services/minecraftService';

const PaymentSuccessPage = () => {
  const [serverStatus, setServerStatus] = React.useState<{
    online: boolean;
    players: number;
  }>({
    online: false,
    players: 0
  });

  useEffect(() => {
    // Toast de sucesso quando a página carrega
    toast.success("Pagamento confirmado!", {
      description: "Seu pagamento foi processado com sucesso."
    });
    
    // Verificar o status do servidor
    getServerStatus().then(status => {
      setServerStatus({
        online: status.online,
        players: status.players.current
      });
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto text-center">
        <div className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="section-title mb-6 text-green-600">Sucesso!</h1>
        
        <div className="card mb-8">
          <p className="text-lg mb-4">
            Seu pagamento foi confirmado e processado com sucesso!
          </p>
          
          <p className="text-gray-600 mb-8">
            Os itens ou assinatura que você comprou já estão disponíveis na sua conta no servidor.
            Entre no jogo e aproveite seus novos benefícios!
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-4">
            <h3 className="font-bold mb-4 text-primary">Para acessar o servidor:</h3>
            <div className="text-xl font-mono font-bold text-secondary mb-4 select-all">
              190.102.40.99:26040
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText('190.102.40.99:26040');
                  toast.success("IP copiado!");
                }}
                className="btn-secondary text-sm w-full sm:w-auto"
              >
                Copiar IP
              </button>
              
              <div className="text-sm bg-white px-3 py-2 rounded-md shadow-sm w-full sm:w-auto">
                <span className={`inline-block w-3 h-3 rounded-full mr-1 ${serverStatus.online ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {serverStatus.online 
                  ? `Servidor Online: ${serverStatus.players} jogadores` 
                  : 'Servidor Offline'}
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/" className="btn-primary">
            Voltar para a Página Inicial
          </Link>
          <Link to="/assinaturas" className="btn-secondary">
            Ver Assinaturas
          </Link>
        </div>
        
        <div className="mt-12 text-sm text-gray-500">
          <p>Se tiver algum problema, entre em contato com o suporte:</p>
          <a href="mailto:suporte@jackmine.com" className="text-secondary font-medium hover:underline">
            suporte@jackmine.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
