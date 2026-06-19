import { useEffect, useState } from "react";
import "../styles/AdsSection.css";

const AdsSection = ({ ads }) => {
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
          {ads.map((ad) => (
            <div className="ads-slide" key={ad.id}>
              <div className={`menu-ad-card ${ad.ad_style}`}>
                <div className="menu-ad-info">
                  <span>{ad.discount_text}</span>
                  <h3>{ad.title}</h3>
                  <p>{ad.description}</p>
                  <button>{ad.button_text || "Order Now"}</button>
                </div>

                {ad.image_url && <img src={ad.image_url} alt={ad.title} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ads-dots">
        {ads.map((_, index) => (
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