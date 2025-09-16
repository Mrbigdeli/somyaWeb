import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="menuParent">
      <div id="MenuInfo">
        <div id="MenuInfo-Left"></div>
        <div id="MenuInfo-Right">
          <div id="MenuInfo-Right-MyAccount">
            <Link to="/" className="">
              My Accounts
            </Link>
          </div>
          <div id="MenuInfo-Right-Socials">
            <div className="socials-group-class" id="telegram-social"></div>
            <div className="socials-group-class" id="whatsapp-social"></div>
            <div className="socials-group-class" id="instagram-social"></div>
            <div className="socials-group-class" id="linkedin-social"></div>
          </div>
        </div>
      </div>
      <div id="MainMenu"></div>
      <div id="DiscountMenu"></div>
    </div>
  );
};

export default Header;
