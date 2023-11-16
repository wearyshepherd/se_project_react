import { useEscape } from "../../hooks/useEscape";
import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose, openModal, buttonText }) => {

  useEscape(onClose)

  return (
    <div className="modal modal-preview">
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}></button>
        <img
          className="modal__image"
          src={selectedCard.imageUrl}
          alt={`picture of a ${selectedCard.name}`}
        />
        <div className="modal__description-wrap">
          <div className="modal__description">
            <div>{selectedCard.name}</div>
            <div>Weather: {selectedCard.weather}</div>
          </div>
          <div className="modal__button-wrap">
            <button onClick={openModal} type='button' className="modal__delete-button">{buttonText}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
