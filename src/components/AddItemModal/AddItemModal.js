import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, handleAddItemSubmit, isOpen }) => {
  const [name, setName] = useState("");
  const [imageUrl, setUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItemSubmit({ name, imageUrl, weather });
  };

  const handleResetInputs = () => {
    setName("");
    setUrl("");
    setWeather("");
  };

  React.useEffect(handleResetInputs, [isOpen]);

  return (
    <ModalWithForm
      title={"New Garment"}
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}>
      <div className="modal__input_wrapper">
        <label className="modal__label_input">
          Name{" "}
          <input
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            placeholder="Name"
            className="modal__input"
            value={name}
            onChange={handleNameChange}
          />
        </label>
      </div>
      <div className="modal__input_wrapper">
        <label className="modal__label_input">
          Image{" "}
          <input
            type="url"
            name="link"
            minLength="1"
            maxLength="999"
            placeholder="Image URL"
            className="modal__input"
            value={imageUrl}
            onChange={handleUrlChange}
          />
        </label>
      </div>
      <p>Select weather type:</p>
      <div className="modal__radio_buttons">
        <div className="modal__radio_option">
          <input
            type="radio"
            id="hot"
            value="hot"
            name="temp_range"
            className="modal__radio_button"
            onChange={handleWeatherChange}
          />

          <label className="modal__label_radio">Hot</label>
        </div>
        <div className="modal__radio_option">
          <input
            type="radio"
            id="warm"
            value="warm"
            name="temp_range"
            className="modal__radio_button"
            onChange={handleWeatherChange}
          />
          <label className="modal__label_radio">Warm</label>
        </div>
        <div className="modal__radio_option">
          <input
            type="radio"
            id="cold"
            value="cold"
            name="temp_range"
            className="modal__radio_button"
            onChange={handleWeatherChange}
          />
          <label className="modal__label_radio">Cold</label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
