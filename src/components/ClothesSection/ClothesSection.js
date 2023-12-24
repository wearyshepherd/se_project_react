import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";


const ClothesSection = ({ onSelectCard, clothingItems, onCreateModal }) => {
  return (
    <div className="clothingsection">
      <div className="clothingsection__title">
        <p>Your items</p>
        <button
          className="clothingsection__button"
          onClick={onCreateModal}
          type="text">
          + Add new
        </button>
      </div>
      <div className="clothingsection__cards">
        {clothingItems.map((item) => (
          <ItemCard item={item} key={item?._id ?? item?.id} onSelectCard={onSelectCard} />
        ))}
      </div>
    </div>
  );
};

export default ClothesSection;

