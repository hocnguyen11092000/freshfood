import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useAppSelector } from "app/hooks";
import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";
type Props = {
  height?: string;
  bg?: string;
};

const Header = (props: Props) => {
  const { height, bg } = props;
  const cart = useAppSelector((state) => state.cart.cartItems);
  let count = 0;
  console.log(bg, height);

  cart.forEach((item) => (count += item.quantity));
  return (
    <header
      className="header"
      style={{
        background: `url(${bg})`,
        height: `${height}`,
        backgroundPosition: "50%",
        backgroundSize: "cover",
      }}
    >
      <div className="header__container">
        <div className="header__container-logo">
          <Link to="/">Fresh food</Link>
        </div>
        <ul className="header__container-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
        <div className="header__container-groupIcon">
          <span className="header__container-groupIcon-icon">
            <SearchIcon></SearchIcon>
          </span>
          <span className="header__container-groupIcon-icon">
            <Link to="/cart">
              <ShoppingBagOutlinedIcon></ShoppingBagOutlinedIcon>
            </Link>
            {count > 0 && <span className="count-cart">{count}</span>}
          </span>
          <span className="header__container-groupIcon-icon">
            <PersonOutlineOutlinedIcon></PersonOutlineOutlinedIcon>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
