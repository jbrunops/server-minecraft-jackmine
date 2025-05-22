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
          <h1 className="section-title">Simulação de Pagamento</h1>
          <p className="text-gray-600 mb-2">
            Esta é uma simulação da página de pagamento do Stripe.
          </p>
          <div className="bg-amber-50 border border-amber-300 text-amber-800 p-3 rounded-md text-sm">
            Em produção, você seria redirecionado para a página segura do Stripe.
          </div>
        </div>
        
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-6 text-primary">Escolha o Método de Pagamento</h2>
          
          <div className="space-y-4">
            <div 
              className={`p-4 border rounded-md cursor-pointer transition-all ${
                selectedMethod === 'pix' 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedMethod('pix')}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3 text-white">
                  P
                </div>
                <div>
                  <div className="font-bold">PIX</div>
                  <div className="text-sm text-gray-600">Pagamento instantâneo</div>
                </div>
              </div>
            </div>
            
            <div 
              className={`p-4 border rounded-md cursor-pointer transition-all ${
                selectedMethod === 'card' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedMethod('card')}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 text-white">
                  C
                </div>
                <div>
                  <div className="font-bold">Cartão de Crédito</div>
                  <div className="text-sm text-gray-600">Visa, Mastercard, Elo, etc.</div>
                </div>
              </div>
            </div>
            
            <div 
              className={`p-4 border rounded-md cursor-pointer transition-all ${
                selectedMethod === 'boleto' 
                  ? 'border-yellow-500 bg-yellow-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedMethod('boleto')}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-3 text-white">
                  B
                </div>
                <div>
                  <div className="font-bold">Boleto</div>
                  <div className="text-sm text-gray-600">Prazo de compensação: 1-3 dias úteis</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handlePaymentSimulation} 
          className={`btn-primary w-full text-lg mb-4 ${
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
          className="btn-secondary bg-gray-500 hover:bg-gray-600 w-full"
          disabled={isProcessing}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default PaymentSimulatedPage;
