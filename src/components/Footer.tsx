import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="flex flex-col items-center md:items-start">
              <img src="/logo.png" alt="JackMine" className="h-[5.2rem] w-auto mb-4" />
              <p className="text-gray-600 text-sm text-center md:text-left">
                Seu servidor favorito de Minecraft com os melhores kits e diversão garantida!
              </p>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4 text-primary">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-secondary">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/assinaturas" className="text-gray-600 hover:text-secondary">
                  Assinaturas
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4 text-primary">Servidor</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                <span className="font-medium">IP:</span> 190.102.40.99:26040
              </li>
              <li className="text-gray-600">
                <span className="font-medium">Versão:</span> 1.18+
              </li>
              <li>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText('190.102.40.99:26040');
                    alert('IP copiado para a área de transferência!');
                  }}
                  className="text-secondary hover:underline"
                >
                  Copiar IP
                </button>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4 text-primary">Contato</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contato@jackmine.com" className="text-gray-600 hover:text-secondary">
                  contato@jackmine.com
                </a>
              </li>
              <li>
                <a href="https://discord.gg/jackmine" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-secondary">
                  Discord
                </a>
              </li>
              <li>
                <a href="https://instagram.com/jackmine" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-secondary">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} JackMine. Todos os direitos reservados.</p>
          <p className="mt-2">
            Este site não é afiliado à Mojang Studios ou Microsoft.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
