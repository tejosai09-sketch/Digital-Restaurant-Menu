import React from 'react';
import FoodCard from './FoodCard';

const Menu = ({ menuItems, addToCart }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '16px' }}>
      {menuItems.map((item) => (
        <FoodCard key={item.id} item={item} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default Menu;