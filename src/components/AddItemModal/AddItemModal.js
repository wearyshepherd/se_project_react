import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ handleCloseModal, isOpen, onAddItem }) => {
  const { values, handleChange } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
  };

  return (
    <ModalWithForm
      title="New Garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="name">
        Name
      </label>
      <input
        className="modal__input modal__input_type_text"
        type="text"
        name="name"
        id="name"
        value={values.name || ""}
        minLength="1"
        maxLength="30"
        placeholder="Name"
        onChange={handleChange}
      />

      <label className="modal__label" htmlFor="link">
        Image
      </label>
      <input
        className="modal__input modal__input_type_text"
        type="url"
        name="imageUrl"
        id="link"
        value={values.imageUrl || ""}
        minLength="1"
        placeholder="Image URL"
        onChange={handleChange}
      />

      <p className="modal__label">Select the weather type:</p>
      <div>
        <div className="modal__radio-container">
          <input
            className="modal__input_radio"
            type="radio"
            name="weather"
            id="Hot"
            value="hot"
            onChange={handleChange}
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
            onChange={handleChange}
          />
          <label className="modal__label_radio" htmlFor="Warm">
            Warm
          </label>
        </div>

        <div className="modal__radio-container">
          <input
            className="modal__input_radio"
            type="radio"
            name="weather"
            id="Cold"
            value="cold"
            onChange={handleChange}
          />
          <label className="modal__label_radio" htmlFor="Cold">
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
