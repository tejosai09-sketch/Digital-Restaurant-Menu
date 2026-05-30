import React from 'react';
import '../styles/CartBar.css';

const CartBar = ({ cart, setCurrentPage }) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-bar-container">
      <div className="cart-bar-left">
        <div className="cart-icon-circle">
          🛒
          <span className="cart-badge-count">{totalItems}</span>
        </div>
        <div className="cart-text-info">
          <span className="cart-title-meta">{totalItems} {totalItems === 1 ? 'Item' : 'Items'} | ₹{totalAmount}</span>
          <span className="cart-subtitle-meta">View your cart</span>
        </div>
      </div>
      <button className="view-cart-btn" onClick={() => setCurrentPage('cart')}>
        View Cart <span>❯</span>
      </button>
    </div>
  );
};

export default CartBar;