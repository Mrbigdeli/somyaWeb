import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { useState } from "react";

// EmailAddress_Var  -> with useState
const Footer = () => {
  const [EmailAddress_Var , setEmailAddress_Var] = useState("");
  
  function submitEmail(e) {
    e.preventDefault();
    if(!EmailAddress_Var) return;
    console.log(EmailAddress_Var)
  }
  return (
    <>
      <div id="topFooter">
        <div id="topFooter-background-star"></div>
        <div id="topFooter-left"></div>
        <div id="topFooter-right">
          <div className="topfooter-right-items">
            <h3 id="topfooter-right-items-text" className="font-league">
              Sign up to hear about incredible offers you won’t want to miss –
              plus our latest products, services and more.
            </h3>
            <form id="topfooter-right-items-form" action="" method="post">
            <div id="topfooter-right-items-form-fistPart">
                <label htmlFor="email" id="topfooter-right-items-formLable" className="font-league">
                  Email Address
                </label>
            </div>  
            <div id="topfooter-right-items-form-secendPart">
                <input 
                  type="email"
                  value={EmailAddress_Var}
                  onChange={(e) => setEmailAddress_Var(e.target.value)}
                  name="" 
                  id="topfooter-right-items-formInput" />
           
              <button
                 id="topfooter-right-items-formButton"
                type="submit"
                className="font-league"
                onClick={(e) => {
                  submitEmail(e);
                }}
              >
                submit
              </button>
              </div>  
            </form>
          </div>
        </div>
      </div>
      <div id="mainFooter">
        <div id="mainFooter-container">
          <div className="mainFooter-column-list">
            <div id="mainFooter-logo">MY LOGO</div>
            <p className="font-league mainFooter-text">
              Helping our communities connect, work, & thrive since 1952
            </p>
            <div className="mainFooter-column-title font-league">Social Media</div>
            <div id="mainFooter-footerIcons">
              <FaFacebookF className="mainFooter-text" />
              <FaXTwitter className="mainFooter-text" />
              <PiInstagramLogoFill className="mainFooter-text" />
              <FaLinkedinIn className="mainFooter-text" />
            </div>
          </div>
          <div className="mainFooter-column-list font-league">
            <p className="mainFooter-column-title font-league">Services</p>
            <Link to="/" className="mainFooter-column-item font-league">Internet</Link>
            <Link to="/" className="mainFooter-column-item font-league">TV</Link>
            <Link to="/" className="mainFooter-column-item font-league">Phone</Link>
            <Link to="/" className="mainFooter-column-item font-league">
              Managed Wireless
            </Link>
            <Link to="/" className="mainFooter-column-item font-league"> PAC’s</Link>
          </div>
          <div className="mainFooter-column-list font-league">
            <p className="mainFooter-column-title font-league">Company</p>
            <Link to="/" className="mainFooter-column-item font-league">About</Link>
            <Link to="/" className="mainFooter-column-item font-league">Pricing</Link>
            <Link to="/" className="mainFooter-column-item font-league">Contact</Link>
            <Link to="/" className="mainFooter-column-item font-league">Policies</Link>
            <Link to="/" className="mainFooter-column-item font-league">Shop</Link>
          </div>
          <div className="mainFooter-column-list font-league">
            <p className="mainFooter-column-title font-league">Information</p>
            <Link to="/" className="mainFooter-column-item font-league">Blog</Link>
            <Link to="/" className="mainFooter-column-item font-league">Services</Link>
            <Link to="/" className="mainFooter-column-item font-league">Resources</Link>
            <Link to="/" className="mainFooter-column-item font-league">Channel List</Link>
            <Link to="/" className="mainFooter-column-item font-league">
              {" "}
              Location In Map
            </Link>
          </div>
          <div className="mainFooter-column-list font-league">
            <p className="mainFooter-column-title font-league">Get In Touch</p>
            <Link to="/" className="mainFooter-column-link">
              {" "}
              +1 (800) 216 20 20
            </Link>
            <p className="font-league mainFooter-text">
              (for customer service and support)
            </p>
            <Link to="/" className="mainFooter-column-link">
              {" "}
              +1 (800) 216 20 20
            </Link>
            <p className="font-league mainFooter-text">
              (for customer service and support)
            </p>
          </div>
        </div>
      </div>
      <footer className="footer">تمامی حقوق برای سومیا وب محفوظ است .</footer>
    </>
  );
};

export default Footer;
