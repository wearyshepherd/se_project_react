import "./Header.css";

import logoImage from "../../images/logo.svg";
import avatarImage from "../../images/avatar.svg";

const Header = ({ onCreateModal }) => {
  console.log("Header");

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={logoImage} alt="Logo" />
        </div>
        <div className="header__date">{currentDate}</div>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button
            className="header__add-button"
            type="text"
            onClick={onCreateModal}
          >
            + Add New Clothes
          </button>
        </div>
        <div className="header__name">Name</div>
        <div>
          <img src={avatarImage} alt="Avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
