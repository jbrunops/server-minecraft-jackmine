
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { checkPaymentStatus, updateMinecraftAccount } from '../services/stripeService';

const PaymentSimulatedPage = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);
  
  const handlePaymentSimulation = () => {
    setIsProcessing(true);
    
    // Simular o processamento do pagamento
    toast.info("Processando pagamento...", {
      description: `Pagamento via ${selectedMethod.toUpperCase()} em andamento`
    });
    
    // Simulação de contagem regressiva
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          
          // Simular verificação do status do pagamento
          checkPaymentStatus('sim_session_123456')
            .then(result => {
              if (result.status === 'paid') {
                toast.success("Pagamento confirmado!", {
                  description: "Seu pagamento foi processado com sucesso"
                });
                
                // Simular atualização da conta no servidor Minecraft
                return updateMinecraftAccount(
                  'jogador@exemplo.com', 
                  'JogadorExemplo', 
                  'subscription', 
                  'vip'
                );
              } else {
                throw new Error("Pagamento não confirmado");
              }
            })
            .then(result => {
              if (result.success) {
                toast.success("Conta atualizada!", {
                  description: result.message
                });
                
                // Redirecionar para a página de sucesso
                setTimeout(() => {
                  navigate('/pagamento-sucesso');
                }, 1500);
              }
            })
            .catch(error => {
              toast.error("Erro no pagamento", {
                description: error.message
              });
              setIsProcessing(false);
              setSecondsLeft(5);
            });
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-minecraft mb-2">Simulação de Pagamento</h1>
          <p className="text-sm text-gray-300 mb-2">
            Esta é uma simulação da página de pagamento do Stripe.
          </p>
          <div className="bg-amber-600 bg-opacity-30 border border-amber-500 text-amber-300 p-2 rounded text-sm">
            Em produção, você seria redirecionado para a página segura do Stripe.
          </div>
        </div>
        
        <div className="minecraft-panel mb-8">
          <h2 className="text-xl font-minecraft mb-4">Escolha o Método de Pagamento</h2>
          
          <div className="space-y-4">
            <div 
              className={`p-4 border-2 rounded cursor-pointer ${
                selectedMethod === 'pix' 
                  ? 'border-green-500 bg-green-900 bg-opacity-30' 
                  : 'border-gray-700'
              }`}
              onClick={() => setSelectedMethod('pix')}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  P
                </div>
                <div>
                  <div className="font-minecraft">PIX</div>
                  <div className="text-xs text-gray-300">Pagamento instantâneo</div>
                </div>
              </div>
            </div>
            
            <div 
              className={`p-4 border-2 rounded cursor-pointer ${
                selectedMethod === 'card' 
                  ? 'border-blue-500 bg-blue-900 bg-opacity-30' 
                  : 'border-gray-700'
              }`}
              onClick={() => setSelectedMethod('card')}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  C
                </div>
                <div>
                  <div className="font-minecraft">Cartão de Crédito</div>
                  <div className="text-xs text-gray-300">Visa, Mastercard, Elo, etc.</div>
                </div>
              </div>
            </div>
            
            <div 
              className={`p-4 border-2 rounded cursor-pointer ${
                selectedMethod === 'boleto' 
                  ? 'border-yellow-500 bg-yellow-900 bg-opacity-30' 
                  : 'border-gray-700'
              }`}
              onClick={() => setSelectedMethod('boleto')}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                  B
                </div>
                <div>
                  <div className="font-minecraft">Boleto</div>
                  <div className="text-xs text-gray-300">Prazo de compensação: 1-3 dias úteis</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handlePaymentSimulation} 
          className={`minecraft-button bg-green-700 hover:bg-green-600 w-full text-lg ${
            isProcessing ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={isProcessing}
        >
          {isProcessing 
            ? `Processando... (${secondsLeft}s)` 
            : 'Simular Pagamento Bem-Sucedido'}
        </button>
        
        <button 
          onClick={() => navigate(-1)} 
          className="minecraft-button bg-gray-700 hover:bg-gray-600 w-full mt-4"
          disabled={isProcessing}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default PaymentSimulatedPage;
