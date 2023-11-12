import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothingSection/ClothingSection";
import "./Profile.css";

const Profile = ({ onSelectCard, handleOpenModal, clothingItems }) => {
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <Sidebar />
      </div>
      <section className="profile__clothessection">
        <ClothesSection
          onSelectCard={onSelectCard}
          clothingItems={clothingItems}
          handleOpenModal={handleOpenModal}
        />
      </section>
    </div>
  );
};

export default Profile;
