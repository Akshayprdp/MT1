import React, { useState } from "react";
import {  FaCubes, FaThLarge } from 'react-icons/fa';
import {
  FaBox,
  FaMobileAlt,
  FaBasketballBall,
  FaTshirt,
  FaHome,
  FaEllipsisH,
} from "react-icons/fa";
import "./OrderManagement.css";



const OrderManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCategory, setShowCategory] = useState(true);
  const [loadType, setLoadType] = useState("Carton box");
  const [showLoadType, setShowLoadType] = useState(true);
  const [quantity, ] = useState(6);
  const [volumetric, setVolumetric] = useState({
    length: 12,
    breadth: 12,
    height: 12,
  });
  const [weight, setWeight] = useState(100);
  const [invoiceNumber, setInvoiceNumber] = useState("ADH52VR");
  const [orders, setOrders] = useState([
    {
      loadType: "Carton box",
      quantity: 6,
      weight: 100,
      volumetric: { length: 12, breadth: 12, height: 12 },
      productCategory: "Electronics",
      hazmat: "No",
      invoiceNumber: "ADH52VR",
    },
  ]);

  const addOrder = () => {
    const newOrder = {
      loadType,
      quantity,
      weight,
      volumetric,
      productCategory: selectedCategory,
      hazmat: "No",
      invoiceNumber,
    };
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

  const loadTypes = [
    { name: "Carton box", icon: <FaBox /> },
    { name: "Wooden box", icon: <FaCubes /> }, 
    { name: "Plastic", icon: <FaTshirt /> }, 
    { name: "Other", icon: <FaThLarge /> },
  ];

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    setShowCategory(false);
  };

  const handleCategoryReset = () => {
    setShowCategory(true);
  };

  const handleLoadTypeChange = (loadName) => {
    setLoadType(loadName);
    setShowLoadType(false);
  };

  const handleLoadTypeReset = () => {
    setShowLoadType(true);
  };

  return (
    <div className="order-management">
      <div className="left-panel">
        <div className="order-header">
          <h4>Order Management</h4>
          <button className="new-order-btn" onClick={addOrder}>
            New Order +
          </button>
        </div>

        {showCategory ? (
          <div className="product-category">
            <h5>Select Product Category</h5>
            <div className="category-grid">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className={`category-box ${
                    selectedCategory === category.name ? "selected" : ""
                  }`}
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
            <label>
              <h5>Product Category</h5>
            </label>
            <div className="selected-category-display">
              <input
                type="text"
                value={selectedCategory}
                readOnly
                style={{
                  marginLeft: "-100px",
                  border: "none",
                  background: "transparent",
                }}
              />
              <button className="change-btn" onClick={handleCategoryReset}>
                Change
              </button>
            </div>
          </div>
        )}

        {showLoadType ? (
          <div className="load-category">
            <h5>Select Load Type</h5>
            <div className="category-grid">
              {loadTypes.map((load) => (
                <div
                  key={load.name}
                  className={`category-box ${
                    loadType === load.name ? "selected" : ""
                  }`}
                  onClick={() => handleLoadTypeChange(load.name)}
                >
                  <div className="icon">{load.icon}</div>
                  <span>{load.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="selected-load-type">
            <h5>Load Type</h5>
            <div className="load-box">
              <span>{loadType}</span>
              <span>{quantity} Quantity</span>
              <button className="change-btn" onClick={handleLoadTypeReset}>
                Change
              </button>
            </div>
          </div>
        )}
<br />
<div className="volumetric-section">       
  <label>Volumetric</label>
  <input
    type="number"
    value={volumetric.length}
    onChange={(e) =>
      setVolumetric({ ...volumetric, length: e.target.value })
    }
    placeholder="L"
    className="volumetric-input"
  />
  <input
    type="number"
    value={volumetric.breadth}
    onChange={(e) =>
      setVolumetric({ ...volumetric, breadth: e.target.value })
    }
    placeholder="B"
    className="volumetric-input"
  />
  <input
    type="number"
    value={volumetric.height}
    onChange={(e) =>
      setVolumetric({ ...volumetric, height: e.target.value })
    }
    placeholder="H"
    className="volumetric-input"
  />

  <div className="weight-section">
    <label>Actual Weight</label>
    <input
      type="number"
      value={weight}
      onChange={(e) => setWeight(e.target.value)}
      placeholder="Weight"
      className="weight-input"
      style={{width:'70px'}}
    />
    <span>kg</span>
  </div>

  <div className="invoice-section">
    <label>Invoice No</label>
    <input
      type="text"
      value={invoiceNumber}
      onChange={(e) => setInvoiceNumber(e.target.value)}
      className="invoice-input"
      style={{width:'100px'}}
    />
  </div>

  <button className="add-order-btn" onClick={addOrder}>
    Add Order +
  </button>
</div>
<br />


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
    <div className="summary-item">
      <h4>Pickup Address <span className="edit-option">(Edit)</span></h4>
      <p>Burger St, Fort Nagar, Kochi, Kerala</p>
    </div>

    <div className="summary-item">
      <h4>Pickup Contact Details</h4>
      <p><strong>Name</strong>: Jack Goe</p>
      <p><strong>Phone Number</strong>: +91 9876543210</p>
      <p><strong>Email</strong>: jack.goe@example.com</p>
    </div>

    <div className="summary-item">
      <h4>Pickup Time</h4>
      <p>24/07/2024 | 16:00 - 20:00</p>
    </div>

    <div className="summary-item">
      <h4>Delivery Address <span className="edit-option">(Edit)</span></h4>
      <p>Jew Town Rd, Ernakulam, Kerala</p>
    </div>

    <div className="summary-item">
      <h4>Delivery Contact Details</h4>
      <p><strong>Name</strong>: Napier</p>
      <p><strong>Phone Number</strong>: +91 9876543210</p>
      <p><strong>Email</strong>: napier@example.com</p>
    </div>

    <div className="summary-item">
      <h4>Product Category</h4>
      <p>{selectedCategory}</p>
    </div>

    <div className="summary-item">
      <h4>Load Type</h4>
      <p>{loadType}</p>
    </div>
    
    <div className="summary-item">
      <h4>Quantity</h4>
      <p>{quantity}</p>
    </div>

    <div className="summary-item">
      <h4>Weight</h4>
      <p>{weight} kg</p>
    </div>

    <div className="summary-item">
      <h4>Volumetric</h4>
      <p>{`${volumetric.length}x${volumetric.breadth}x${volumetric.height}`}</p>
    </div>

    <div className="summary-item">
      <h4>Invoice No</h4>
      <p>{invoiceNumber}</p>
    </div>

    <div className="summary-item">
      <h4>HAZMAT</h4>
      <p>No</p>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default OrderManagement;
