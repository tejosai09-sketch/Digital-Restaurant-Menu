import { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import Menu from "../components/Menu";
import CartBar from "../components/CartBar";
import menuItems from "../data/menu";
import '../styles/HomePage.css'; // Pure structural file import

const Home = ({ addToCart, cart, setCurrentPage }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Noodles", "Fried Rice", "Starters", "Biryanis"];

  const filteredItems = menuItems.filter((item) => {
    const categoryMatch = selectedCategory === "All" || item.category === selectedCategory;
    const searchMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="home-container" style={{ paddingBottom: cart.length > 0 ? "100px" : "20px" }}>
      <Header />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Categories 
        categories={categories} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      
      <Menu menuItems={filteredItems} addToCart={addToCart} />

      {cart.length > 0 && (
        <CartBar cart={cart} setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
};

export default Home;