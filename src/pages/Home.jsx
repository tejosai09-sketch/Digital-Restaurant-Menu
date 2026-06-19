import { useEffect, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import Menu from "../components/Menu";
import CartBar from "../components/CartBar";
import "../styles/HomePage.css";
import API_BASE_URL from "../api/api";
import { supabase } from "../lib/supabaseClient";
import AdsSection from "../components/AdsSection";

const Home = ({ addToCart, cart, setCurrentPage }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [dietFilter, setDietFilter] = useState("All"); // "All", "Veg", "Non-Veg"
  const [ads, setAds] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
const [restaurantLoading, setRestaurantLoading] = useState(true);

  useEffect(() => {
  const today = new Date().toISOString().split("T")[0];

  supabase
    .from("ads")
    .select("*")
    .eq("is_active", true)
    .or(`start_date.is.null,start_date.lte.${today}`)
    .or(`end_date.is.null,end_date.gte.${today}`)
    .order("created_at", { ascending: false })
    .then(({ data, error }) => {
      if (error) {
        console.error("Ads fetch error:", error);
        return;
      }

      setAds(data || []);
    });
}, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/menu`)
      .then((res) => res.json())
      .then((result) => {
        const items = result.data.map((item) => {
          const lowerName = item.name.toLowerCase();
          const isNonVeg = lowerName.includes("chicken") || lowerName.includes("egg");
          return {
            id: item.id,
            category: item.category,
            name: item.name,
            price: Number(item.price),
            image: item.image,
            available: item.available,
            isVeg: !isNonVeg,
          };
        });

        setMenuItems(items);
      })
      .catch((error) => console.error("Menu fetch error:", error));
  }, []);
  useEffect(() => {
  fetch(`${API_BASE_URL}/restaurant`)
    .then((res) => res.json())
    .then((result) => {
      setRestaurant(result.data);
      setRestaurantLoading(false);
    })
    .catch((error) => {
      console.error("Restaurant fetch error:", error);
      setRestaurantLoading(false);
    });
}, []);

  const categories = ["All", ...new Set(menuItems.map((item) => item.category))];

  const filteredItems = menuItems.filter((item) => {
    const categoryMatch =
      selectedCategory === "All" || item.category === selectedCategory;

    const searchMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

    const dietMatch =
      dietFilter === "All" ||
      (dietFilter === "Veg" && item.isVeg) ||
      (dietFilter === "Non-Veg" && !item.isVeg);

    const isAvailable =
      item.available === true ||
      item.available === 1 ||
      item.available === "1";

    return categoryMatch && searchMatch && dietMatch && isAvailable;
  });
  if (restaurantLoading) {
  return <div className="home-container">Loading...</div>;
}

if (restaurant?.is_open === false) {
  return (
    <div className="closed-page">
      <div className="closed-card">
        <div className="closed-logo">🍽️</div>
        <div className="closed-emoji">🥺</div>

        <h1>Sorry, We're Closed Right Now</h1>

        <p>
          Our kitchen is taking a little break and we're not accepting orders at
          the moment.
        </p>

        {restaurant?.phone1 && (
          <a href={`tel:${restaurant.phone1}`} className="closed-call-btn">
            📞 Call Restaurant
          </a>
        )}

        <div className="closed-brand">
          {restaurant?.name || "Restaurant"}
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="home-container" style={{ paddingBottom: cart.length > 0 ? "100px" : "20px" }}>
      <Header />
      <AdsSection ads={ads} />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="diet-filter-container">
        <button
          className={`diet-btn ${dietFilter === "All" ? "active" : ""}`}
          onClick={() => setDietFilter("All")}
        >
          All
        </button>
        <button
          className={`diet-btn veg ${dietFilter === "Veg" ? "active" : ""}`}
          onClick={() => setDietFilter("Veg")}
        >
          <span className="dot-veg" style={{display: 'inline-block', marginRight: '6px', border: '1px solid #15803d'}}></span> Veg
        </button>
        <button
          className={`diet-btn non-veg ${dietFilter === "Non-Veg" ? "active" : ""}`}
          onClick={() => setDietFilter("Non-Veg")}
        >
          <span className="triangle-nonveg" style={{display: 'inline-block', marginRight: '6px'}}></span> Non-Veg
        </button>
      </div>

      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Menu menuItems={filteredItems} addToCart={addToCart} />

      {cart.length > 0 && <CartBar cart={cart} setCurrentPage={setCurrentPage} />}
      <AdsSection ads={ads} menuItems={menuItems} addToCart={addToCart} />
    </div>
  );
};

export default Home;