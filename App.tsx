import React, { useState, createContext, useContext } from 'react';
import { View, Product, CartItem, UserData } from './types';
import LoginPage from './components/LoginPage';
import MainLayout from './components/MainLayout';
import DashboardPage from './components/DashboardPage';
import OrdersPage from './components/OrdersPage';
import CatalogsPage from './components/CatalogsPage';
import ProductsPage from './components/ProductsPage';
import PrizesPage from './components/PrizesPage';
import ProfilePage from './components/ProfilePage';
import AffiliatePage from './components/AffiliatePage';
import CheckoutPage from './components/CheckoutPage';
import MyBusinessPage from './components/my-business/MyBusinessPage';

interface AppContextType {
  view: View;
  setView: (view: View) => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  activeProductCategory: string | null;
  setActiveProductCategory: (category: string | null) => void;
  selectedOrder: any | null;
  setSelectedOrder: (order: any | null) => void;
  userData: UserData;
  redeemPrize: (level: number, prizeName: string, pointsCost: number) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.LOGIN);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeProductCategory, setActiveProductCategory] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [userData, setUserData] = useState<UserData>({ points: 380, redeemedPrizes: {} });

  const login = () => {
    setIsLoggedIn(true);
    setView(View.DASHBOARD);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setView(View.LOGIN);
    setCart([]);
  };

  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity, size: 'M', color: 'Default' }];
    });
    alert(`${product.name} has been added to cart.`);
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };
  
  const clearCart = () => {
    setCart([]);
  };

  const redeemPrize = (level: number, prizeName: string, pointsCost: number) => {
    setUserData(prevData => ({
      points: prevData.points - pointsCost,
      redeemedPrizes: {
        ...prevData.redeemedPrizes,
        [level]: prizeName
      }
    }));
  };

  const renderView = () => {
    if (!isLoggedIn) {
      switch (view) {
        case View.AFFILIATE:
          return <AffiliatePage />;
        default:
          return <LoginPage />;
      }
    }

    let pageComponent;
    switch (view) {
      case View.DASHBOARD:
        pageComponent = <DashboardPage />;
        break;
      case View.ORDERS:
        pageComponent = <OrdersPage />;
        break;
      case View.CATALOGS:
        pageComponent = <CatalogsPage />;
        break;
      case View.PRODUCTS:
        pageComponent = <ProductsPage />;
        break;
      case View.PRIZES:
        pageComponent = <PrizesPage />;
        break;
      case View.PROFILE:
        pageComponent = <ProfilePage />;
        break;
      case View.CHECKOUT:
        pageComponent = <CheckoutPage />;
        break;
      case View.MY_BUSINESS_CREDIT:
      case View.MY_BUSINESS_ORDERS:
      case View.MY_BUSINESS_PAYMENTS:
      case View.MY_BUSINESS_CLIENTS:
      case View.MY_BUSINESS_RETURNS:
      case View.MY_BUSINESS_ORDER_DETAIL:
        pageComponent = <MyBusinessPage />;
        break;
      default:
        pageComponent = <DashboardPage />;
    }
    return <MainLayout>{pageComponent}</MainLayout>;
  };

  const contextValue: AppContextType = {
    view,
    setView,
    isLoggedIn,
    login,
    logout,
    cart,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    activeProductCategory,
    setActiveProductCategory,
    selectedOrder,
    setSelectedOrder,
    userData,
    redeemPrize,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {renderView()}
    </AppContext.Provider>
  );
};

export default App;