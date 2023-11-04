import React from "react";
import "./ModalWithForm.css";

const ModalWithForm = ({ children, buttonText, title, onClose, modalName }) => {
  return (
    <div className={`modal modal_type_${modalName}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}></button>
        <h3 className="modal__title">{title}</h3>
        <form className="form">
          <fieldset className="modal__fieldset">
            {/* Replace these comments with actual form fields */}
            {/* Example text input */}
            <div className="modal__form-group">
              <label className="modal__label">Name</label>
              <input
                type="text"
                className="modal__input"
                placeholder="Enter your name"
                // Add necessary state and event handlers here
              />
            </div>

            {/* Example select input */}
            <div className="modal__form-group">
              <label className="modal__label">Category</label>
              <select className="modal__input">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </div>

            {/* Example textarea */}
            <div className="modal__form-group">
              <label className="modal__label">Description</label>
              <textarea
                className="modal__input"
                placeholder="Enter your description"
                // Add necessary state and event handlers here
              />
            </div>

            {/* Add more form fields as needed */}

            <div className="modal__button-container">
              <button className="modal__submit-button" type="submit">
                {buttonText}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;


