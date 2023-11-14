import ItemCard from "../ItemCard/ItemCard";
import "./ClothingSection.css";

const ClothingSection = ({ onSelectCard, handleOpenModal, clothingItems }) => {
  return (
    <>
      <div className="clothingsection__content">
        <p className="clothingsection__header"> Your items</p>
        <button
          className="clothingsection__add-clothes-button"
          type="button"
          onClick={handleOpenModal}
        >
          + Add new
        </button>
      </div>
      <div className="clothingsection__card-wrapper">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onSelectCard={onSelectCard} />
          );
        })}
      </div>
    </>
  );
};

export default ClothingSection;
