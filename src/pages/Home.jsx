import { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import Menu from "../components/Menu";
import CartBar from "../components/CartBar";
import "../styles/HomePage.css";
import API_BASE_URL from "../api/api";

const Home = ({ addToCart, cart, setCurrentPage }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/menu`)
      .then((res) => res.json())
      .then((result) => {
        const items = result.data.map((item) => ({
          id: item.id,
          category: item.category,
          name: item.name,
          price: Number(item.price),
          image: item.image,
          available: item.available,
        }));

        setMenuItems(items);
      })
      .catch((error) => console.error("Menu fetch error:", error));
  }, []);

  const categories = ["All", ...new Set(menuItems.map((item) => item.category))];

  const filteredItems = menuItems.filter((item) => {
    const categoryMatch =
      selectedCategory === "All" || item.category === selectedCategory;

    const searchMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

    const isAvailable =
      item.available === true ||
      item.available === 1 ||
      item.available === "1";

    return categoryMatch && searchMatch && isAvailable;
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

      {cart.length > 0 && <CartBar cart={cart} setCurrentPage={setCurrentPage} />}
    </div>
  );
};

export default Home;