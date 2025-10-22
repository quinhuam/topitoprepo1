
import React from 'react';
// FIX: Add .tsx/.ts extensions to fix module resolution errors. Note the double .. for path traversal.
import { useApp } from '../../App.tsx';
import { View } from '../../types.ts';
import CreditLineView from './CreditLineView';
import OrderListView from './OrderListView';
import PaymentsView from './PaymentsView';
import ClientsView from './ClientsView';
import ReturnsView from './ReturnsView';
import OrderDetailView from './OrderDetailView';

const MyBusinessPage: React.FC = () => {
  const { view } = useApp();

  const getTitle = () => {
    switch(view) {
      case View.MY_BUSINESS_CREDIT: return 'Línea de crédito';
      case View.MY_BUSINESS_ORDERS: return 'Lista de pedidos';
      case View.MY_BUSINESS_PAYMENTS: return 'Mis pagos';
      case View.MY_BUSINESS_CLIENTS: return 'Mis clientes';
      case View.MY_BUSINESS_RETURNS: return 'Cambios';
      case View.MY_BUSINESS_ORDER_DETAIL: return 'Detalle del Pedido';
      default: return 'Mi Negocio';
    }
  }

  const renderBusinessView = () => {
    switch (view) {
      case View.MY_BUSINESS_CREDIT:
        return <CreditLineView />;
      case View.MY_BUSINESS_ORDERS:
        return <OrderListView />;
      case View.MY_BUSINESS_PAYMENTS:
        return <PaymentsView />;
      case View.MY_BUSINESS_CLIENTS:
        return <ClientsView />;
      case View.MY_BUSINESS_RETURNS:
        return <ReturnsView />;
      case View.MY_BUSINESS_ORDER_DETAIL:
        return <OrderDetailView />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="text-sm text-gray-500 mb-4">INICIO | MI NEGOCIO | {getTitle().toUpperCase()}</div>
      {renderBusinessView()}
    </div>
  );
};

export default MyBusinessPage;