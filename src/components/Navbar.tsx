import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="JackMine" className="h-[8.55rem] w-auto my-[-1.5rem]" />
          </Link>
          
          {/* Menu para desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-secondary font-medium">
              Início
            </Link>
            <Link to="/assinaturas" className="text-gray-700 hover:text-secondary font-medium">
              Assinaturas
            </Link>
            <button 
              onClick={() => {
                navigator.clipboard.writeText('190.102.40.99:26040');
                alert('IP copiado para a área de transferência!');
              }}
              className="btn-secondary"
            >
              Copiar IP
            </button>
          </div>
          
          {/* Botão de menu para mobile */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Menu para mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-secondary font-medium px-4 py-2">
                Início
              </Link>
              <Link to="/assinaturas" className="text-gray-700 hover:text-secondary font-medium px-4 py-2">
                Assinaturas
              </Link>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText('190.102.40.99:26040');
                  alert('IP copiado para a área de transferência!');
                }}
                className="btn-secondary mx-4 my-2"
              >
                Copiar IP
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
