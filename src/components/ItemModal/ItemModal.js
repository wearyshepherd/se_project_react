import React from "react";
import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose, openModal }) => {
  return (
    <div className="modal__preview">
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}></button>
        <img
          className="modal__image"
          src={selectedCard.imageUrl}
          alt={`picture of a ${selectedCard.name}`}
        />
        <div className="modal__description-wrap">
          <div className="modal__description">
            {/* Connect the label to the input using htmlFor */}
            <label htmlFor="itemName" className="modal__label">
              Name
            </label>
            <div>{selectedCard.name}</div>

            {/* Connect the label to the input using htmlFor */}
            <label htmlFor="itemImage" className="modal__label">
              Image
            </label>
            <div>Weather: {selectedCard.weather}</div>
          </div>
          <div className="modal__button-wrap">
            <button
              onClick={openModal}
              type="button"
              className="modal__delete-button"
            >
              Delete Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
