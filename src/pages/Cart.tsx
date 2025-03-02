
import React from 'react';
import Header from '@/components/Header';
import Cart from '@/components/Cart';

const CartPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Cart />
    </div>
  );
};

export default CartPage;
