import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose }) => {
  console.log("item modal");
  return (
    <div className={`modal`}>
      <div className="modal__content modal__content-image">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="modal__image"
          src={selectedCard.link}
          alt="Clothing item"
        />
        <div className="modal__info">
          <div>{selectedCard.name}</div>
          <div>Weather type: {selectedCard.weather}</div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
