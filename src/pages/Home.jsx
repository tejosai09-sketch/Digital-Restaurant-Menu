import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import Menu from "../components/Menu";
import CartBar from "../components/CartBar";
import "../styles/HomePage.css";
import API_BASE_URL from "../api/api";
import { supabase } from "../lib/supabaseClient";
import AdsSection from "../components/AdsSection";
import Fuse from "fuse.js";

const Home = ({ addToCart, cart, setCurrentPage }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [dietFilter, setDietFilter] = useState("All");
  const [ads, setAds] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [restaurantLoading, setRestaurantLoading] = useState(true);

  const [voiceOpen, setVoiceOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [matchedOrder, setMatchedOrder] = useState([]);
  const [suggestedItems, setSuggestedItems] = useState([]);
  const [voiceError, setVoiceError] = useState("");

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
        const items = (result.data || []).map((item) => {
          const lowerName = item.name.toLowerCase();
          const isNonVeg =
            lowerName.includes("chicken") || lowerName.includes("egg");

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

  const availableMenuItems = useMemo(() => {
    return menuItems.filter(
      (item) =>
        item.available === true ||
        item.available === 1 ||
        item.available === "1"
    );
  }, [menuItems]);

  const categories = useMemo(() => {
    return ["All", ...new Set(availableMenuItems.map((item) => item.category))];
  }, [availableMenuItems]);
  const fuse = useMemo(() => {
  return new Fuse(availableMenuItems, {
    keys: ["name", "category"],
    threshold: 0.4,
    ignoreLocation: true,
  });
}, [availableMenuItems]);


 const filteredItems = useMemo(() => {
  const dietAndCategoryItems = availableMenuItems.filter((item) => {
    const categoryMatch =
      selectedCategory === "All" || item.category === selectedCategory;

    const dietMatch =
      dietFilter === "All" ||
      (dietFilter === "Veg" && item.isVeg) ||
      (dietFilter === "Non-Veg" && !item.isVeg);

    return categoryMatch && dietMatch;
  });

  if (!searchTerm.trim()) return dietAndCategoryItems;

  const searchResults = fuse.search(searchTerm).map((result) => result.item);

  return searchResults.filter((item) =>
    dietAndCategoryItems.some((baseItem) => baseItem.id === item.id)
  );
}, [availableMenuItems, selectedCategory, searchTerm, dietFilter, fuse]);

  const extractQuantity = (text, itemName) => {
    const wordsToNumbers = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
    };

    const itemIndex = text.indexOf(itemName.toLowerCase());
    const beforeItem =
      itemIndex >= 0 ? text.slice(Math.max(0, itemIndex - 25), itemIndex) : text;

    const numberMatch = beforeItem.match(/\d+/);
    if (numberMatch) return Number(numberMatch[0]);

    for (const word in wordsToNumbers) {
      if (beforeItem.includes(word)) return wordsToNumbers[word];
    }

    return 1;
  };

  const findRelatedItems = (transcript) => {
    const words = transcript
      .toLowerCase()
      .split(" ")
      .filter((word) => word.length > 2);

    return availableMenuItems
      .map((item) => {
        const itemName = item.name.toLowerCase();
        const itemWords = itemName.split(" ");

        let score = 0;

        words.forEach((word) => {
          if (itemName.includes(word)) score += 2;
          if (itemWords.some((itemWord) => itemWord.includes(word))) score += 1;
        });

        return { ...item, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  };

  const startVoiceOrder = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    setVoiceOpen(true);
    setIsListening(false);
    setVoiceText("");
    setMatchedOrder([]);
    setSuggestedItems([]);
    setVoiceError("");

    if (!SpeechRecognition) {
      setVoiceError(
        "Voice ordering is not supported in this browser. Please use Chrome."
      );
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setVoiceText(transcript);

      const exactMatches = availableMenuItems
        .filter((item) => transcript.includes(item.name.toLowerCase()))
        .map((item) => ({
          ...item,
          quantity: extractQuantity(transcript, item.name),
        }));

      if (exactMatches.length > 0) {
        setMatchedOrder(exactMatches);
        setSuggestedItems([]);
        setVoiceError("");
      } else {
        const related = findRelatedItems(transcript);
        setMatchedOrder([]);
        setSuggestedItems(related);

        if (related.length > 0) {
          setVoiceError("I found related items. Please select one.");
        } else {
          setVoiceError("No related items found. Please try again.");
        }
      }

      setIsListening(false);
    };

    recognition.onerror = () => {
      setVoiceError("Voice capture failed. Please try again.");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const selectSuggestedItem = (item) => {
    setMatchedOrder([{ ...item, quantity: 1 }]);
    setSuggestedItems([]);
    setVoiceError("");
  };

  const confirmVoiceOrder = () => {
    matchedOrder.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        addToCart(item);
      }
    });

    setVoiceOpen(false);
    setVoiceText("");
    setMatchedOrder([]);
    setSuggestedItems([]);
    setVoiceError("");
  };

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
            Our kitchen is taking a little break and we're not accepting orders
            at the moment.
          </p>

          {restaurant?.phone1 && (
            <a href={`tel:${restaurant.phone1}`} className="closed-call-btn">
              📞 Call Restaurant
            </a>
          )}

          <div className="closed-brand">{restaurant?.name || "Restaurant"}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="home-container"
      style={{ paddingBottom: cart.length > 0 ? "100px" : "20px" }}
    >
      <Header />

      <AdsSection ads={ads} menuItems={menuItems} addToCart={addToCart} />

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
          <span
            className="dot-veg"
            style={{
              display: "inline-block",
              marginRight: "6px",
              border: "1px solid #15803d",
            }}
          ></span>
          Veg
        </button>

        <button
          className={`diet-btn non-veg ${
            dietFilter === "Non-Veg" ? "active" : ""
          }`}
          onClick={() => setDietFilter("Non-Veg")}
        >
          <span
            className="triangle-nonveg"
            style={{ display: "inline-block", marginRight: "6px" }}
          ></span>
          Non-Veg
        </button>
      </div>

      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Menu menuItems={filteredItems} addToCart={addToCart} />

      {!voiceOpen && (
        <button className="ai-voice-btn" onClick={startVoiceOrder}>
          🎙️ Order with AI
        </button>
      )}

      {voiceOpen && (
        <div className="voice-modal-overlay">
          <div className="voice-modal">
            <button
              className="voice-close"
              onClick={() => {
                setVoiceOpen(false);
                setIsListening(false);
              }}
            >
              ×
            </button>

            <div className={`voice-mic ${isListening ? "listening" : ""}`}>
              🎙️
            </div>

            <h2>{isListening ? "Listening..." : "AI Voice Order"}</h2>

            <p className="voice-subtitle">
              Say your order like: “Two chicken biryani and one coke”
            </p>

            {voiceText && (
              <div className="voice-text-box">
                <strong>You said:</strong>
                <p>{voiceText}</p>
              </div>
            )}

            {matchedOrder.length > 0 && (
              <div className="voice-order-box">
                <h3>Your Order</h3>

                {matchedOrder.map((item) => (
                  <div className="voice-order-item" key={item.id}>
                    <span>
                      {item.quantity} × {item.name}
                    </span>
                    <b>₹{item.price * item.quantity}</b>
                  </div>
                ))}

                <button
                  className="voice-confirm-btn"
                  onClick={confirmVoiceOrder}
                >
                  Add to Cart
                </button>
              </div>
            )}

            {voiceError && <p className="voice-error">{voiceError}</p>}

            {suggestedItems.length > 0 && (
              <div className="voice-suggestions-box">
                <h3>Related Items</h3>

                {suggestedItems.map((item) => (
                  <div className="voice-suggestion-item" key={item.id}>
                    <span>{item.name}</span>
                    <b>₹{item.price}</b>
                    <button onClick={() => selectSuggestedItem(item)}>
                      Select
                    </button>
                  </div>
                ))}
              </div>
            )}

            {!isListening && (
              <button className="voice-retry-btn" onClick={startVoiceOrder}>
                Try Again
              </button>
            )}
          </div>
        </div>
      )}

      {cart.length > 0 && (
        <CartBar cart={cart} setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
};

export default Home;