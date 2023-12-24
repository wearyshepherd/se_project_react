import "./Header.css";
import avatarLogo from "../../images/avatar.svg";
import wtwrLogo from "../../images/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

const currentDate = new Date().toLocaleDateString("default", {
  month: "long",
  day: "numeric",
});

const Header = ({ onCreateModal }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={wtwrLogo} alt="logo" className="header__logo-image" />
          </Link>
        </div>
        <div>{currentDate}</div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
        <div>
          <button
            type="text"
            onClick={onCreateModal}
            className="header__add-clothes-button">
            + Add clothes
          </button>
        </div>
        <Link to="/profile" className="header__profile-link">Carlos Chavez</Link>
        <div>
          <img className="header__avatar-image" src={avatarLogo} alt="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Header;
