import React from 'react';
import '../styles/FoodCard.css';

const FoodCard = ({ item, addToCart }) => {
  const isVeg = item.isVeg !== false;

    

  return (
    <div className="food-card">
      <div className="image-container">
        <img src={item.image} alt={item.name} className="food-image" />
        
        <div className={`badge-indicator ${isVeg ? 'badge-veg' : 'badge-nonveg'}`}>
          {isVeg ? <div className="dot-veg" /> : <div className="triangle-nonveg" />}
        </div>
      </div>

      <div className="card-content">
        <h4 className="food-title">{item.name}</h4>
        <div className="card-footer">
          <span className="food-price">₹{item.price}</span>
          <button className="add-btn" onClick={() => addToCart(item)}>
            <span>+</span> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;