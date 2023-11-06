import React from "react";
import "./ModalWithForm.css"; // Import your ModalWithForm styles
import "./YourModalStyles.css"; // Import the provided modal styles

const ModalWithForm = ({ children, buttonText, title, onClose, modalName }) => {
  return (
    <div className={`modal modal_type_${modalName}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}></button>
        <h3 className="modal__title">{title}</h3>
        <form className="form">
          <fieldset className="modal__fieldset">{children}</fieldset>
          <div className="modal__button-container">
            <button className="modal__submit-button" type="submit">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
