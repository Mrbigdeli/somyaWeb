import { Link } from "react-router-dom";
import "./Header.css";
import { FiPhoneCall } from "react-icons/fi";
import { LuMapPin, LuSearch, LuMail } from "react-icons/lu";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Header = () => {
  return (
    <div className="menuParent">
      <div id="MenuInfo">
        <div id="MenuInfo-Left">
          <div className="MenuInfo-Left-Items">
            <FiPhoneCall
              id="MenuInfo-Left-phoneIcon"
              className="MenuInfo-Left-Icons"
            />
            <Link to="/" className="MenuInfo-Left-Items-link">
              Call: +001 321 3456
            </Link>
          </div>
          <div className="MenuInfo-Left-Items">
            <LuMail
              id="MenuInfo-Left-mailIcon"
              className="MenuInfo-Left-Icons"
            />
            <Link to="/" className="MenuInfo-Left-Items-link">
              Mail: support@norflo.com
            </Link>
          </div>
          <div className="MenuInfo-Left-Items">
            <LuMapPin
              id="MenuInfo-Left-mailIcon"
              className="MenuInfo-Left-Icons"
            />
            <Link to="/" className="MenuInfo-Left-Items-link">
              Visit: 1485 Bayshore Blvd. Ste 154, San Francisco, CA 95124
            </Link>
          </div>
        </div>
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
      <div id="MainMenu">
        <div id="MainMenu-Section-Left"></div>
        <div id="MainMenu-Section-Middle">
          <div className="MainMenu-Section-middle-Item cursor-Pinter">Home</div>
          <div className="MainMenu-Section-middle-Item cursor-Pinter">
            Services
          </div>
          <div className="MainMenu-Section-middle-Item cursor-Pinter">
            Pages
          </div>
          <div className="MainMenu-Section-middle-Item cursor-Pinter">Shop</div>
          <div className="MainMenu-Section-middle-Item cursor-Pinter">Blog</div>
          <div className="MainMenu-Section-middle-Item cursor-Pinter">
            Pricing Plan
          </div>
          <div className="MainMenu-Section-middle-Item cursor-Pinter">
            Contact Us
          </div>
        </div>
        <div className="cursor-Pinter" id="MainMenu-Section-Right">
          <AiOutlineShoppingCart />
          <LuSearch />
          <div className="cursor-Pinter" id="MainMenu-Section-Right-btn">
            Get Started
          </div>
        </div>
      </div>
      <div id="DiscountMenu">
        <span>
          Save $15/mo on your internet bill. When you sign up for both mobile
          and home internet.
        </span>
        <span>Offer details</span>
      </div>
    </div>
  );
};

export default Header;
