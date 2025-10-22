
import React, { useState } from 'react';
// FIX: Add .tsx/.ts extensions to fix module resolution errors.
import { useApp } from '../App.tsx';
import { View } from '../types.ts';
import { MenuIcon, SearchIcon, BellIcon, ShoppingCartIcon, ChevronDownIcon } from './icons';

import topitopLogo from '../src/assets/images/logocatalogo.jpg';
const TopitopLogo = () => (
    <div className="flex items-center">
        <img src={topitopLogo} alt="Topitop Catálogo" className="h-10 w-auto" />
    </div>
);

interface HeaderProps {
    onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    const { logout, setView, setActiveProductCategory, cart } = useApp();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const businessLinks = [
        { label: 'Línea de crédito', view: View.MY_BUSINESS_CREDIT },
        { label: 'Lista de pedidos', view: View.MY_BUSINESS_ORDERS },
        { label: 'Mis pagos', view: View.MY_BUSINESS_PAYMENTS },
        { label: 'Mis clientes', view: View.MY_BUSINESS_CLIENTS },
        { label: 'Cambios', view: View.MY_BUSINESS_RETURNS },
    ];

    const handleCategoryNavigation = (category: string) => {
        setActiveProductCategory(category);
        setView(View.PRODUCTS);
    };

    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <header className="bg-white shadow-sm z-10 border-b">
            <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button className="text-gray-500 focus:outline-none lg:hidden" onClick={onMenuClick}>
                        <MenuIcon className="h-6 w-6" />
                    </button>
                    <TopitopLogo />
                </div>

                <div className="flex-1 hidden lg:flex items-center justify-center space-x-6 text-gray-600 font-medium ml-10">
                    <div className="relative">
                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center hover:text-red-600">
                            Mi negocio
                            <ChevronDownIcon className="h-4 w-4 ml-1" />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-20" onMouseLeave={() => setDropdownOpen(false)}>
                                {businessLinks.map(link => (
                                    <button
                                        key={link.label}
                                        onClick={() => { setView(link.view); setDropdownOpen(false); }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <button onClick={() => handleCategoryNavigation('Mujer')} className="hover:text-red-600">Mujer</button>
                    <button onClick={() => handleCategoryNavigation('Hombre')} className="hover:text-red-600">Hombre</button>
                    <button onClick={() => handleCategoryNavigation('Niños')} className="hover:text-red-600">Niños</button>
                    <button onClick={() => handleCategoryNavigation('Hogar')} className="hover:text-red-600">Hogar</button>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4">
                    <div className="relative hidden md:block">
                        <input type="text" className="bg-gray-100 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full max-w-xs" placeholder="Buscar en Topitop Catálogo" />
                        <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                            <SearchIcon className="h-4 w-4 text-gray-500" />
                        </button>
                    </div>

                    <button className="text-gray-600 hover:text-red-600 p-2 rounded-full hover:bg-gray-100 md:hidden">
                        <SearchIcon className="h-6 w-6" />
                    </button>
                    <button onClick={() => setView(View.ORDERS)} className="relative text-gray-600 hover:text-red-600 p-2 rounded-full hover:bg-gray-100">
                        <ShoppingCartIcon className="h-6 w-6" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                    <button className="text-gray-600 hover:text-red-600 p-2 rounded-full hover:bg-gray-100">
                        <BellIcon className="h-6 w-6" />
                    </button>
                    
                    <div className="hidden sm:flex items-center space-x-2 bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm">
                        <span>Estás en:</span>
                        <span className="font-bold">C-01</span>
                    </div>

                    <button onClick={logout} className="hidden sm:block text-gray-600 hover:text-red-600 text-sm font-medium">
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;