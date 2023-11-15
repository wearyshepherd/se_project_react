import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <li className="itemCard">
      <h3 className="itemCard__name">{item.name}</h3>
      <img
        src={item.imageUrl}
        className="itemCard__image"
        onClick={() => onSelectCard(item)}
        alt={item.name}
      />
    </li>
  );
};

export default ItemCard;
