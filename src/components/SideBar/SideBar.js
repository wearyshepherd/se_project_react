import React from "react";
import "./SideBar.css";
import avatar from "../../images/avatar.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="avatar" className="sidebar__avatar-image" />
      <p className="sidebar__username">Carlos Chavez</p>
      </div>
  );
}

export default SideBar;
