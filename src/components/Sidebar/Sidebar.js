import React from "react";
import avatarLogo from "../../images/Avatar.svg";
import "./Sidebar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <img
        src={avatarLogo}
        alt="sidebar__avatar"
        className="sidebar__avatar-image"
      />
      <p className="sidebar__avatar-name">Catelyn Richard</p>
    </div>
  );
}
export default SideBar;
