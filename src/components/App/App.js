import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ModalWithConfirmation from "../ModalWithConfirmation/ModalWithConfirmation";
import { useEffect, useState } from "react";
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
  const [temp, setTemp] = useState(0);
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
      .then(() => getCards()) // Fetch updated cards after adding a new one
      .then((cards) => {
        setClothingItems(cards);
      })
      .catch((err) => {
        console.error("Error adding card:", err);
      });
  };

  const handleCardDelete = () => {
    deleteCard(selectedCard._id)
      .then(() => getCards()) // Fetch updated cards after deleting one
      .then((cards) => {
        setClothingItems(cards);
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      });
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        setTemp(parseWeatherData(data));
        setCity(parseCityData(data));
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
      });

    getCards()
      .then((cards) => {
        setClothingItems(cards);
      })
      .catch((err) => {
        console.error("Error fetching clothing items:", err);
      });
  }, []);

  return (
    <div className="App">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header onCreateModal={handleCreateModal} weatherCity={city} />
        <Switch>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
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
            openModal={handleCardDelete} // Pass the delete function here
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

