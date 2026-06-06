import React, { useState, useEffect } from "react";
import "../styles/OrderPage.css";
import API_BASE_URL from "../api/api";

const Order = ({ placedOrder, setCurrentPage }) => {
  if (!placedOrder) {
    return <div style={{ padding: "40px" }}>No active orders found.</div>;
  }

  const [secondsLeft, setSecondsLeft] = useState(
    placedOrder.estimatedTime * 60
  );

  const [orderStatus, setOrderStatus] = useState(
    placedOrder.status || "Pending"
  );

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/orders/${placedOrder.id}`
        );

        const result = await response.json();

        if (result.success) {
          setOrderStatus(result.data.status);
        }
      } catch (error) {
        console.error(error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [placedOrder.id]);

  useEffect(() => {
    if (secondsLeft <= 0 || orderStatus === "Ready") return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, orderStatus]);

  const formatTime = (timeInSeconds) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="order-page-container">
      <div className="success-checkmark-circle">✓</div>

      <h2 style={{ margin: "0 0 8px 0", fontWeight: "bold" }}>
        Order Confirmed!
      </h2>

      <p style={{ color: "#666" }}>
        Sent straight to the chef for{" "}
        <strong>{placedOrder.tableNumber}</strong>
      </p>

      <div className="live-timer-card">
        <p
          style={{
            margin: "0 0 8px 0",
            fontSize: "13px",
            color: "#666",
            fontWeight: "bold",
          }}
        >
          ORDER STATUS
        </p>

        <h1 className="countdown-digits">
          {orderStatus === "Ready"
            ? "🎉 Food Ready!"
            : secondsLeft > 0
            ? formatTime(secondsLeft)
            : "Preparing..."}
        </h1>

        <p style={{ marginTop: "8px", color: "#666", fontWeight: "bold" }}>
          Current Status: {orderStatus}
        </p>
      </div>

      <div className="summary-card">
        <h4
          style={{
            margin: "0 0 12px 0",
            borderBottom: "1px solid #eee",
            paddingBottom: "8px",
          }}
        >
          Order Summary
        </h4>

        {placedOrder.items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "6px",
              fontSize: "14px",
            }}
          >
            <span>
              {item.name} <strong>x{item.quantity}</strong>
            </span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setCurrentPage("home")}
        className="order-more-btn"
      >
        Order More Items
      </button>
    </div>
  );
};

export default Order;