import React, { useEffect, useState } from "react";
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
  const [paymentMethod, setPaymentMethod] = useState("pay_to_bearer");

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const [deliveryLatitude, setDeliveryLatitude] = useState(null);
  const [deliveryLongitude, setDeliveryLongitude] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    if (orderType === "table") {
      setPaymentMethod("pay_to_bearer");
    } else {
      setPaymentMethod("cash_on_delivery");
    }
  }, [orderType]);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setDeliveryLatitude(lat);
        setDeliveryLongitude(lng);

        if (!deliveryAddress.trim()) {
          setDeliveryAddress("Location shared via GPS");
        }

        setLocationLoading(false);
      },
      () => {
        alert("Unable to get location. Please allow location permission.");
        setLocationLoading(false);
      }
    );
  };
const handleOnlinePayment = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/orders/create-payment-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount,
        }),
      }
    );

    const data = await response.json();

    if (!data.success) {
      alert("Unable to initialize payment");
      return false;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: data.order.currency,
      name: "Masala House",
      description: "Restaurant Order Payment",
      order_id: data.order.id,

      handler: async function (response) {
        window.paymentResult = {
          success: true,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
        };
      },

      prefill: {
        name: customerName || "Guest",
        contact: customerPhone || "",
      },

      theme: {
        color: "#f97316",
      },
    };

    const razorpay = new window.Razorpay(options);

    return new Promise((resolve) => {
      razorpay.on("payment.failed", function () {
        resolve(false);
      });

      razorpay.open();

      const checkPayment = setInterval(() => {
        if (window.paymentResult?.success) {
          clearInterval(checkPayment);
          resolve(window.paymentResult);
        }
      }, 500);
    });
  } catch (error) {
    console.error(error);
    return false;
  }
};
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
let paymentStatus = "pending";
let razorpayOrderId = null;
let razorpayPaymentId = null;

if (paymentMethod === "online") {
  const paymentResult = await handleOnlinePayment();

  if (!paymentResult) {
    alert("Payment cancelled or failed");
    return;
  }

  paymentStatus = "paid";
  razorpayOrderId = paymentResult.razorpay_order_id;
  razorpayPaymentId = paymentResult.razorpay_payment_id;
}
    const orderData = {
      restaurant_id: 1,
      order_type: orderType,
      customer_name: orderType === "delivery" ? customerName : "Dine-in Guest",
      customer_phone: orderType === "delivery" ? customerPhone : "",
      table_number: orderType === "table" ? tableNumber : null,
      delivery_address: orderType === "delivery" ? deliveryAddress : null,
      delivery_latitude: orderType === "delivery" ? deliveryLatitude : null,
      delivery_longitude: orderType === "delivery" ? deliveryLongitude : null,
      payment_method: paymentMethod,
      total_amount: totalAmount,
      payment_status: paymentStatus,
razorpay_order_id: razorpayOrderId,
razorpay_payment_id: razorpayPaymentId,
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
        paymentMethod,
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
          <h2>Review Your Order</h2>
          <p>Confirm your items and order details</p>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart-box">
          <div className="empty-cart-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some delicious items to continue.</p>
          <button
            onClick={() => setCurrentPage("home")}
            className="place-order-btn"
          >
            Browse Menu
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-section-card">
            <div className="section-head">
              <h3>Your Items</h3>
              <span>{cart.length} item(s)</span>
            </div>

            {cart.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                </div>

                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
            ))}
            
            <button 
              className="add-more-items-btn" 
              onClick={() => setCurrentPage("home")}
            >
              + Add More Items
            </button>
          </div>

          <div className="cart-section-card">
            <div className="section-head">
              <h3>Order Type</h3>
            </div>

            <div className="choice-grid">
              <button
                className={`choice-card ${orderType === "table" ? "active" : ""}`}
                onClick={() => setOrderType("table")}
              >
                <span>🍽</span>
                <strong>Dine-in</strong>
                <small>Eat at table</small>
              </button>

              <button
                className={`choice-card ${
                  orderType === "delivery" ? "active" : ""
                }`}
                onClick={() => setOrderType("delivery")}
              >
                <span>🛵</span>
                <strong>Delivery</strong>
                <small>Free delivery</small>
              </button>
            </div>

            {orderType === "table" && (
              <div className="form-block">
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
              <div className="form-block">
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
                  placeholder="House no, area, landmark..."
                  rows={3}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                />

                <button
                  type="button"
                  className={`location-btn ${
                    deliveryLatitude && deliveryLongitude ? "location-added" : ""
                  }`}
                  onClick={handleUseCurrentLocation}
                >
                  {locationLoading
                    ? "Getting Location..."
                    : deliveryLatitude && deliveryLongitude
                    ? "✅ Location Added"
                    : "📍 Use Current Location"}
                </button>
              </div>
            )}
          </div>

          <div className="cart-section-card">
            <div className="section-head">
              <h3>Payment Method</h3>
            </div>

            <div className="payment-list">
              {orderType === "table" ? (
                <>
                  <button
                    className={`payment-option ${
                      paymentMethod === "pay_to_bearer" ? "active" : ""
                    }`}
                    onClick={() => setPaymentMethod("pay_to_bearer")}
                  >
                    <span>🧾</span>
                    <div>
                      <strong>Pay to Bearer</strong>
                      <small>Pay after food is served</small>
                    </div>
                  </button>

                  <button
                    className={`payment-option ${
                      paymentMethod === "online" ? "active" : ""
                    }`}
                    onClick={() => setPaymentMethod("online")}
                  >
                    <span>💳</span>
                    <div>
                      <strong>Pay Online</strong>
                      <small>UPI / card payment</small>
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={`payment-option ${
                      paymentMethod === "cash_on_delivery" ? "active" : ""
                    }`}
                    onClick={() => setPaymentMethod("cash_on_delivery")}
                  >
                    <span>💵</span>
                    <div>
                      <strong>Cash on Delivery</strong>
                      <small>Pay when food arrives</small>
                    </div>
                  </button>

                  <button
                    className={`payment-option ${
                      paymentMethod === "online" ? "active" : ""
                    }`}
                    onClick={() => setPaymentMethod("online")}
                  >
                    <span>💳</span>
                    <div>
                      <strong>Pay Online</strong>
                      <small>UPI / card payment</small>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="price-card">
            <div className="price-row">
              <span>Item Total</span>
              <span>₹{totalAmount}</span>
            </div>

            <div className="price-row">
              <span>Delivery Charges</span>
              <span className="free-text">FREE</span>
            </div>

            <hr />

            <div className="price-row total-row">
              <span>Grand Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          <div className="sticky-checkout-bar">
            <div>
              <small>Total</small>
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