import "./ModalWithForm.css";

const ModalWithForm = ({ children, buttonText, title, onClose, name }) => {
  console.log("ModalWithForm");
  return (
    <div className={`modal modal__type_${name}`}>
      <div className="modal__content">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <h3 className="modal__title"> {title}</h3>
        <form className="modal__form">
          {children}
          <button className="modal__submit-button" type="submit">
            {buttonText}
          </button>{" "}
        </form>
      </div>
    </div>
  );
};
export default ModalWithForm;
