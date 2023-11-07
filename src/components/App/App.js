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
import { defaultClothingItems } from "../../utils/constants";
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
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleOnAddItemSubmit = ({name, imageUrl, weatherType}) => {
    const newItem = {
      name,
      imageUrl,
      weatherType,
    }
    
    postCard(newItem)
      .then(() => {
        getCards()
      }).then((data) => {
        setClothingItems(data);
      })
  };

  const openConfirmationModal = () => {
    setActiveModal("delete");
  };

  const handleCardDelete = () => {
    deleteCard(selectedCard._id)
      .then(() => {
        getCards();
      })
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        setTemp(parseWeatherData(data));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        setCity(parseCityData(data));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getCards()
      .then((cards) => {
        setClothingItems(cards);
      })
      .catch((err) => {
        console.error(err);
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
