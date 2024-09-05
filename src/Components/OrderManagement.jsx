import React, { useState } from "react";
import "./OrderManagement.css";
import { FaBox, FaMobileAlt, FaBasketballBall, FaTshirt, FaHome, FaEllipsisH } from "react-icons/fa";

const OrderManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCategory, setShowCategory] = useState(true); // To toggle the category section visibility
  const [loadType, setLoadType] = useState("Carton box");
  const [quantity, setQuantity] = useState(6);
  const [volumetric, setVolumetric] = useState({ length: 12, breadth: 12, height: 12 });
  const [weight, setWeight] = useState(100);
  const [invoiceNumber, setInvoiceNumber] = useState("ADH52VR");

  const [orders, setOrders] = useState([
    { loadType: "Carton box", quantity: 6, weight: 100, volumetric: { length: 12, breadth: 12, height: 12 }, productCategory: "Electronics", hazmat: "No", invoiceNumber: "ADH52VR" }
  ]);

  const addOrder = () => {
    const newOrder = { loadType, quantity, weight, volumetric, productCategory: selectedCategory, hazmat: "No", invoiceNumber };
    setOrders([...orders, newOrder]);
  };

  const categories = [
    { name: "Consumables", icon: <FaBox /> },
    { name: "Electronics", icon: <FaMobileAlt /> },
    { name: "Sports Equipment", icon: <FaBasketballBall /> },
    { name: "Cloth Items", icon: <FaTshirt /> },
    { name: "Household Items", icon: <FaHome /> },
    { name: "Others", icon: <FaEllipsisH /> },
  ];

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    setShowCategory(false); // Hide the category section after selection
  };

  const handleCategoryReset = () => {
    setShowCategory(true); // Show the category section again for re-selection
  };

  return (
    <div className="order-management">
      <div className="left-panel">
        <div className="order-header">
          <h2>Order Management</h2>
          <button className="new-order-btn" onClick={addOrder}>New Order +</button>
        </div>

        {showCategory ? (
          <div className="product-category">
            <h3>Select Product Category</h3>
            <div className="category-grid">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className={`category-box ${selectedCategory === category.name ? 'selected' : ''}`}
                  onClick={() => handleCategoryChange(category.name)}
                >
                  <div className="icon">{category.icon}</div>
                  <span>{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="selected-category-section">
            <label><h3>Product Category</h3></label>
            <div className="selected-category-display">
              <span>{selectedCategory}</span>
              <button className="change-btn" onClick={handleCategoryReset}>Change</button>
            </div>
          </div>
        )}

        <div className="load-type">
          <p>Load Type</p>
          <div className="load-box">
            <span>{loadType}</span>
            <span>{quantity} Quantity</span>
            <button className="change-btn">Change</button>
          </div>
        </div>

        <div className="volumetric-section">
          <div>
            <label>Volumetric</label>
            <input type="number" value={volumetric.length} onChange={(e) => setVolumetric({ ...volumetric, length: e.target.value })} placeholder="L" />
            <input type="number" value={volumetric.breadth} onChange={(e) => setVolumetric({ ...volumetric, breadth: e.target.value })} placeholder="B" />
            <input type="number" value={volumetric.height} onChange={(e) => setVolumetric({ ...volumetric, height: e.target.value })} placeholder="H" />
          </div>
          <div>
            <label>Actual Weight</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="Weight" />
            <span>kg</span>
          </div>
          <div>
            <label>Invoice No</label>
            <input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
          </div>
          <button className="add-order-btn" onClick={addOrder}>Add Order +</button>
        </div>

        <div className="order-overview">
          <h3>Order Overview</h3>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Invoice No</th>
                <th>Load Type</th>
                <th>Load Quantity</th>
                <th>Actual Weight</th>
                <th>Volumetric (LxBxH)</th>
                <th>Product Category</th>
                <th>HAZMAT Class</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.invoiceNumber}</td>
                  <td>{order.loadType}</td>
                  <td>{order.quantity}</td>
                  <td>{order.weight} kg</td>
                  <td>{`${order.volumetric.length}x${order.volumetric.breadth}x${order.volumetric.height}`}</td>
                  <td>{order.productCategory}</td>
                  <td>{order.hazmat}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="right-panel">
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-section">
            <p><strong>Pickup Address</strong>: Burger St, Fort Nagar, Kochi, Kerala</p>
            <p><strong>Pickup Contact</strong>: Jack Goe | +91 9876543210</p>
            <p><strong>Pickup Time</strong>: 24/07/2024 | 16:00 - 20:00</p>
            <p><strong>Delivery Address</strong>: Jew Town Rd, Ernakulam, Kerala</p>
            <p><strong>Delivery Contact</strong>: Napier | +91 9876543210</p>
            <p><strong>Product Category</strong>: {selectedCategory}</p>
            <p><strong>Load Category</strong>: {loadType}</p>
          </div>

          <div className="payment-summary">
            <h3>Payment Summary</h3>
            <p>Total Weight: {weight} kg</p>
            <p>SUB TOTAL: ₹{(weight * 10).toFixed(2)}</p> {/* Example calculation */}
          </div>

          <button className="pay-btn">Proceed to Pay</button>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
