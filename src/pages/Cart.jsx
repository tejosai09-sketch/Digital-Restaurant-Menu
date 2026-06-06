import React, { useState } from "react";
import "../styles/CartPage.css";
import API_BASE_URL from "../api/api";

const Cart = ({
  cart,
  updateQuantity,
  setCurrentPage,
  tableNumber,
  setTableNumber,
  setPlacedOrder,
  clearCart,
}) => {
  const [orderType, setOrderType] = useState("table");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (orderType === "table" && !tableNumber.trim()) {
      alert("Please enter your table number!");
      return;
    }

    if (orderType === "delivery") {
      if (!customerName.trim()) {
        alert("Please enter your name!");
        return;
      }

      if (!customerPhone.trim()) {
        alert("Please enter your phone number!");
        return;
      }

      if (!deliveryAddress.trim()) {
        alert("Please enter your delivery address!");
        return;
      }
    }

    const orderData = {
      restaurant_id: 1,
      order_type: orderType,
      customer_name: orderType === "delivery" ? customerName : "Dine-in Guest",
      customer_phone: orderType === "delivery" ? customerPhone : "",
      table_number: orderType === "table" ? tableNumber : null,
      delivery_address: orderType === "delivery" ? deliveryAddress : null,
      total_amount: totalAmount,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!result.success) {
        alert("Failed to place order. Please try again.");
        return;
      }

      setPlacedOrder({
        id: result.orderId,
        items: cart,
        tableNumber: orderType === "table" ? tableNumber : "Delivery Order",
        totalAmount,
        estimatedTime: 15,
        status: "Pending",
      });

      clearCart();
      setCurrentPage("order");
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong while placing the order.");
    }
  };

  return (
    <div className="cart-page-wrapper">
      <div className="cart-header">
        <button onClick={() => setCurrentPage("home")} className="back-btn">
          ←
        </button>

        <div>
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "bold" }}>
            Review Your Order
          </h2>
          <p style={{ margin: "4px 0 0", color: "#777", fontSize: "13px" }}>
            Confirm your items and order details
          </p>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart-box">
          <div style={{ fontSize: "42px" }}>🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some delicious items to continue.</p>
          <button onClick={() => setCurrentPage("home")} className="place-order-btn">
            Browse Menu
          </button>
        </div>
      ) : (
        <div style={{ padding: "16px" }}>
          <div className="cart-section-card">
            <h3 className="cart-section-title">Your Items</h3>

            {cart.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div>
                  <h4 style={{ margin: "0 0 4px 0" }}>{item.name}</h4>
                  <p style={{ margin: 0, color: "#FFC20E", fontWeight: "bold" }}>
                    ₹{item.price}
                  </p>
                </div>

                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span style={{ fontWeight: "bold", minWidth: "16px", textAlign: "center" }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-section-card">
            <h3 className="cart-section-title">Order Type</h3>

            <div className="order-type-tabs">
              <button
                className={`order-type-tab ${orderType === "table" ? "active" : ""}`}
                onClick={() => setOrderType("table")}
              >
                🍽 Dine-in
              </button>

              <button
                className={`order-type-tab ${orderType === "delivery" ? "active" : ""}`}
                onClick={() => setOrderType("delivery")}
              >
                🛵 Delivery
              </button>
            </div>

            {orderType === "table" && (
              <div className="table-input-container">
                <label>Table Number *</label>
                <input
                  type="text"
                  className="table-input"
                  placeholder="e.g., Table 5"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                />
              </div>
            )}

            {orderType === "delivery" && (
              <div className="table-input-container">
                <label>Customer Name *</label>
                <input
                  type="text"
                  className="table-input"
                  placeholder="Enter your name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />

                <label>Phone Number *</label>
                <input
                  type="tel"
                  className="table-input"
                  placeholder="Enter your phone number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />

                <label>Delivery Address *</label>
                <textarea
                  className="table-input"
                  placeholder="GPS address will be added later"
                  rows={3}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="price-card">
            <div className="price-row">
              <span>Item Total</span>
              <span>₹{totalAmount}</span>
            </div>

            <div className="price-row">
              <span>Delivery Charges</span>
              <span style={{ color: "green" }}>FREE</span>
            </div>

            <hr style={{ border: "none", borderTop: "1px dashed #eee", margin: "12px 0" }} />

            <div className="price-row" style={{ fontWeight: "bold", fontSize: "16px" }}>
              <span>Grand Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          <div className="sticky-checkout-bar">
            <div>
              <small>Total</small>
              <br />
              <strong>₹{totalAmount}</strong>
            </div>

            <button onClick={handlePlaceOrder} className="place-order-btn">
              Place Order ➔
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;