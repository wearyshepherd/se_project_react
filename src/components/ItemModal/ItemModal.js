import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className="modal__preview">
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}></button>
        <img
          className="modal__image"
          src={selectedCard.link}
          alt={`picture of a ${selectedCard.name}`}
        />
        <div className="modal__description-wrap">
          <div className="modal__description">{selectedCard.name}</div>
          <div className="modal__description">Weather: {selectedCard.weather}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
