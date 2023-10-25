import "./ModalWithForm.css";

const ModalWithForm = ({ children, buttonText, title, onClose, modalName }) => {
  return (
    <div className={`modal modal_type_${modalName}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}></button>
        <h3 className="modal__title">{title}</h3>
        <form className="form">
          <fieldset className="modal__fieldset">
            {children}
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
