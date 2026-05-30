import React from 'react';
import '../styles/HomePage.css';

const Categories = ({ categories, selectedCategory, setSelectedCategory }) => {
  // Mapping categories to match layout icons
  const categoryIcons = {
    All: "🍽️",
    Noodles: "🍜",
    "Fried Rice": "🍛",
    Starters: "🔥",
    Biryanis: "🍗"
  };

  return (
    <div className="categories-container no-scrollbar">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => setSelectedCategory(category)}
        >
          <span className="category-emoji">{categoryIcons[category] || "🍔"}</span>
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;