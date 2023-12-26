import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "../blocks/SideBar.css";

function SideBar({ onEditProfileModal, onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const currentAvatar = currentUser.avatar !== "" ? true : false;

  const handleLogoutClick = () => {
    onLogout();
  };

  const handleEditProfileClick = () => {
    onEditProfileModal(currentUser);
  };

  return (
    <div className="sidebar">
      <div className="sidebar__profile-info">
        {currentAvatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser?.avatar}
            alt="Avatar icon"
          ></img>
        ) : (
          <p className="sidebar__avatar-default">
            {currentUser?.name[0].toUpperCase()}
          </p>
        )}
        <p className="sidebar__name">{currentUser?.name}</p>
      </div>
      <div className="sidebar__profile-manager">
        <button
          className="sidebar__edit-button"
          type="button"
          onClick={handleEditProfileClick}
        >
          Change profile data
        </button>
        <button
          className="sidebar__logout-button"
          type="button"
          onClick={handleLogoutClick}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
