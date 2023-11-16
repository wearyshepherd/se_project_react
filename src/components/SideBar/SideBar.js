import avatarImage from "../../images/avatar.svg";
import "./SideBar.css";

const SideBar = () => {
  return (
    <>
      <div className="sidebar__avatar-image">
        <img src={avatarImage} alt="profile picture" />
      </div>
      <div className="sidebar__profile-info">Terrence Tegegne</div>
    </>
  );
};

export default SideBar;
