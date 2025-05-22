import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src="/logo.png" alt="JackMine" className="h-12 w-auto" />
              <span className="text-xl font-bold">JACKMINE</span>
            </div>
            <p className="text-gray-300">Seu novo servidor favorito de Minecraft com os melhores kits e diversão garantida!</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Início</Link></li>
              <li><Link to="/loja" className="text-gray-300 hover:text-white transition-colors">Loja</Link></li>
              <li><Link to="/assinaturas" className="text-gray-300 hover:text-white transition-colors">Assinaturas</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Conecte-se</h3>
            <p className="text-gray-300 mb-2">IP do Servidor:</p>
            <p className="bg-gray-800 p-2 rounded font-mono text-secondary select-all mb-4">190.102.40.99:26040</p>
            <p className="text-sm text-gray-400">
              © {currentYear} JACKMINE. Todos os direitos reservados.
              <br />
              Não afiliado à Mojang AB.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
