import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { LanguageToggle } from '../LanguageToggle';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navigation = [
    { key: 'facilities', href: '#facilities' },
    { key: 'programs', href: '#programs' },
    { key: 'map', href: '#map' },
    { key: 'about', href: '#about' },
    { key: 'faqs', href: '#faqs' },
    { key: 'contact', href: '#contact' },
  ];
  
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container-max section-padding">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center mr-12 rtl:mr-0 rtl:ml-12">
            <img 
              src="https://i.postimg.cc/Z5bKCdb7/Logo2.png" 
              alt="The Makerspace Logo" 
              className="h-14 w-auto"
            />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-8 rtl:space-x-reverse">
            <nav className="flex items-center space-x-6 rtl:space-x-reverse">
            {navigation.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-200 whitespace-nowrap text-base"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
            </nav>
            
            {/* Join the Network Button */}
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-full font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 inline-flex items-center whitespace-nowrap text-sm">
              {t('nav.join_network')}
            </button>
          </div>
          
          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <LanguageToggle />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden p-2 rounded-full hover:bg-secondary-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="xl:hidden py-4 border-t border-secondary-200">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-secondary-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2"
                >
                  {t(`nav.${item.key}`)}
                </a>
              ))}
              
              {/* Join the Network Button for Mobile */}
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-full font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 inline-flex items-center justify-center w-full mt-4 text-sm">
                {t('nav.join_network')}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};