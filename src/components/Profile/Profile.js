import React from "react";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems, onCreateModal, onSelectCard }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        onCreateModal={onCreateModal}
        onSelectCard={onSelectCard}
      />
    </div>
  );
}

export default Profile;
