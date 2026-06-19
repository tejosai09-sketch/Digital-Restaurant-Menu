import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../styles/OrderPage.css";
import API_BASE_URL from "../api/api";

const Order = ({ placedOrder, setCurrentPage }) => {
  const [secondsLeft, setSecondsLeft] = useState(
    placedOrder ? placedOrder.estimatedTime * 60 : 0
  );
  const [orderStatus, setOrderStatus] = useState(
    placedOrder?.status || "Pending"
  );
  const [paymentStatus, setPaymentStatus] = useState(
    placedOrder?.paymentStatus || "pending"
  );
  const [paymentMethod, setPaymentMethod] = useState(
    placedOrder?.paymentMethod || "pending"
  );
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/restaurant`)
      .then((res) => res.json())
      .then((result) => setRestaurant(result.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!placedOrder?.id) return;

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/orders/${placedOrder.id}`);
        const result = await response.json();

        if (result.success) {
          setOrderStatus(result.data.status);
          setPaymentStatus(result.data.payment_status || "pending");
          setPaymentMethod(result.data.payment_method || paymentMethod);
        }
      } catch (error) {
        console.error(error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [placedOrder?.id]);

  useEffect(() => {
    if (secondsLeft <= 0 || orderStatus === "Ready") return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, orderStatus]);

  if (!placedOrder) {
    return <div style={{ padding: "40px" }}>No active orders found.</div>;
  }

  const formatTime = (timeInSeconds) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const generateCustomerBill = () => {
    const doc = new jsPDF();

    const restaurantName = restaurant?.name || "Restaurant";
    const address = restaurant?.address || "";
    const phone = restaurant?.phone || restaurant?.phone_number || "";

    doc.setFontSize(18);
    doc.text(restaurantName, 105, 15, { align: "center" });

    doc.setFontSize(10);
    if (address) doc.text(address, 105, 22, { align: "center" });
    if (phone) doc.text(`Phone: ${phone}`, 105, 28, { align: "center" });

    doc.line(14, 34, 196, 34);

    doc.setFontSize(11);
    doc.text(`Bill No: #${placedOrder.id}`, 14, 43);
    doc.text(`Date: ${new Date().toLocaleString()}`, 14, 50);
    doc.text(`Order Type: ${placedOrder.tableNumber}`, 14, 57);
    doc.text(`Payment Method: ${paymentMethod}`, 14, 64);
    doc.text(`Payment Status: ${paymentStatus}`, 14, 71);

    const rows = placedOrder.items.map((item, index) => [
      index + 1,
      item.name,
      item.quantity,
      `Rs. ${item.price}`,
      `Rs. ${item.price * item.quantity}`,
    ]);

    autoTable(doc, {
      startY: 80,
      head: [["#", "Item", "Qty", "Price", "Total"]],
      body: rows,
    });

    const finalY = doc.lastAutoTable.finalY + 12;

    doc.setFontSize(14);
    doc.text(`Grand Total: Rs. ${placedOrder.totalAmount}`, 14, finalY);

    doc.setFontSize(10);
    doc.text("Thank you! Visit again.", 105, finalY + 16, {
      align: "center",
    });

    doc.save(`Bill_Order_${placedOrder.id}.pdf`);
  };

  const isPaid = paymentStatus === "paid";

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

        <p style={{ marginTop: "6px", color: isPaid ? "green" : "#d97706" }}>
          Payment: {isPaid ? "Paid ✅" : "Pending"}
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

      {isPaid ? (
        <button onClick={generateCustomerBill} className="order-more-btn">
          Download Bill
        </button>
      ) : (
        <p style={{ color: "#d97706", fontWeight: "bold", marginTop: "14px" }}>
          Bill will be available after payment confirmation.
        </p>
      )}

      <button onClick={() => setCurrentPage("home")} className="order-more-btn">
        Order More Items
      </button>
    </div>
  );
};

export default Order;