import React from "react";
import "./sidebarmobile.scss";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useAppSelector } from "app/hooks";
type Props = {
  children?: React.ReactNode;
  show?: number;
  onClose: () => void;
};

const SidebarMobile = (props: Props) => {
  const { show, onClose } = props;
  const user = useAppSelector((state) => state.auth.currentUser);
  let userLocal: any = localStorage.getItem("currentUser");
  if (userLocal) userLocal = JSON.parse(userLocal);

  const handleCloseIcon = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className="sidebar-mobile"
      style={{ transform: `translateX(${show}px)`, transition: "0.3s ease" }}
    >
      <div className="sidebar-mobile__close-icon" onClick={handleCloseIcon}>
        <CloseIcon></CloseIcon>
      </div>
      <ul className="sidebar-mobile__list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          {user || userLocal ? (
            <span style={{ cursor: "pointer" }}>
              <Link to="/account">{user?.name || userLocal?.name}</Link>
            </span>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SidebarMobile;
