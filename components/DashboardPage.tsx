import React, { useState } from 'react';
// FIX: Add .tsx/.ts extensions to fix module resolution errors.
import { useApp } from '../App.tsx';
import { View } from '../types.ts';
import { ChevronRightIcon, ChevronLeftIcon } from './icons';

const DashboardPage: React.FC = () => {
  const { setView, userData } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://placehold.co/1200x400/E2E8F0/E2E8F0?text=LO%2B+NUEVO',
      title: 'LO+ NUEVO',
      subtitle: 'edición DENIM',
      linkText: 'Ver más →'
    },
    {
      image: 'https://placehold.co/1200x400/E2E8F0/E2E8F0?text=VERANO',
      title: 'VERANO',
      subtitle: 'Tendencias 2024',
      linkText: 'Descubrir →'
    }
  ];

  const nextSlide = () => {
      setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
      setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Hola Mariela, estas en campaña 01</h2>
      </div>

      {/* Slider */}
       <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative w-full h-56 md:h-72 lg:h-80 overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="absolute w-full h-full bg-cover bg-center transition-opacity duration-700 ease-in-out"
              style={{
                backgroundImage: `url(${slide.image})`,
                opacity: index === currentSlide ? 1 : 0,
              }}
            >
              <div className="bg-black/20 w-full h-full flex flex-col justify-center items-start p-8 md:p-12">
                  <h2 className="text-white text-4xl md:text-6xl font-extrabold">{slide.title}</h2>
                  <p className="text-white text-xl md:text-3xl">{slide.subtitle}</p>
                  <button onClick={() => setView(View.PRODUCTS)} className="mt-4 bg-white text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition">
                      {slide.linkText}
                  </button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={prevSlide} className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full focus:outline-none">
            <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <button onClick={nextSlide} className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full focus:outline-none">
            <ChevronRightIcon className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-semibold text-gray-500">LÍNEA DE CRÉDITO</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">S/ 500.00</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-semibold text-gray-500">DISPONIBLE</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">S/ 200.00</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-semibold text-gray-500">DEUDA TOTAL</h3>
          <p className="text-3xl font-bold text-red-600 mt-2">S/ 300.00</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-semibold text-gray-500">FECHA DE PAGO</h3>
           <button className="w-full mt-2 bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition">
                Paga en línea
            </button>
        </div>
      </div>
      
      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
            <div>
                <h3 className="text-xl font-bold">Seguimiento de pedido</h3>
            </div>
            <button onClick={() => setView(View.MY_BUSINESS_ORDERS)} className="border-2 border-gray-400 text-gray-700 font-semibold py-2 px-8 rounded-full hover:bg-gray-100 transition">
                Ver
            </button>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
            <div>
                <h3 className="text-xl font-bold">Puntos</h3>
            </div>
            <div className="font-bold text-xl">{userData.points}</div>
        </div>
      </div>

      {/* Promotions Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">GANA con 250 pts.</h3>
          <button onClick={() => setView(View.PRIZES)} className="flex items-center text-sm font-semibold text-red-600 hover:underline">
            Ver todo <ChevronRightIcon className="w-4 h-4 ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src="https://placehold.co/600x400/E2E8F0/E2E8F0?text=Promo+1" alt="Gana 1" className="w-full h-48 object-cover"/>
           </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src="https://placehold.co/600x400/E2E8F0/E2E8F0?text=Promo+2" alt="Gana 2" className="w-full h-48 object-cover"/>
           </div>
           <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src="https://placehold.co/600x400/E2E8F0/E2E8F0?text=Promo+3" alt="Gana 3" className="w-full h-48 object-cover"/>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;