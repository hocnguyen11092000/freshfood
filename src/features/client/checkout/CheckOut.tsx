import { Box, Grid, Paper, Typography } from "@mui/material";
import orderApi from "api/orderApi";
import { useAppDispatch } from "app/hooks";
import Footer from "components/Common/footer/Footer";
import Header from "components/Common/header/Header";
import Popup from "components/Common/popup/Popup";
import SidebarMobile from "components/Common/sidebarMobile/SidebarMobile";
import { socketAcions } from "features/socket/socketSlice";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { cartActions } from "../cart/cartSlice";
import { getBrowserWidth } from "../Home/components/HomeSkeleton";
import "./checkout.scss";
import ShippingForm from "./components/ShippingForm";

type Props = {
  onChange?: (x: any) => void;
};

const CheckOut = (props: Props) => {
  const device = getBrowserWidth();
  const [showMobile, setShowMobile] = useState<number>(300);
  // const [socket, setSocket] = useState<any>();
  const navigate = useNavigate();
  const [checkoutSuccess, setCheckOutSuccess] = useState<boolean>(false);

  // useEffect(() => {
  //   setSocket(io("http://localhost:5000"));
  // }, []);

  const { state } = useLocation() as any;
  const dispatch = useAppDispatch();
  const cartItems = state?.cartItems;
  const total = cartItems.reduce(
    (x: number, y: any) =>
      x + y.price * y.quantity - (y.price * y.quantity * y.discount) / 100,
    0
  );
  const sum = total + 30;

  const handleFormSubmit = async (values: any) => {
    cartItems.forEach((item: any) => {
      item.product = item._id;
    });

    const data: any = {
      itemsPrice: total,
      shippingPrice: 30,
      shippingInfo: values,
      totalPrice: sum,
      orderItems: cartItems,
      paymentInfo: {
        id: "sample payment Info",
        status: "status",
      },
    };
    try {
      let tokenLocal = localStorage.getItem("token");

      if (tokenLocal) {
        tokenLocal = JSON.stringify(tokenLocal);
      }
      const res: any = await axios.post(
        "https://orchid.tk/api/v1/order/new",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenLocal}`, //the token is a variable which holds the token
          },
        }
      );
      Cookies.remove("cartItems");

      dispatch(cartActions.clearCart());
      dispatch(socketAcions.sendData(data));
      dispatch(socketAcions.setCheck());

      setCheckOutSuccess(true);
      // socket.emit("sendOrder", res.order);
      // localStorage.setItem("socket", Math.random().toString());
    } catch (error: any) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data.error;

      if (errorMessage === "jwt malformed") {
        toast.error("UnAuthenticated User, Please login again");
      } else if (statusCode == "401") {
        // navigate("/admin/login");
        toast.error("please login to checkout");
      } else {
        toast.error("fail to add order");
      }
    }
  };

  const handleChangeMobileSidebar = () => {
    setShowMobile(0);
  };

  const handleCloseMobileSidebar = () => {
    setShowMobile(300);
  };

  return (
    <>
      <Header onChange={handleChangeMobileSidebar}></Header>
      <div className="check-out">
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ padding: "20px" }}>
              <Typography component="h2" variant="h5">
                Shipping info
              </Typography>
              <ShippingForm onSubmit={handleFormSubmit}></ShippingForm>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5}>
            <Paper elevation={0} sx={{ padding: "20px" }}>
              <Typography>Shipping cart</Typography>
              <Box>
                {cartItems &&
                  cartItems.map((item: any, index: number) => {
                    return (
                      <div className="item" key={index}>
                        <img src={item.image} alt="" className="item__img" />
                        <div className="item__info">
                          <p>{item.name}</p>
                          <p>{item.quantity}</p>
                        </div>
                        <p className="item__total">
                          {(
                            ((item.price * (100 - item.discount)) / 100) *
                            item.quantity
                          ).toFixed(3)}
                          đ
                        </p>
                      </div>
                    );
                  })}
                <h3>Shipping price: 30.000đ</h3>
                <h3 style={{ margin: "15px 0" }}>Total: {sum.toFixed(3)}đ</h3>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </div>
      {checkoutSuccess && (
        <Popup active={checkoutSuccess}>
          <h3
            style={{
              textAlign: "center",
              padding: "10px 0 20px 0",
              fontWeight: "600",
            }}
          >
            Check Out successfully
          </h3>
          <p
            style={{
              textAlign: "center",
              padding: "10px 0 20px 0",
              fontWeight: "500",
            }}
          >
            Thank for your order
          </p>
          <div style={{ textAlign: "center" }}>
            <Link to="/">
              <button
                style={{
                  padding: "8px 10px",
                  background: "#019707",
                  borderRadius: "5px",
                  border: "none",
                  color: "#fff",
                  fontSize: "1rem",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
              >
                Go back home
              </button>
            </Link>
          </div>
        </Popup>
      )}
      <Footer bg="#f0f0f0"></Footer>
      <SidebarMobile
        onClose={handleCloseMobileSidebar}
        show={showMobile}
      ></SidebarMobile>
    </>
  );
};

export default CheckOut;
