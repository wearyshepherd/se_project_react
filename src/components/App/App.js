import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithConfirmation from "../ModalWithConfirmation/ModalWithConfirmation";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Route, Switch } from "react-router-dom";
import { getCards, postCard, deleteCard } from "../../utils/api";
import {
  getForecastWeather,
  parseCityData,
  parseWeatherData,
} from "../../utils/weatherApi.js";
import "./App.css";

const App = () => {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState({ f: 0, c: 0 }); // Initialize with an object
  const [city, setCity] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

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

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) =>
      prevUnit === "F" ? "C" : "F"
    );
  };

  const handleOnAddItemSubmit = ({ name, imageUrl, weather }) => {
    const newItem = {
      name,
      imageUrl,
      weather,
    };

    postCard(newItem)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const openConfirmationModal = () => {
    setActiveModal("delete");
  };

  const handleCardDelete = () => {
    deleteCard(selectedCard._id)
      .then(() => {
        const updatedClothing = clothingItems.filter((item) => {
          return item._id !== selectedCard._id;
        });
        setClothingItems(updatedClothing);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getForecastWeather("imperial") // Removed unnecessary conversion
      .then((data) => {
        const tempInFahrenheit = parseWeatherData(data);
        const tempInCelsius = Math.round((tempInFahrenheit - 32) * (5 / 9));

        setTemp({
          f: tempInFahrenheit,
          c: tempInCelsius,
        });

        setCity(parseCityData(data));
      })
      .catch((err) => {
        console.error(err);
      });

    getCards()
      .then((cards) => {
        setClothingItems(cards);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []); // <-- Empty dependency array

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <div className="App">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header onCreateModal={handleCreateModal} weatherCity={city} />
        <Switch>
          <Route exact path="/">
            <Main
              weatherTemp={currentTemperatureUnit === "F" ? temp.f : temp.c}
              onSelectCard={handleSelectedCard}
              clothingItems={clothingItems}
            />
          </Route>
          <Route path="/profile">
            <Profile
              onSelectCard={handleSelectedCard}
              handleOpenModal={handleCreateModal}
              clothingItems={clothingItems}
            />
          </Route>
        </Switch>
        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={handleOnAddItemSubmit}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            openModal={openConfirmationModal}
          />
        )}
        {activeModal === "delete" && (
          <ModalWithConfirmation
            isOpen={activeModal === "delete"}
            onClose={handleCloseModal}
            onSubmit={handleCardDelete}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
};

export default App;


