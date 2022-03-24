import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useAppSelector } from "app/hooks";
import MenuIcon from "@mui/icons-material/Menu";
import React, { forwardRef, useRef } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
type Props = {
  height?: string;
  bg?: string;
  ref?: any;
  onChange?: () => void;
};

const Header = (props: Props, ref: any) => {
  const { height, bg, onChange } = props;
  const cart = useAppSelector((state) => state.cart.cartItems);
  let count = 0;

  const handleShowMobileSidebar = () => {
    if (onChange) {
      onChange();
    }
  };

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
      <div className="header__container" ref={ref}>
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
        <div
          className="header__container-mobile-icon"
          onClick={handleShowMobileSidebar}
        >
          <MenuIcon></MenuIcon>
        </div>
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

export default forwardRef(Header);
