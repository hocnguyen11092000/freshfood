import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useAppSelector } from "app/hooks";
import MenuIcon from "@mui/icons-material/Menu";
import React, { forwardRef, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import Search from "features/client/Home/components/search/Search";
import { getToken } from "utils/jwt";
type Props = {
  height?: string;
  bg?: string;
  ref?: any;
  onChange?: () => void;
};

const Header = (props: Props, ref: any) => {
  const { height, bg, onChange } = props;
  const [search, setSearch] = useState(-400);

  const cart = useAppSelector((state) => state.cart.cartItems);
  const user = useAppSelector((state) => state.auth.currentUser);
  let userLocal: any = localStorage.getItem("currentUser");
  if (userLocal) userLocal = JSON.parse(userLocal);

  let count = 0;

  const handleShowMobileSidebar = () => {
    if (onChange) {
      onChange();
    }
  };

  const handleCloseSearch = () => {
    setSearch(-400);
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
          <li>
            <Link to="/contact">contact</Link>
          </li>
          <li>
            <Link to="/blog">blog</Link>
          </li>
        </ul>
        <div
          className="header__container-mobile-icon"
          onClick={handleShowMobileSidebar}
        >
          <MenuIcon></MenuIcon>
        </div>
        <div className="header__container-groupIcon">
          <span className="header__container-groupIcon-icon">
            <SearchIcon onClick={() => setSearch(0)}></SearchIcon>
          </span>
          <span className="header__container-groupIcon-icon">
            <Link to="/cart">
              <ShoppingBagOutlinedIcon></ShoppingBagOutlinedIcon>
            </Link>
            {count > 0 && <span className="count-cart">{count}</span>}
          </span>
          <span className="header__container-groupIcon-icon">
            {user || userLocal ? (
              <span className="header__container-groupIcon-icon-account">
                <Link to="/account">{user?.name || userLocal?.name}</Link>
              </span>
            ) : (
              <Link to="/login">
                <PersonOutlineOutlinedIcon></PersonOutlineOutlinedIcon>
              </Link>
            )}
          </span>
        </div>
      </div>
      <Search search={search} onClose={handleCloseSearch}></Search>
    </header>
  );
};

export default forwardRef(Header);
