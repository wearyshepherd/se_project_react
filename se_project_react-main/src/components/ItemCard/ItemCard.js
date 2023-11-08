import "./ItemCard.css";

const ItemCard = ({ key, item, onSelectCard }) => {
  return (
    <li key={key} className="itemCard">
      <h3 className="itemCard__name">{item.name}</h3>
      <img
        src={item.imageUrl}
        className="itemCard__image"
        onClick={() => onSelectCard(item)}
      />
    </li>
  );
};

export default ItemCard;
