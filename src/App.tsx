import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { useLanguage } from './hooks/useLanguage';
import { ArrowRight, ArrowLeft, Users, Award, Wrench, GraduationCap, Play } from 'lucide-react';

function App() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const facilitiesContainerRef = useRef<HTMLDivElement>(null);
  const programsContainerRef = useRef<HTMLDivElement>(null);
  const objectivesContainerRef = useRef<HTMLDivElement>(null);
  const [activeProgramCard, setActiveProgramCard] = React.useState(0);
  
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  
  const scrollFacilitiesLeft = () => {
    if (facilitiesContainerRef.current) {
      const containerWidth = facilitiesContainerRef.current.offsetWidth;
      const cardWidth = 320 + 24; // card width + gap
      const cardsPerView = Math.floor(containerWidth / cardWidth);
      const scrollAmount = cardWidth * cardsPerView;
      facilitiesContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };
  
  const scrollFacilitiesRight = () => {
    if (facilitiesContainerRef.current) {
      const containerWidth = facilitiesContainerRef.current.offsetWidth;
      const cardWidth = 320 + 24; // card width + gap
      const cardsPerView = Math.floor(containerWidth / cardWidth);
      const scrollAmount = cardWidth * cardsPerView;
      facilitiesContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  // Mouse drag functionality for programs section
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = programsContainerRef.current;
    if (!container) return;
    
    const startX = e.pageX - container.offsetLeft;
    const scrollLeft = container.scrollLeft;
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      container.style.cursor = 'grab';
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    container.style.cursor = 'grabbing';
  };
  
  const scrollObjectivesLeft = () => {
    if (objectivesContainerRef.current) {
      const containerWidth = objectivesContainerRef.current.offsetWidth;
      const scrollAmount = containerWidth / 3; // Scroll by one objective width
      objectivesContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };
  
  const scrollObjectivesRight = () => {
    if (objectivesContainerRef.current) {
      const containerWidth = objectivesContainerRef.current.offsetWidth;
      const scrollAmount = containerWidth / 3; // Scroll by one objective width
      objectivesContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  const [activeObjective, setActiveObjective] = React.useState(0);
  
  const handleProgramsScroll = () => {
    if (programsContainerRef.current) {
      const scrollLeft = programsContainerRef.current.scrollLeft;
      const containerWidth = programsContainerRef.current.offsetWidth;
      const cardWidth = containerWidth - 48; // Account for margins
      const activeIndex = Math.round(scrollLeft / cardWidth);
      setActiveProgramCard(Math.min(activeIndex, 6)); // Max 6 since we have 7 cards (0-6)
    }
  };
  
  const handleObjectiveScroll = () => {
    if (objectivesContainerRef.current) {
      const scrollLeft = objectivesContainerRef.current.scrollLeft;
      const containerWidth = objectivesContainerRef.current.offsetWidth;
      const cardWidth = containerWidth / 3; // Each card takes 1/3 of container width
      const activeIndex = Math.round(scrollLeft / cardWidth);
      setActiveObjective(activeIndex);
    }
  };
  
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section id="home" className="relative text-white overflow-hidden">
          <img 
            src="https://i.postimg.cc/8chNNQ3f/header.png" 
            alt="Hero Background Image"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative container-max section-padding min-h-[90vh] flex items-center pt-32">
            <div className="max-w-4xl">
              <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-lg mb-8 text-primary-200 max-w-3xl leading-relaxed text-left">
              </p>
              <p className="text-base sm:text-lg mb-6 sm:mb-8 text-white max-w-3xl leading-relaxed text-left">
                {t('hero.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-16">
                <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 text-sm sm:text-base" style={{ backgroundColor: '#721f31', color: 'white' }}>
                  {t('hero.cta_primary')}
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Technical Facilities */}
        <section id="technical-facilities" className="py-12 sm:py-20 lg:py-32 text-white" style={{ backgroundColor: '#721f31' }}>
          <div className="container-max section-padding">
            <div className="mb-6 sm:mb-8 relative">
              {/* Title and subtitle - always stacked */}
              <h2 className="text-3xl sm:text-3xl lg:text-4xl font-bold mb-2">
                The Makerspace Technical Facilities
              </h2>
              <p className="text-sm sm:text-base text-white/80 mb-6 md:mb-0">
                Find the equipment, program or facility right for you
              </p>
              
              {/* Controls - hidden on mobile, shown on desktop in original position */}
              <div className="hidden md:flex md:absolute md:top-0 md:right-0 items-center space-x-4">
                <button 
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                  onClick={scrollFacilitiesLeft}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button 
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                  onClick={scrollFacilitiesRight}
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div 
                ref={facilitiesContainerRef}
                className="flex space-x-4 sm:space-x-6 pb-4 overflow-x-auto scrollbar-hide transition-transform duration-300"
                style={{ scrollSnapType: 'x mandatory' }}
              >
                {/* 3D Printing Card */}
                <div className="relative w-80 h-64 rounded-xl overflow-hidden group cursor-pointer flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <img 
                    src="https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="3D Printing Center of Excellence"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      3D Printing Center of Excellence
                    </h3>
                    <p className="text-sm text-gray-300">
                      Professional-grade 3D printers for rapid prototyping and production
                    </p>
                  </div>
                </div>
                
                {/* Multi-use KUKA Robotic Arm Card */}
                <div className="relative w-80 h-64 rounded-xl overflow-hidden group cursor-pointer flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <img 
                    src="https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Multi-use KUKA Robotic Arm"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Multi-use KUKA Robotic Arm
                    </h3>
                    <p className="text-sm text-gray-300">
                      Advanced robotic arm for automated manufacturing and assembly
                    </p>
                  </div>
                </div>
                
                {/* Milling, router, and lathe CNC machines Card */}
                <div className="relative w-80 h-64 rounded-xl overflow-hidden group cursor-pointer flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <img 
                    src="https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Milling, router, and lathe CNC machines"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Milling, router, and lathe CNC machines
                    </h3>
                    <p className="text-sm text-gray-300">
                      Computer-controlled precision machining for metal and wood
                    </p>
                  </div>
                </div>
                
                {/* Electronics and PCB station Card */}
                <div className="relative w-80 h-64 rounded-xl overflow-hidden group cursor-pointer flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <img 
                    src="https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Electronics and PCB station"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Electronics and PCB station
                    </h3>
                    <p className="text-sm text-gray-300">
                      Complete electronics workstation with soldering and testing equipment
                    </p>
                  </div>
                </div>
                
                {/* Laser cutting and engraving machines Card */}
                <div className="relative w-80 h-64 rounded-xl overflow-hidden group cursor-pointer flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <img 
                    src="https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Laser cutting and engraving machines"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Laser cutting and engraving machines
                    </h3>
                    <p className="text-sm text-gray-300">
                      Precision cutting and engraving for various materials
                    </p>
                  </div>
                </div>
                
                {/* Casting and molding station Card */}
                <div className="relative w-80 h-64 rounded-xl overflow-hidden group cursor-pointer flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <img 
                    src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Casting and molding station"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Casting and molding station
                    </h3>
                    <p className="text-sm text-gray-300">
                      Professional casting and molding equipment for various materials
                    </p>
                  </div>
                </div>
                
                {/* Biomaterials section Card */}
                <div className="relative w-80 h-64 rounded-xl overflow-hidden group cursor-pointer flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <img 
                    src="https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Biomaterials section"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Biomaterials section
                    </h3>
                    <p className="text-sm text-gray-300">
                      Research and development of sustainable biomaterials
                    </p>
                  </div>
                </div>
                
                {/* 3D scanners Card */}
                <div className="relative w-80 h-64 rounded-xl overflow-hidden group cursor-pointer flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <img 
                    src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="3D scanners"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      3D scanners
                    </h3>
                    <p className="text-sm text-gray-300">
                      High-precision 3D scanning for reverse engineering and modeling
                    </p>
                  </div>
                </div>
                
                {/* Vacuum molding machine Card */}
                <div className="relative w-80 h-64 rounded-xl overflow-hidden group cursor-pointer flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <img 
                    src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Vacuum molding machine"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Vacuum molding machine
                    </h3>
                    <p className="text-sm text-gray-300">
                      Professional vacuum forming for plastic prototyping
                    </p>
                  </div>
                </div>
                
                {/* Sewing machines Card */}
                <div className="relative w-80 h-64 rounded-xl overflow-hidden group cursor-pointer flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <img 
                    src="https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Sewing machines"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Sewing machines
                    </h3>
                    <p className="text-sm text-gray-300">
                      Industrial and domestic sewing machines for textile projects
                    </p>
                  </div>
                </div>
                
                {/* Vinyl cutters Card */}
                <div className="relative w-80 h-64 rounded-xl overflow-hidden group cursor-pointer flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <img 
                    src="https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Vinyl cutters"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Vinyl cutters
                    </h3>
                    <p className="text-sm text-gray-300">
                      Precision vinyl cutting for signage and decorative applications
                    </p>
                  </div>
                </div>
                
                {/* Design stations Card */}
                <div className="relative w-80 h-64 rounded-xl overflow-hidden group cursor-pointer flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <img 
                    src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Design stations"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Design stations
                    </h3>
                    <p className="text-sm text-gray-300">
                      Professional workstations with design software and hardware
                    </p>
                  </div>
                </div>
                
                {/* Assembly tables Card */}
                <div className="relative w-80 h-64 rounded-xl overflow-hidden group cursor-pointer flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <img 
                    src="https://images.pexels.com/photos/175709/pexels-photo-175709.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Assembly tables"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Assembly tables
                    </h3>
                    <p className="text-sm text-gray-300">
                      Spacious tables for project assembly and collaboration
                    </p>
                  </div>
                </div>
                
                {/* Worktables Card */}
                <div className="relative w-80 h-64 rounded-xl overflow-hidden group cursor-pointer flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <img 
                    src="https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Worktables"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Worktables
                    </h3>
                    <p className="text-sm text-gray-300">
                      Versatile work surfaces for various fabrication tasks
                    </p>
                  </div>
                </div>
                
                {/* UV printer Card */}
                <div className="relative w-80 h-64 rounded-xl overflow-hidden group cursor-pointer flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <img 
                    src="https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="UV printer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      UV printer
                    </h3>
                    <p className="text-sm text-gray-300">
                      High-quality UV printing for various materials and surfaces
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Mobile controls - shown only on mobile, below images */}
              <div className="flex md:hidden items-center justify-between mt-6">
                <div className="flex items-center space-x-2">
                  <button 
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                    onClick={scrollFacilitiesLeft}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button 
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                    onClick={scrollFacilitiesRight}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <button className="text-white/80 hover:text-white transition-colors duration-200">
                  Discover More
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Technical Facilities Section */}
        <section id="facilities" className="py-12 bg-gray-50 overflow-hidden">
          <div className="max-w-none mx-auto">
            <div className="mb-16 ml-6 sm:ml-20 lg:ml-24">
              <h2 className="text-3xl sm:text-3xl lg:text-4xl font-bold mb-2" style={{ color: '#721f31' }}>
                The Makerspace Educational and Training Programs
              </h2>
            </div>
            
            <div className="relative overflow-hidden">
              <div 
                ref={programsContainerRef}
                className="flex space-x-8 overflow-x-auto scrollbar-hide cursor-grab select-none pb-4 ml-6 sm:ml-20 lg:ml-24 pr-6 sm:pr-0"
                style={{ scrollSnapType: 'x mandatory' }}
                onMouseDown={handleMouseDown}
                onScroll={handleProgramsScroll}
              >
                {/* Card 1 - Fab Academy */}
                <div className="w-[calc(100vw-3rem)] sm:w-[420px] bg-white p-6 sm:p-10 rounded-xl shadow-lg flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <div className="text-lg sm:text-xl font-medium mb-4 sm:mb-6" style={{ color: '#ae801c' }}>01</div>
                  <h3 className="text-3xl font-bold leading-tight mb-8" style={{ color: '#721f31' }}>
                    FAB ACADEMY
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg line-height-relaxed">
                    MIT's flagship digital fabrication program covering computer-controlled cutting, electronics, 3D printing, and more.
                  </p>
                </div>
                
                {/* Card 2 - Fabricademy */}
                <div className="w-[calc(100vw-3rem)] sm:w-[420px] bg-white p-6 sm:p-10 rounded-xl shadow-lg flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <div className="text-lg sm:text-xl font-medium mb-4 sm:mb-6" style={{ color: '#ae801c' }}>02</div>
                  <h3 className="text-3xl font-bold leading-tight mb-8" style={{ color: '#721f31' }}>
                    FABRICADEMY
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg line-height-relaxed">
                    Textile and fashion technology program focusing on new materials, wearable technology, and sustainable fashion.
                  </p>
                </div>
                
                {/* Card 3 - Makerspace Academy */}
                <div className="w-[calc(100vw-3rem)] sm:w-[420px] bg-white p-6 sm:p-10 rounded-xl shadow-lg flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <div className="text-lg sm:text-xl font-medium mb-4 sm:mb-6" style={{ color: '#ae801c' }}>03</div>
                  <h3 className="text-3xl font-bold leading-tight mb-8" style={{ color: '#721f31' }}>
                    MAKERSPACE ACADEMY
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg line-height-relaxed">
                    Our signature hands-on making program designed to teach practical fabrication skills and creative problem-solving.
                  </p>
                </div>
                
                {/* Card 4 - Masterclasses */}
                <div className="w-[calc(100vw-3rem)] sm:w-[420px] bg-white p-6 sm:p-10 rounded-xl shadow-lg flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <div className="text-lg sm:text-xl font-medium mb-4 sm:mb-6" style={{ color: '#ae801c' }}>04</div>
                  <h3 className="text-3xl font-bold leading-tight mb-8" style={{ color: '#721f31' }}>
                    MASTERCLASSES
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg line-height-relaxed">
                    Intensive workshops led by industry experts covering advanced techniques and emerging technologies.
                  </p>
                </div>
                
                {/* Card 5 - University Programs */}
                <div className="w-[calc(100vw-3rem)] sm:w-[420px] bg-white p-6 sm:p-10 rounded-xl shadow-lg flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <div className="text-lg sm:text-xl font-medium mb-4 sm:mb-6" style={{ color: '#ae801c' }}>05</div>
                  <h3 className="text-3xl font-bold leading-tight mb-8" style={{ color: '#721f31' }}>
                    UNIVERSITY PROGRAMS
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg line-height-relaxed">
                    Academic partnerships and collaborative programs with universities and educational institutions.
                  </p>
                </div>
                
                {/* Card 6 - Local Community Projects */}
                <div className="w-[calc(100vw-3rem)] sm:w-[420px] bg-white p-6 sm:p-10 rounded-xl shadow-lg flex-shrink-0" style={{ scrollSnapAlign: 'start' }}>
                  <div className="text-lg sm:text-xl font-medium mb-4 sm:mb-6" style={{ color: '#ae801c' }}>06</div>
                  <h3 className="text-3xl font-bold leading-tight mb-8" style={{ color: '#721f31' }}>
                    LOCAL COMMUNITY PROJECTS
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg line-height-relaxed">
                    Community-driven innovation initiatives that address local challenges and create positive social impact.
                  </p>
                </div>
                
                {/* Card 7 - Industry Projects */}
                <div className="w-[calc(100vw-3rem)] sm:w-[420px] bg-white p-6 sm:p-10 rounded-xl shadow-lg flex-shrink-0 mr-6 sm:mr-8 lg:mr-12" style={{ scrollSnapAlign: 'start' }}>
                  <div className="text-lg sm:text-xl font-medium mb-4 sm:mb-6" style={{ color: '#ae801c' }}>07</div>
                  <h3 className="text-3xl font-bold leading-tight mb-8" style={{ color: '#721f31' }}>
                    INDUSTRY PROJECTS
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg line-height-relaxed">
                    Real-world collaborative projects with leading companies, providing hands-on industry experience.
                  </p>
                </div>
              </div>
              
              {/* Progress bar for mobile */}
              <div className="flex sm:hidden justify-center mt-6">
                <div className="flex space-x-2">
                  {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                    <div 
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        activeProgramCard === index ? 'bg-[#721f31]' : 'bg-gray-300'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* The Makerspace Objectives Section */}
        <section id="objectives" className="py-12 bg-gray-50 overflow-hidden">
          <div className="container-max section-padding">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 sm:mb-16">
              <h2 className="text-3xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-0" style={{ color: '#721f31' }}>
                The Makerspace Objectives
              </h2>
            </div>
            
            <div className="relative -mx-6 sm:-mx-8 lg:-mx-12">
              <div 
                ref={objectivesContainerRef}
                className="flex space-x-4 lg:space-x-8 overflow-x-auto pb-4 snap-x snap-mandatory px-6 sm:px-8 lg:px-12 scrollbar-hide"
                style={{ scrollSnapType: 'x mandatory' }}
                onScroll={handleObjectiveScroll}
              >
                {/* Objective 1 - Empowering makers */}
                <div className="w-[calc(100vw-4rem)] min-w-[calc(100vw-4rem)] md:w-[calc(33.333%-1rem)] md:min-w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1.5rem)] lg:min-w-[calc(33.333%-1.5rem)] text-center group flex-shrink-0 border border-gray-200 rounded-lg p-4 sm:p-6 snap-start">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <Users className="w-12 h-12" style={{ color: '#ae801c' }} />
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-4 leading-tight">
                    Empowering the local makers movement in Jordan, encouraging the spirit of creative pioneering and creating a generation of visionaries
                  </h3>
                </div>
                
                {/* Objective 2 - Making innovation accessible */}
                <div className="w-[calc(100vw-4rem)] min-w-[calc(100vw-4rem)] md:w-[calc(33.333%-1rem)] md:min-w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1.5rem)] lg:min-w-[calc(33.333%-1.5rem)] text-center group flex-shrink-0 border border-gray-200 rounded-lg p-4 sm:p-6 snap-start">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <Award className="w-12 h-12" style={{ color: '#ae801c' }} />
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-4 leading-tight">
                    Making innovation accessible to all segments of Jordanian society
                  </h3>
                </div>
                
                {/* Objective 3 - Bringing creatives together */}
                <div className="w-[calc(100vw-4rem)] min-w-[calc(100vw-4rem)] md:w-[calc(33.333%-1rem)] md:min-w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1.5rem)] lg:min-w-[calc(33.333%-1.5rem)] text-center group flex-shrink-0 border border-gray-200 rounded-lg p-4 sm:p-6 snap-start">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <Wrench className="w-12 h-12" style={{ color: '#ae801c' }} />
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-4 leading-tight">
                    Bringing creatives together, giving them the platform to develop products and solutions
                  </h3>
                </div>
                
                {/* Objective 4 - Supporting young creators */}
                <div className="w-[calc(100vw-4rem)] min-w-[calc(100vw-4rem)] md:w-[calc(33.333%-1rem)] md:min-w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1.5rem)] lg:min-w-[calc(33.333%-1.5rem)] text-center group flex-shrink-0 border border-gray-200 rounded-lg p-4 sm:p-6 snap-start">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <GraduationCap className="w-12 h-12" style={{ color: '#ae801c' }} />
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-4 leading-tight">
                    Supporting young creators and enabling them to plan, engineer, and manufacture their creations
                  </h3>
                </div>
                
                {/* Objective 5 - Supporting digitization literacy */}
                <div className="w-[calc(100vw-4rem)] min-w-[calc(100vw-4rem)] md:w-[calc(33.333%-1rem)] md:min-w-[calc(33.333%-1rem)] lg:w-[calc(33.333%-1.5rem)] lg:min-w-[calc(33.333%-1.5rem)] text-center group flex-shrink-0 border border-gray-200 rounded-lg p-4 sm:p-6 snap-start">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <Users className="w-12 h-12" style={{ color: '#ae801c' }} />
                    </div>
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-4 leading-tight">
                    Supporting digitization literacy across Jordan by integrating the latest technologies into various sectors and industries
                  </h3>
                </div>
              </div>
            </div>
            
          </div>
          
          {/* Bullet point indicators */}
          <div className="flex justify-center mt-8 sm:mt-12">
            <div className="flex space-x-2">
              {[0, 1, 2].map((index) => (
                <div 
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    activeObjective === index ? 'bg-[#721f31]' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Mobile navigation arrows */}
          <div className="flex justify-center items-center space-x-4 mt-6">
            <button 
              className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors duration-200 shadow-md"
              onClick={scrollObjectivesLeft}
            >
              <ArrowLeft className="w-5 h-5" style={{ color: '#721f31' }} />
            </button>
            <button 
              className="p-2 rounded-full bg-white hover:bg-gray-100 transition-colors duration-200 shadow-md"
              onClick={scrollObjectivesRight}
            >
              <ArrowRight className="w-5 h-5" style={{ color: '#721f31' }} />
            </button>
          </div>
        </section>
        
        {/* Educational Programs Section */}
        <section id="programs" className="py-8 bg-gray-50">
          <div className="container-max section-padding">
            <div 
              className="relative bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden"
              style={{ backgroundImage: 'url(https://i.postimg.cc/T2HFpTBX/Pathway-to-Leadership.jpg)' }}
            >
              <div className="absolute inset-0 bg-black/60"></div>
              <div className="relative z-10 py-12 sm:py-16 lg:py-20 px-6 sm:px-8 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
              
                  <div className={`${isRTL ? 'text-right' : 'text-left'} lg:order-1`}>
                    <h2 className="text-3xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                      Why Choose Our Programs?
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8">
                      Our programs are designed by experts and delivered with hands-on experience
                    </p>
                    
                    <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                      {[
                        { title: 'MIT-Certified Curriculum', desc: 'World-class education standards' },
                        { title: 'Hands-on Learning', desc: 'Learn by doing with real projects' },
                        { title: 'Industry Connections', desc: 'Network with professionals and mentors' },
                        { title: 'Flexible Scheduling', desc: 'Programs that fit your lifestyle' }
                      ].map((item) => (
                        <div key={item.title} className="flex items-start space-x-4 rtl:space-x-reverse">
                          <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#ae801c' }}></div>
                          <div>
                            <h4 className="text-sm sm:text-base font-semibold text-white mb-1">{item.title}</h4>
                            <p className="text-sm sm:text-base text-gray-300">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <button 
                      className="text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 inline-flex items-center group text-sm sm:text-base"
                      style={{ backgroundColor: '#721f31' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5c1a28'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#721f31'}
                    >
                      Watch Video
                      <Play className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2 group-hover:scale-110 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Legacy Programs Section - keeping for reference */}
        <section className="hidden">
          <div className="container-max section-padding">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary-900 mb-4">
                  The Makerspace Educational and Training Programs
                </h2>
                <p className="text-base sm:text-lg text-secondary-600 mb-6 sm:mb-8">
                  Comprehensive learning programs designed to empower makers and innovators
                </p>
                
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {[
                    'Fab Academy',
                    'Fabricademy', 
                    'Makerspace Academy',
                    'Masterclasses',
                    'University and School Programs',
                    'Local Community Projects',
                    'Industry based projects'
                  ].map((program) => (
                    <div key={program} className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-sm sm:text-base text-secondary-700">{program}</span>
                    </div>
                  ))}
                </div>
                
                <button className="btn-primary group">
                  Explore All Programs
                  <ArrowIcon className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;