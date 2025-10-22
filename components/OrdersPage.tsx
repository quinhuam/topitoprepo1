
import React from 'react';
import { Trash2Icon } from './icons';
// FIX: Add .tsx/.ts extensions to fix module resolution errors.
import { useApp } from '../App.tsx';
import { View, CartItem } from '../types.ts';

const OrderItem: React.FC<{ item: CartItem, onUpdateQuantity: (id: number, quantity: number) => void, onRemove: (id: number) => void }> = ({ item, onUpdateQuantity, onRemove }) => {
    const product = item.product;
    const priceAfterDiscount = product.price * 0.8; // Assuming a 20% flat discount for associates
    
    return (
    <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center w-full mb-4">
            <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md mr-4" />
            <div className="flex-grow">
                <p className="font-bold text-gray-800">{product.id}</p>
                <p className="text-gray-600">{product.name}</p>
                <p className="text-sm text-gray-500">Talla: {item.size} | Color: {item.color}</p>
                <p className="text-sm text-gray-500">Catálogo</p>
            </div>
             <button onClick={() => onRemove(product.id)} className="text-gray-500 hover:text-red-600 ml-4"><Trash2Icon className="w-5 h-5"/></button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center w-full text-center">
             <div className="">
                <p className="text-xs text-gray-500">Precio catálogo</p>
                <p className="font-semibold">S/ {product.price.toFixed(2)}</p>
            </div>
             <div className="">
                <p className="text-xs text-gray-500">Monto a pagar</p>
                <p className="font-semibold">S/ {priceAfterDiscount.toFixed(2)}</p>
            </div>
             <div className="sm:col-span-2 flex items-center justify-center space-x-2">
                <div className="flex items-center border rounded-md">
                    <button onClick={() => onUpdateQuantity(product.id, item.quantity - 1)} className="px-3 py-1 text-lg font-bold">-</button>
                    <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(product.id, item.quantity + 1)} className="px-3 py-1 text-lg font-bold">+</button>
                </div>
                 <div className="text-center">
                    <p className="text-xs text-gray-500">Sub total</p>
                    <p className="font-bold text-gray-800">S/ {(priceAfterDiscount * item.quantity).toFixed(2)}</p>
                </div>
            </div>
        </div>
    </div>
)};

const OrdersPage: React.FC = () => {
    const { cart, setView, updateCartItemQuantity, removeFromCart } = useApp();
    
    const catalogPrice = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const total = cart.reduce((acc, item) => acc + (item.product.price * 0.8) * item.quantity, 0);
    const gain = catalogPrice - total;

    return (
        <div>
            <div className="text-sm text-gray-500 mb-4">INICIO | PEDIDOS</div>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">INGRESA TU PEDIDO</h2>

            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                    <div className="lg:col-span-1">
                        <label className="text-sm text-gray-600">Código</label>
                        <input type="text" className="w-full border rounded-md p-2 mt-1" />
                    </div>
                    <div className="md:col-span-2 lg:col-span-2">
                        <label className="text-sm text-gray-600">Descripcion de producto</label>
                        <input type="text" className="w-full border rounded-md p-2 mt-1" />
                    </div>
                    <div className="flex items-end gap-2">
                         <div className="flex-1">
                            <label className="text-sm text-gray-600">Talla</label>
                            <input type="text" className="w-full border rounded-md p-2 mt-1" />
                        </div>
                        <div className="flex items-center border rounded-md">
                           <button type="button" className="px-3 py-2 text-lg font-bold">-</button>
                           <span className="px-4 py-2 bg-gray-100">1</span>
                           <button type="button" className="px-3 py-2 text-lg font-bold">+</button>
                        </div>
                    </div>
                    <div className="md:col-span-2 lg:col-span-1 flex space-x-2">
                        <input type="text" placeholder="Cliente (Opcional)" className="w-full border rounded-md p-2" />
                        <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-md font-semibold">Agregar</button>
                    </div>
                </form>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-2/3">
                    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                        <p className="text-sm text-gray-700 mb-1">Te faltan S/. 120.50 para alcanzar tu premio</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="font-semibold text-gray-700">Has agregado {cart.length} productos</p>
                        {cart.length > 0 ? (
                            cart.map(item => <OrderItem key={item.product.id} item={item} onUpdateQuantity={updateCartItemQuantity} onRemove={removeFromCart} />)
                        ) : (
                            <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                                <p className="text-gray-500">Tu carrito está vacío.</p>
                                <button onClick={() => setView(View.PRODUCTS)} className="mt-4 text-red-600 font-semibold hover:underline">
                                    Ir a comprar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="lg:w-1/3">
                    <div className="bg-gray-200 p-4 rounded-lg text-sm mb-4">
                        <div className="flex justify-between">
                            <p>Crédito disponible para esta compra</p>
                            <p className="font-semibold">S/ 100.00</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Puntos acumulados</p>
                            <p className="font-semibold">250 pts</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold text-center mb-4">Resumen de pedido</h3>
                        <div className="space-y-3 text-gray-700">
                            <div className="flex justify-between">
                                <p>Precio Catálogo</p>
                                <p>S/ {catalogPrice.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Tu ganancia</p>
                                <p>S/ {gain.toFixed(2)}</p>
                            </div>
                            <hr className="my-3"/>
                            <div className="flex justify-between font-bold text-lg">
                                <p>Total a pagar</p>
                                <p>S/ {total.toFixed(2)}</p>
                            </div>
                        </div>
                        <button 
                          onClick={() => setView(View.CHECKOUT)} 
                          className="w-full bg-red-600 text-white mt-6 py-3 rounded-lg font-bold hover:bg-red-700 transition disabled:bg-gray-400"
                          disabled={cart.length === 0}
                        >
                            Reservar pedido
                        </button>
                    </div>
                     <div className="mt-4 bg-gray-300 rounded-lg h-32 flex items-center justify-center">
                        <img src="https://picsum.photos/seed/gana-banner/300/100" className="object-cover" alt="gana mas" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;