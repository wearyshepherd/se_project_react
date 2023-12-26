import React, { useContext } from "react";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "../blocks/Profile.css";
import { CurrentUserContext } from "./path-to-your-context-file";

function Profile({
  onSelectedCard,
  handleCreateModal,
  clothingItems,
  onEditProfileModal,
  isLoggedIn,
  onLogout,
  handleLikeClick
}) {
  
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="profile">
      <SideBar
        onEditProfileModal={onEditProfileModal}
        onLogout={onLogout}
        currentUser={currentUser}
      />
      <ClothesSection
        onSelectedCard={onSelectedCard}
        handleCreateModal={handleCreateModal}
        clothingItems={clothingItems}
        isLoggedIn={isLoggedIn}
        handleLikeClick={handleLikeClick}
      />
    </div>
  );
}

export default Profile;

