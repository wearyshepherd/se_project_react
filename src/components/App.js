import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
// Remove or comment out these lines
import Profile from "./Profile";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import { defaultClothingItems } from "../utils/utils";
import { getForecastWeather, parseWeatherData, parseLocation } from "../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddItemModal from "./AddItemModal";
import * as api from "../utils/api";
import {
  loginUser,
  registerUser,
  getUserInfo,
  editProfile,
} from "../utils/auth";
import DeleteConfirmModal from "./DeleteConfirmModal";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import ProtectedRoute from "./ProtectedRoute";
import EditProfileModal from "./EditProfileModal";

import "../blocks/App.css";


function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  const handleEditProfileModal = () => {
    setActiveModal("editProfile");
  };

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleCloseConfirmModal = () => {
    setDeleteConfirm(false);
  };

  const onAddItem = (values) => {
    api
      .addItem(values)
      .then((data) => {
        setClothingItems([data.data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(clothingItems);
        console.error("Error from onAddItem:", err);
      });
  };

  const handleDelete = (selectedCard) => {
    console.log("Deleting item:", selectedCard);
    if (selectedCard && selectedCard._id) {
      api
        .deleteItem(selectedCard)
        .then(() => {
          const newClothingItems = clothingItems.filter((cards) => {
            return cards._id !== selectedCard._id;
          });
          setClothingItems(newClothingItems);
          handleCloseModal();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDeleteConfirm = (selectedCard) => {
    setDeleteConfirm(true);
    setSelectedCard(selectedCard);
    setActiveModal("delete");
  };

  const handleLogin = (email, password) => {
    loginUser({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          setCurrentUser(res.userData);
          handleCloseModal();
          return res;
        } else {
          console.log("handleLogin error");
        }
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setClothingItems(clothingItems);
  };

  const handleRegister = (email, password, name, avatar) => {
    registerUser({ email, password, name, avatar })
      .then((user) => {
        setCurrentUser(user);
        handleCloseModal();
        handleLogin(email, password);
      })
      .catch(console.error);
  };

  const handleEditProfile = (name, avatar, token) => {
    editProfile(name, avatar, token)
      .then((userData) => {
        setCurrentUser(userData.data);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleLikeClick = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (!isLiked) {
      api.addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((c) => (c._id === id ? updatedCard.data : c))
          );
        })
        .catch((error) => {
          console.error("Error from handleLikeClick:", error);
        });
    }
  };
  const handleUnlikeClick = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    if (isLiked) {
      api.removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((c) => (c._id === id ? updatedCard.data : c))
          );
        })
        .catch((error) => {
          console.error("Error from handleUnlikeClick:", error);
        });
    }
  };

  const handleUpdateCard = (id, updatedFields) => {
    const token = localStorage.getItem("jwt");
    api
      .updateItem(id, updatedFields, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((c) => (c._id === id ? updatedCard.data : c))
        );
        handleCloseModal();
      })
      .catch((error) => {
        console.error("Error from handleUpdateCard:", error);
      });
  };

  const handleForecastWeather = (location) => {
    getForecastWeather(location)
      .then((data) => {
        const parsedData = parseWeatherData(data);
        setTemp(parsedData.temp);
        setWeatherLocation(parsedData.location);
      })
      .catch((error) => {
        console.error("Error from handleForecastWeather:", error);
      });
  };

  useEffect(() => {
    handleForecastWeather("San Francisco");
    const token = localStorage.getItem("jwt");
    if (token) {
      getUserInfo(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Error fetching user info:", err);
        });
    }
  }, []);

  useEffect(() => {
    const storedUnit = localStorage.getItem("temperatureUnit");
    if (storedUnit) {
      setCurrentTemperatureUnit(storedUnit);
    }
  }, []);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("clothingItems"));
    if (storedItems) {
      setClothingItems(storedItems);
    } else {
      setClothingItems(defaultClothingItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clothingItems", JSON.stringify(clothingItems));
  }, [clothingItems]);

  useEffect(() => {
    localStorage.setItem("temperatureUnit", currentTemperatureUnit);
  }, [currentTemperatureUnit]);

  return (
    <div className="App">
      <Router>
        <CurrentTemperatureUnitContext.Provider
          value={{
            currentTemperatureUnit,
            setCurrentTemperatureUnit,
          }}
        >
          <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            <Header
              isLoggedIn={isLoggedIn}
              onLogin={handleLoginModal}
              onRegister={handleRegisterModal}
              onLogout={handleLogout}
              onEditProfile={handleEditProfileModal}
            />
            <Routes>
              <Route
                path="/"
                element={<Main clothingItems={clothingItems} />}
              />
              <Route
                path="/profile"
                element={<Profile clothingItems={clothingItems} />}
              />
              <Route path="/item/:id" element={<ItemModal />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
            {activeModal === "create" && (
              <AddItemModal
                onClose={handleCloseModal}
                onAddItem={onAddItem}
              />
            )}
            {activeModal === "login" && (
              <LoginModal onClose={handleCloseModal} onLogin={handleLogin} />
            )}
            {activeModal === "register" && (
              <RegisterModal
                onClose={handleCloseModal}
                onRegister={handleRegister}
              />
            )}
            {activeModal === "delete" && (
              <DeleteConfirmModal
                onClose={handleCloseConfirmModal}
                onDelete={() => handleDelete(selectedCard)}
              />
            )}
            {activeModal === "editProfile" && (
              <EditProfileModal
                onClose={handleCloseModal}
                onEditProfile={handleEditProfile}
                currentUser={currentUser}
              />
            )}
          </CurrentUserContext.Provider>
        </CurrentTemperatureUnitContext.Provider>
      </Router>
    </div>
  );
}

export default App;


