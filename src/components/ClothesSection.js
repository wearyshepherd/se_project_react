import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ItemCard from "./ItemCard";
import "../blocks/ClothesSection.css";

function ClothesSection({
  onSelectedCard,
  handleCreateModal,
  isLoggedIn,
  handleLikeClick,
  clothingItems,
}) {
  const currentUser = useContext(CurrentUserContext);

  // Add a check to ensure clothingItems is an array before using filter
  const currentItems = Array.isArray(clothingItems)
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : [];

  return (
    <div className="clothes">
      <div className="clothes__header">
        <div className="clothes__title">Your items</div>
        <button
          className="clothes__button"
          type="submit"
          onClick={handleCreateModal}
        >
          + Add new
        </button>
      </div>
      <div className="clothes__items">
        {currentItems.map((item) => (
          <ItemCard
            key={item?._id ?? item?.id}
            item={item}
            onSelectedCard={onSelectedCard}
            isLoggedIn={isLoggedIn}
            handleLikeClick={handleLikeClick}
          />
        ))}
      </div>
    </div>
  );
}

export default ClothesSection;

