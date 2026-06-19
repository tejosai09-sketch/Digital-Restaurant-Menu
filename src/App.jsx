import { useState } from 'react';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Order from './pages/Order';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState('');
  const [placedOrder, setPlacedOrder] = useState(null);

  // Helper functions to manage cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + change;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  return (
    <div className="app-wrapper">
      {currentPage === 'home' && (
        <Home 
          addToCart={addToCart} 
          cart={cart} 
          setCurrentPage={setCurrentPage} 
        />
      )}
      {currentPage === 'cart' && (
        <Cart 
          cart={cart} 
          updateQuantity={updateQuantity} 
          setCurrentPage={setCurrentPage} 
          tableNumber={tableNumber}
          setTableNumber={setTableNumber}
          setPlacedOrder={setPlacedOrder}
          clearCart={clearCart}
        />
      )}
      {currentPage === 'order' && (
        <Order 
          placedOrder={placedOrder} 
          setCurrentPage={setCurrentPage} 
        />
      )}
    </div>
  );
}

export default App;