import React, { useState } from "react";
import "../styles/HomePage.css";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const [listening, setListening] = useState(false);

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    setListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setSearchTerm(voiceText);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
      alert("Voice search failed. Please try again.");
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <div className="search-box-container">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>

        <input
          type="text"
          className="search-input"
          placeholder="Search or speak food name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          type="button"
          className={`voice-search-btn ${listening ? "listening" : ""}`}
          onClick={handleVoiceSearch}
        >
          {listening ? "🎙️" : "🎤"}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;