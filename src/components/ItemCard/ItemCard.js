import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className="clothing_card">
      <h3 className="clothing_card__card_name"> {item.name}</h3>
      <img
        src={item.imageUrl}
        className="clothing_card__card_image"
        alt={item.name}
        onClick={() => onSelectCard(item)}
      />
    </div>
  );
};

export default ItemCard;
