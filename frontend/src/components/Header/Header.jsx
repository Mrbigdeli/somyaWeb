import { Link } from "react-router-dom";
import "./Header.css";

// import { ShoppingCartIcon } from "@mui/icons-material";
const Header = () => {
  return (
    <header className="header">
      <div id="HeaderPart1">
        <img src="/logo.svg" alt="logo" id="HeaderPart1-Logo" />
        <div id="HeaderPart1-ContctNum">
          <p>+98000000</p>
          <p>+98025963</p>
        </div>
        <div id="HeaderPart1-BuyCart">
          <p>chart</p>
        </div>
        <div id="HeaderPart1-SignInSignUp">
          <Link to="/signin" className="HeaderPart2-NavMenu-li">
            Signin
          </Link>
        </div>
      </div>
      <div id="HeaderPart2">
        <ul className="NavMenu">
          <li>
            <Link to="/products" className="HeaderPart2-NavMenu-li">
              محصولات
            </Link>
          </li>
          <li>
            <Link to="/shop-loc" className="HeaderPart2-NavMenu-li">
              شعبه ها
            </Link>
          </li>
          <li>
            <Link to="/discount" className="HeaderPart2-NavMenu-li">
              جشنواره ها
            </Link>
          </li>
          <li>
            <Link to="/about" className="HeaderPart2-NavMenu-li">
              درباره ما
            </Link>
          </li>
          <li>
            <Link to="/contactus" className="HeaderPart2-NavMenu-li">
              تماس با ما
            </Link>
          </li>
          {/* <li>
            <Link to="/about" className="HeaderPart2-NavMenu-li">
              گوشواره
            </Link>
          </li>
          <li>
            <Link to="/about" className="HeaderPart2-NavMenu-li">
              دسبندت رو بساز
            </Link>
          </li>
          <li>
            <Link to="/about" className="HeaderPart2-NavMenu-li">
              آویز ساعت
            </Link>
          </li>
          <li>
            <Link to="/about" className="HeaderPart2-NavMenu-li">
              انگشتر
            </Link>
          </li>
          <li>
            <Link to="/about" className="HeaderPart2-NavMenu-li">
              پابند
            </Link>
          </li>
          <li>
            <Link to="/about" className="HeaderPart2-NavMenu-li">
              جاسوییچی
            </Link>
          </li>
          <li>
            <Link to="/about" className="HeaderPart2-NavMenu-li">
              بچگانه
            </Link>
          </li> */}
          <li>
            <Link to="/about" className="HeaderPart2-NavMenu-li">
              قیمت طلا و سکه
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
