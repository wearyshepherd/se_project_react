import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import './AddItemModal.css';

const AddItemModal = ({ handleCloseModal, isOpen, onAddItem }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const hanldeSetName = (e) => {
    setName(e.target.value);
  };

  const handleSetImageUrl = (e) => {
    setImageUrl(e.target.value);
  };

  const handlesetWeather = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
    handleCloseModal()
  };

  return (
    <ModalWithForm
      title="New Garmnet"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
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
        onChange={hanldeSetName}
      />
      <label className="modal__label">Image</label>
      <input
        className="modal__input modal__input_type_text"
        type="url"
        name="link"
        minLength="1"
        id="link"
        placeholder="Image URL"
        onChange={handleSetImageUrl}
      />
      <label className="modal__label">Select the weather type:</label>
      <div>
        <div className="modal__radio-container">
          <input
            className="modal__input_radio"
            type="radio"
            name="weather"
            id="Hot"
            value="hot"
            onChange={handlesetWeather}
          />
          <label className="modal__label_radio" htmlFor="Hot">
            Hot
          </label>
        </div>
        <div className="modal__radio-container">
          <input
            className="modal__input_radio"
            type="radio"
            name="weather"
            id="Warm"
            value="warm"
            onChange={handlesetWeather}
          />
          <label className="modal__label_radio" htmlFor="Warm">
            Warm
          </label>
        </div>
        <div className="modal__radio-container">
          <input
            className=" modal__input_radio"
            type="radio"
            name="weather"
            id="Cold"
            value="cold"
            onChange={handlesetWeather}
          />
          <label className=" modal__label_radio" htmlFor="Cold">
            Cold
          </label>
        </div>
      </div>
      <div className="modal__button-container">
        <button className="modal__submit-button" type="submit">
          Add garment
        </button>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
