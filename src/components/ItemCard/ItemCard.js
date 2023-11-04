import React from "react";
import "./ItemCard.css";

const ItemCard = ({ key, item, onSelectCard }) => {
  return (
    <li className="itemCard">
      <h3 className="itemCard__name">{item.name}</h3>
      <img
        src={item.link}
        alt={item.name}  {/* Add the alt attribute with the item's name */}
        className="itemCard__image"
        onClick={() => onSelectCard(item)}
      />
    </li>
  );
};

export default ItemCard;

