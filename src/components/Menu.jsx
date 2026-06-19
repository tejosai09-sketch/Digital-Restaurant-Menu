import React from 'react';
import FoodCard from './FoodCard';

const Menu = ({ menuItems, addToCart }) => {
  return (
    <div className="menu-grid">
      {menuItems.map((item) => (
        <FoodCard key={item.id} item={item} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default Menu;