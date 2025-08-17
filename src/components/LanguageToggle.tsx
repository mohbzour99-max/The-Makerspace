import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const LanguageToggle: React.FC = () => {
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  
  const nextLanguage = languages.find(lang => lang.code !== currentLanguage);
  
  return (
    <button
      onClick={() => nextLanguage && changeLanguage(nextLanguage.code)}
      className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-full hover:bg-secondary-100 transition-colors duration-200"
      aria-label="Change language"
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">
        {nextLanguage?.nativeName}
      </span>
    </button>
  );
};