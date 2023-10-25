import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from '../Profile/Profile';
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { useEffect, useState } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import {
  getForecastWeather,
  parseCityData,
  parseWeatherData,
} from "../../utils/weatherApi.js";
import "./App.css";
import "../ModalWithForm/ModalWithForm.css";
import { Route, Switch } from "react-router-dom";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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

  // useEffect(() => {
  //   navigator('/')
  // }, [])

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

  return (
    <div className="App">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header onCreateModal={handleCreateModal} weatherCity={city} />
        <Switch>
          <Route exact path='/'>
            <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
          </Route>
          <Route path='/profile'>
            <Profile />  
          </Route>
        </Switch>
        <Footer />
        {activeModal === "create" && (
          <ModalWithForm
            title="New Garmnet"
            buttonText="Add garment"
            onClose={handleCloseModal}
          >
            <label className="modal__label">Name</label>

            <input
              className="modal__input modal__input_type_text"
              type="text"
              name="name"
              minLength="1"
              maxLength="30"
              placeholder="Name"
              id="name"
            />
            <label className="modal__label">Image</label>
            <input
              className="modal__input modal__input_type_text"
              type="url"
              name="link"
              minLength="1"
              id="link"
              placeholder="Image URL"
            />
            <label className="modal__label">Select the weather type:</label>
            <div>
              <div className="modal__radio-container">
                <input
                  className="modal__input_radio"
                  type="radio"
                  name="weatherType"
                  id="Hot"
                  value="hot"
                />
                <label className="modal__label_radio" htmlFor="Hot">
                  Hot
                </label>
              </div>
              <div className="modal__radio-container">
                <input
                  className="modal__input_radio"
                  type="radio"
                  name="weatherType"
                  id="Warm"
                  value="warm"
                />
                <label className="modal__label_radio" htmlFor="Warm">
                  Warm
                </label>
              </div>
              <div className="modal__radio-container">
                <input
                  className=" modal__input_radio"
                  type="radio"
                  name="weatherType"
                  id="Cold"
                  value="cold"
                />
                <label className=" modal__label_radio" htmlFor="Cold">
                  Cold
                </label>
              </div>
            </div>
          </ModalWithForm>
        )}
        {activeModal === "preview" && (
          <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
