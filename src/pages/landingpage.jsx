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
import StoreDetailsModal from "../components/StoreDetailsModal";

const BASE_URL = "http://192.168.1.48:8080/api/auth/admin";

export default function Landingpage() {
  const [stores, setStores] = useState([]);
  const [users, setUsers] = useState([]);
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("stores");
  const [actionLoading, setActionLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState({});
  const [selectedStore, setSelectedStore] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storesRes, usersRes, deliveryRes] = await Promise.all([
          axios.get(`${BASE_URL}/allStores`),
          axios.get(`${BASE_URL}/users`),
          axios.get(`${BASE_URL}/delivery-persons`),
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
      await axios.put(`${BASE_URL}/verifyStore/${storeId}`, {
        verificationStatus: "VERIFIED",
      });

      setStores((prevStores) =>
        prevStores.map((store) =>
          store.id === storeId
            ? { ...store, verificationStatus: "VERIFIED" }
            : store
        )
      );
      console.log(`Store ${storeId} verified successfully`);
      window.location.reload();
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
      await axios.put(`${BASE_URL}/revokeVerifyStore/${storeId}`, {
        verificationStatus: "NOT_VERIFIED",
      });

      setStores((prevStores) =>
        prevStores.map((store) =>
          store.id === storeId
            ? { ...store, verificationStatus: "NOT_VERIFIED" }
            : store
        )
      );
      console.log(`Store ${storeId} verification revoked successfully`);
      window.location.reload();
    } catch (error) {
      console.error(`Error revoking verification for store ${storeId}:`, error);
    } finally {
      handleButtonLoading(storeId, false);
      setActionLoading(false);
    }
  };

  const handleVerifyperson = async (deliveryPersonId) => {
    if (!deliveryPersonId) {
      console.error("Delivery Person ID is undefined or invalid");
      return;
    }
    handleButtonLoading(deliveryPersonId, true);
    setActionLoading(true);
    try {
      await axios.put(`${BASE_URL}/verifyDeliveryPerson/${deliveryPersonId}`, {
        verificationStatus: "VERIFIED",
      });

      setDeliveryPersons((prevDeliveryPersons) =>
        prevDeliveryPersons.map((person) =>
          person.deliveryPersonId === deliveryPersonId
            ? { ...person, verificationStatus: "VERIFIED" }
            : person
        )
      );
      console.log(`Delivery Person ${deliveryPersonId} verified successfully`);
    } catch (error) {
      console.error(
        `Error verifying delivery person ${deliveryPersonId}:`,
        error
      );
    } finally {
      handleButtonLoading(deliveryPersonId, false);
      setActionLoading(false);
      // window.location.reload();
    }
  };

  const handleRevokepersonVerification = async (deliveryPersonId) => {
    if (!deliveryPersonId) {
      console.error("Delivery Person ID is undefined or invalid");
      return;
    }
    handleButtonLoading(deliveryPersonId, true);
    setActionLoading(true);
    try {
      await axios.put(`${BASE_URL}/revokeDeliveryPerson/${deliveryPersonId}`, {
        verificationStatus: "NOT_VERIFIED",
      });

      setDeliveryPersons((prevDeliveryPersons) =>
        prevDeliveryPersons.map((person) =>
          person.deliveryPersonId === deliveryPersonId
            ? { ...person, verificationStatus: "NOT_VERIFIED" }
            : person
        )
      );
      console.log(
        `Delivery Person ${deliveryPersonId} verification revoked successfully`
      );
    } catch (error) {
      console.error(
        `Error revoking verification for delivery person ${deliveryPersonId}:`,
        error
      );
    } finally {
      handleButtonLoading(deliveryPersonId, false);
      setActionLoading(false);
      // window.location.reload();
    }
  };

  const handleDeleteStore = async (storeId) => {
    if (!storeId) {
      console.error("Store ID is undefined or invalid");
      return;
    }
    handleButtonLoading(storeId, true);
    setActionLoading(true);
    try {
      await axios.delete(`${BASE_URL}/removeStore/${storeId}`);

      setStores((prevStores) =>
        prevStores.filter((store) => store.id !== storeId)
      );
      console.log(`Store ${storeId} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting store ${storeId}:`, error);
    } finally {
      handleButtonLoading(storeId, false);
      setActionLoading(false);
      window.location.reload();
    }
  };
  const handleDeleteperson = async (deliveryPersonId) => {
    if (!deliveryPersonId) {
      console.error("Delivery Person ID is undefined or invalid");
      return;
    }
    handleButtonLoading(deliveryPersonId, true);
    setActionLoading(true);
    try {
      await axios.delete(`${BASE_URL}/removeDeliveryPerson/${deliveryPersonId}`);
  
      setDeliveryPersons((prevDeliveryPersons) =>
        prevDeliveryPersons.filter((delivery) => delivery.id !== deliveryPersonId)
      );
      console.log(`Delivery Person ${deliveryPersonId} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting delivery person ${deliveryPersonId}:`, error);
    } finally {
      handleButtonLoading(deliveryPersonId, false);
      setActionLoading(false);
      window.location.reload(); 
    }
  };

  const handleOpenModal = (store) => {
    setSelectedStore(store);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedStore(null);
    setModalOpen(false);
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
                        <th>Details</th>
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
                          <button
                              className="view-details-button"
                              onClick={() => handleOpenModal(store)}
                            >
                              View Details
                            </button>
                          </td>
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
                          <td className="btns">
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
                              disabled={buttonLoading[store.storeId]} 
                            >
                              {buttonLoading[store.storeId] ? (
                                <CircularProgress
                                  size={16}
                                  sx={{ color: "#fff" }}
                                />
                              ) : store.verificationStatus === "VERIFIED" ? (
                                "Revoke Verification"
                              ) : (
                                "Verify"
                              )}
                            </button>
                            <button
                              className="delete-button"
                              onClick={() => handleDeleteStore(store.storeId)}
                              disabled={buttonLoading[store.storeId]} 
                            >
                              {buttonLoading[store.storeId] ? (
                                <CircularProgress
                                  size={16}
                                  sx={{ color: "#fff" }}
                                />
                              ) : (
                                "Delete"
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
                        
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.address}</td>
                          
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
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deliveryPersons.map((person) => (
                        <tr key={person.id}>
                          <td>{person.name}</td>
                          <td>{person.contactNo}</td>
                          <td>{person.email}</td>

                          <td>
                            <span
                              className={`status-badge ${
                                person.verificationStatus === "VERIFIED"
                                  ? "active"
                                  : "inactive"
                              }`}
                            >
                              {person.verificationStatus || "NOT_VERIFIED"}
                            </span>
                          </td>
                          <td className="btns">
                            <button
                              className={`verify-button ${
                                person.verificationStatus === "VERIFIED"
                                  ? "revoke"
                                  : ""
                              }`}
                              onClick={() =>
                                person.verificationStatus === "VERIFIED"
                                  ? handleRevokepersonVerification(
                                      person.deliveryPersonId
                                    )
                                  : handleVerifyperson(person.deliveryPersonId)
                              }
                              disabled={buttonLoading[person.deliveryPersonId]} // Disable button during loading
                            >
                              {buttonLoading[person.deliveryPersonId] ? (
                                <CircularProgress
                                  size={16}
                                  sx={{ color: "#fff" }}
                                />
                              ) : person.verificationStatus === "VERIFIED" ? (
                                "Revoke Verification"
                              ) : (
                                "Verify"
                              )}
                            </button>
                            <button
                              className="delete-button"
                              onClick={() => handleDeleteperson(person.deliveryPersonId)}
                              disabled={buttonLoading[person.deliveryPersonId]} // Disable button during loading
                            >
                              {buttonLoading[person.deliveryPersonId] ? (
                                <CircularProgress
                                  size={16}
                                  sx={{ color: "#fff" }}
                                />
                              ) : (
                                "Delete"
                              )}
                            </button>
                          </td>
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
      <StoreDetailsModal
        open={modalOpen}
        handleClose={handleCloseModal}
        store={selectedStore}
      />
    </div>
  );
}
