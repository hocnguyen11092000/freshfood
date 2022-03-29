import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import userApi from "api/userApi";
import { useAppSelector, useAppDispatch } from "app/hooks";
import Footer from "components/Common/footer/Footer";
import Header from "components/Common/header/Header";
import SidebarMobile from "components/Common/sidebarMobile/SidebarMobile";
import { logout } from "features/auth/authSlice";
import { User, Order, Product } from "models";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMyOrders } from "../../admin/user/userSlice";
import "./account.scss";
type Props = {};

const Account = (props: Props) => {
  const [showMobile, setShowMobile] = useState<number>(300);
  const headerRef = useRef<any>();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.currentUser);
  const loading = useAppSelector((state) => state.user.loading);
  const logoutLoading = useAppSelector((state) => state.auth.logging);

  let userLocal: any = localStorage.getItem("currentUser");
  if (userLocal) userLocal = JSON.parse(userLocal);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        headerRef.current?.classList.add("active");
      } else {
        headerRef.current?.classList.remove("active");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const orderList = useAppSelector((state) => state.user.orderList);

  const handleChangeMobileSidebar = () => {
    setShowMobile(0);
  };

  const handleCloseMobileSidebar = () => {
    setShowMobile(300);
  };

  const handleLogout = async () => {
    try {
      await userApi.logout();
      dispatch(logout("user"));

      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header ref={headerRef} onChange={handleChangeMobileSidebar}></Header>
      <div className="account">
        <h2 className="account__heading">
          <span>Your Account</span>
        </h2>
        <div className="account__wrapper">
          <Grid container spacing={2} className="account__wrapper-account">
            <Grid item md={4} sm={5} xs={12}>
              <h3>Account</h3>
              <ul className="account__wrapper-account-list">
                <li>Account info</li>
                <li>Address list</li>
                {logoutLoading ? (
                  <li>Log out...</li>
                ) : (
                  <li onClick={handleLogout}>Logout</li>
                )}
              </ul>
            </Grid>
            <Grid item md={8} sm={7} xs={12}>
              <div className="account__wrapper-info">
                <h3 className="account__wrapper-info-heading">Account info</h3>
                {/* <img src={user?.avatar?.url || userLocal?.avatar?.url} alt="" /> */}
                <p>{user?.name || userLocal?.name}</p>
                <p>{user?.email || userLocal?.email}</p>
              </div>
              <Grid container>
                <Grid item xs={12}>
                  <Typography component="h2" variant="h6">
                    Your Orders
                  </Typography>
                  <div className="account__wrapper-info-your-orders">
                    {loading ? (
                      <div>Loading...</div>
                    ) : orderList.length !== 0 ? (
                      orderList.map((item: Order) => {
                        return (
                          <div
                            key={item._id}
                            className="account__wrapper-info-your-orders-item"
                          >
                            <p style={{ marginBottom: "10px" }}>
                              id: {item._id}
                            </p>
                            {item.orderItems.map((product: any) => {
                              return (
                                <div
                                  key={product._id}
                                  className="account__wrapper-info-your-orders-item-product"
                                >
                                  <p>name: {product.name}</p>
                                  <p>price: {product.price.toFixed(3)}đ</p>
                                  <p>quantity: {product.quantity}</p>
                                </div>
                              );
                            })}
                            <p style={{ marginTop: "10px" }}>
                              total: {item.totalPrice.toFixed(3)}đ
                            </p>
                            <p style={{ marginTop: "10px" }}>
                              status:{" "}
                              <span className={item.orderStatus}>
                                {item.orderStatus}
                              </span>
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <div>No orders here</div>
                    )}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      <Footer bg="#f0f0f0"></Footer>
      <SidebarMobile
        onClose={handleCloseMobileSidebar}
        show={showMobile}
      ></SidebarMobile>
    </>
  );
};

export default Account;
