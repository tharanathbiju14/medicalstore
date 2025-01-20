import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Store,
  Users,
  Truck,
  Activity,
  Package,
  ShoppingCart,
} from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";
import "./landingpage.css";

export default function Landingpage() {
  const [stores, setStores] = useState([]);
  const [users, setUsers] = useState([]);
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("stores");
  const [actionLoading, setActionLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storesRes, usersRes, deliveryRes] = await Promise.all([
          axios.get("http://192.168.1.30:8080/api/auth/admin/allStores"),
          axios.get("http://192.168.1.30:8080/api/auth/admin/users"),
          axios.get("http://192.168.1.30:8080/api/auth/admin/delivery-persons"),
        ]);

        console.log("Fetched stores:", storesRes.data); 
        console.log("Fetched users:", usersRes.data); 
        console.log("Fetched delivery persons:", deliveryRes.data);   

        setStores(storesRes.data);
        setUsers(usersRes.data);
        setDeliveryPersons(deliveryRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statsCards = [
    {
      title: "Total Stores",
      value: stores.length,
      icon: Store,
      description: "Active medical stores",
    },
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      description: "Registered customers",
    },
    {
      title: "Delivery Partners",
      value: deliveryPersons.length,
      icon: Truck,
      description: "Active delivery personnel",
    },
  ];

  const handleButtonLoading = (storeId, isLoading) => {
    setButtonLoading((prev) => ({ ...prev, [storeId]: isLoading }));
  };

  const handleVerifyStore = async (storeId) => {
    if (!storeId) {
      console.error("Store ID is undefined or invalid");
      return;
    }
    handleButtonLoading(storeId, true);
    setActionLoading(true);
    try {
      await axios.put(
        `http://192.168.1.30:8080/api/auth/admin/verifyStore/${storeId}`,
        {
          verificationStatus: "VERIFIED",
        }
      );

      setStores((prevStores) =>
        prevStores.map((store) =>
          store.id === storeId
            ? { ...store, verificationStatus: "VERIFIED" }
            : store
        )
      );
      console.log(`Store ${storeId} verified successfully`);
    } catch (error) {
      console.error(`Error verifying store ${storeId}:`, error);
    } finally {
      handleButtonLoading(storeId, false);
      setActionLoading(false);
    }
  };

  const handleRevokeVerification = async (storeId) => {
    if (!storeId) {
      console.error("Store ID is undefined or invalid");
      return;
    }
    handleButtonLoading(storeId, true);
    setActionLoading(true);
    try {
      await axios.put(
        `http://192.168.1.30:8080/api/auth/admin/verifyStore/${storeId}`,
        {
          verificationStatus: "NOT_VERIFIED",
        }
      );

      setStores((prevStores) =>
        prevStores.map((store) =>
          store.id ===storeId
            ? { ...store, verificationStatus: "NOT_VERIFIED" }
            : store
        )
      );
      console.log(`Store ${storeId} verification revoked successfully`);
    } catch (error) {
      console.error(`Error revoking verification for store ${storeId}:`, error);
    } finally {
      handleButtonLoading(storeId, false);
      setActionLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-brand">
            <Package size={32} />
            <span>e-Pharma</span>
          </div>
          <div className="nav-icons">
            <ShoppingCart size={24} />
          </div>
        </div>
      </nav>

      <main className="main-content">
        <h1 className="dashboard-title">Dashboard Overview</h1>

        {loading ? (
          <div className="loader-container">
            <CircularProgress sx={{ color: "#000000" }} />
          </div>
        ) : (
          <>
            <div className="stats-grid">
              {statsCards.map((card) => (
                <div key={card.title} className="stat-card">
                  <div className="stat-header">
                    <span className="stat-title">{card.title}</span>
                    <card.icon size={16} /> {/* Corrected usage */}
                  </div>
                  <div className="stat-value">{card.value}</div>
                  <p className="stat-description">{card.description}</p>
                </div>
              ))}
            </div>

            <div className="tabs">
              <div className="tabs-list">
                <button
                  className={`tab-trigger ${
                    activeTab === "stores" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("stores")}
                >
                  Stores
                </button>
                <button
                  className={`tab-trigger ${
                    activeTab === "users" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("users")}
                >
                  Users
                </button>
                <button
                  className={`tab-trigger ${
                    activeTab === "delivery" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("delivery")}
                >
                  Delivery Partners
                </button>
              </div>

              {activeTab === "stores" && (
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Store Name</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th>license No</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stores.map((store) => (
                        <tr key={store.id}>
                          <td>{store.storeName}</td>
                          <td>{store.contactNo}</td>
                          <td>{store.storeAddress}</td>
                          <td>{store.licenseNo}</td>
                          <td>
                            <span
                              className={`status-badge ${
                                store.verificationStatus === "VERIFIED"
                                  ? "active"
                                  : "inactive"
                              }`}
                            >
                              {store.verificationStatus || "NOT_VERIFIED"}
                            </span>
                          </td>
                          <td>
                          <button
                            className={`verify-button ${
                              store.verificationStatus === "VERIFIED"
                                ? "revoke"
                                : "" 
                            }`}
                            onClick={() =>
                              store.verificationStatus === "VERIFIED"
                                ? handleRevokeVerification(store.storeId)
                                : handleVerifyStore(store.storeId)
                            }
                            disabled={buttonLoading[store.storeId]} // Disable button during loading
                          >
                            {buttonLoading[store.storeId] ? (
                              <CircularProgress size={16} sx={{ color: "#fff" }} />
                            ) : store.verificationStatus === "VERIFIED" ? (
                              "Revoke Verification"
                            ) : (
                              "Verify"
                            )}
                          </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "users" && (
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.address}</td>
                          <td>{user.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "delivery" && (
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deliveryPersons.map((person) => (
                        <tr key={person.id}>
                          <td>{person.name}</td>
                          <td>{person.contactNo}</td>
                          <td>{person.email}</td>
                          <td>{person.verificationStatus}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}