import React from 'react';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];
  
  return (
    <footer className="text-white" style={{ backgroundColor: '#721f31' }}>
      <div className="container-max section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="flex items-center mb-4">
              <img 
                src="https://i.postimg.cc/Z5bKCdb7/Logo2.png" 
                alt="The Makerspace Logo" 
                className="h-16 w-auto brightness-0 invert"
              />
            </div>
          </div>
          
          {/* Quick Links */}
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quick_links.title')}</h3>
            <ul className="space-y-2">
              {['book_tour', 'machine_booking', 'workshops', 'membership'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white hover:text-gray-200 transition-colors duration-200 text-sm"
                  >
                    {t(`footer.quick_links.${item}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Programs */}
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className="text-lg font-semibold mb-4">{t('footer.programs.title')}</h3>
            <ul className="space-y-2">
              {['fab_academy', 'workshops', 'certifications', 'corporate'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white hover:text-gray-200 transition-colors duration-200 text-sm"
                  >
                    {t(`footer.programs.${item}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact.title')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin className="w-4 h-4 text-white flex-shrink-0" />
                <span className="text-white text-sm">{t('footer.contact.address')}</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="w-4 h-4 text-white flex-shrink-0" />
                <span className="text-white text-sm">{t('footer.contact.phone')}</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="w-4 h-4 text-white flex-shrink-0" />
                <span className="text-white text-sm">{t('footer.contact.email')}</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Clock className="w-4 h-4 text-white flex-shrink-0" />
                <span className="text-white text-sm">{t('footer.contact.hours')}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Links & Copyright */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
              <p className="text-white text-sm">© 2025 Developed by dot.jo. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="text-white text-sm">{t('footer.social.title')}</span>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-white hover:text-gray-200 transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};