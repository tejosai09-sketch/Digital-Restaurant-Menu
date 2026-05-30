import React from 'react';
import '../styles/CartPage.css';

const Cart = ({ cart, updateQuantity, setCurrentPage, tableNumber, setTableNumber, setPlacedOrder, clearCart }) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!tableNumber.trim()) {
      alert("Please enter your Table Number before placing the order!");
      return;
    }
    setPlacedOrder({
      items: cart,
      tableNumber: tableNumber,
      totalAmount: totalAmount,
      estimatedTime: 15,
    });
    clearCart();
    setCurrentPage('order');
  };

  return (
    <div className="cart-page-wrapper">
      <div className="cart-header">
        <button onClick={() => setCurrentPage('home')} className="back-btn">←</button>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>Review Your Order</h2>
      </div>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>Your cart is empty!</div>
      ) : (
        <div style={{ padding: '16px' }}>
          {cart.map((item) => (
            <div key={item.id} className="cart-item-row">
              <div>
                <h4 style={{ margin: '0 0 4px 0' }}>{item.name}</h4>
                <p style={{ margin: 0, color: '#FFC20E', fontWeight: 'bold' }}>₹{item.price}</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, -1)} className="qty-btn">-</button>
                <span style={{ fontWeight: 'bold', minWidth: '16px', textAlign: 'center' }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="qty-btn">+</button>
              </div>
            </div>
          ))}

          <div className="table-input-container">
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Enter Table Number *</label>
            <input 
              type="text" 
              className="table-input"
              placeholder="e.g., Table 5" 
              value={tableNumber} 
              onChange={(e) => setTableNumber(e.target.value)} 
            />
          </div>

          <div className="price-card">
            <div className="price-row"><span>Item Total</span><span>₹{totalAmount}</span></div>
            <div className="price-row"><span>Delivery Charges</span><span style={{ color: 'green' }}>FREE</span></div>
            <hr style={{ border: 'none', borderTop: '1px dashed #eee', margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <span>Grand Total</span><span>₹{totalAmount}</span>
            </div>
          </div>

          <div className="sticky-checkout-bar">
            <div><strong>₹{totalAmount}</strong></div>
            <button onClick={handlePlaceOrder} className="place-order-btn">Place Order ➔</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;