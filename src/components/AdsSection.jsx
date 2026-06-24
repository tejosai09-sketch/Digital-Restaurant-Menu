import { useEffect, useState } from "react";
import "../styles/AdsSection.css";

const AdsSection = ({ ads, menuItems = [], addToCart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!ads || ads.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [ads]);

  if (!ads || ads.length === 0) return null;

  return (
    <section className="menu-ads-section">
      <div className="ads-slider">
        <div
          className="ads-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {ads.map((ad, index) => (

            <div className="ads-slide" key={ad.id || index}>
              <div className={`menu-ad-card ${ad.ad_style}`}>
                <div className="menu-ad-info">
                  <span>{ad.discount_text}</span>
                  <h3>{ad.title}</h3>
                  <p>{ad.description}</p>
                  <button
  onClick={() => {
    const item = menuItems.find(
      (menuItem) => Number(menuItem.id) === Number(ad.menu_item_id)
    );

    if (!item) {
      alert("This offer item is currently unavailable.");
      return;
    }

    addToCart(item);
  }}
>
  {ad.button_text || "Add to Cart"}
</button>
                </div>

                {ad.image_url && <img src={ad.image_url} alt={ad.title} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ads-dots">
        {ads.map((ad, index) => (
          <button
            key={index}
            className={currentIndex === index ? "active-dot" : ""}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default AdsSection;