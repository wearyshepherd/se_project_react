import avatarImage from './avatar.svg';  // Update the path accordingly
import { Link } from "react-router-dom";
import './Sidebar.css';

const Sidebar = () => {
    return (
        <>
            <div className="sidebar__avatar-image">
                <img src={avatarImage} alt="profile picture" />
            </div>
            <div className='sidebar__profile-info'>
                Terrence Tegegne
            </div>
        </>
    )
}

export default Sidebar;
