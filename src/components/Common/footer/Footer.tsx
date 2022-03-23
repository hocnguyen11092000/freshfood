import React from "react";
import "./footer.scss";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
type Props = {
  bg?: string;
};

const Footer = (props: Props) => {
  const { bg } = props;

  const footerInfo = [
    {
      id: 1,
      name: "Address: Cai Be, Tien Giang",
      icon: <LocationOnOutlinedIcon></LocationOnOutlinedIcon>,
    },
    {
      id: 2,
      name: "0363935029",
      icon: <PhoneOutlinedIcon></PhoneOutlinedIcon>,
    },
    {
      id: 3,
      name: "hocnguyen1109200@gmail.com",
      icon: <EmailOutlinedIcon></EmailOutlinedIcon>,
    },
  ];
  return (
    <div className="footer" style={bg ? { backgroundColor: `${bg}` } : {}}>
      <div className="footer__block">
        <div className="footer__block-heading">Fresh food</div>
        <ul className="footer__block-list">
          {footerInfo.map((item) => {
            return (
              <li key={item.id}>
                <span className="footer__block-list-icon">{item.icon}</span>
                <span>{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="footer__block">
        <div className="footer__block-wrapper">
          <div className="footer__block-item">
            <div className="footer__block-item-heading">
              <span>SHOP</span>
            </div>
            <ul className="footer__block-item-li">
              <li>Food</li>
              <li>Farm</li>
              <li>Headth</li>
              <li>Organic</li>
            </ul>
          </div>
          <div className="footer__block-item">
            <div className="footer__block-item-heading">
              <span>SUPPORT</span>
            </div>
            <ul className="footer__block-item-li">
              <li>Contact us</li>
              <li>FAQ</li>
              <li>Privacy Policy</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="footer__block-item">
            <div className="footer__block-item-heading">
              <span>MY ACCOUNT</span>
            </div>
            <ul className="footer__block-item-li">
              <li>Sign In</li>
              <li>My Cart</li>
              <li>My Whistlist</li>
              <li>Check Out</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__block">
        <div className="footer__block-subscribe">
          <div className="footer__block-subscribe-heading">NEWSLETTER</div>
          <div className="footer__block-subscribe-form">
            <span>Subscribe now to get daily updates</span>
            <div className="footer__block-subscribe-form-form-group">
              <input type="text" placeholder="Your email ..." />
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
