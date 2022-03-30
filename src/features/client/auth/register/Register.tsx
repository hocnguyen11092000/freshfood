import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "app/hooks";
import Footer from "components/Common/footer/Footer";
import Header from "components/Common/header/Header";
import Popup from "components/Common/popup/Popup";
import SidebarMobile from "components/Common/sidebarMobile/SidebarMobile";
import { addUser } from "features/admin/user/userSlice";
import RegisterForm from "features/auth/components/RegisterForm";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getBrowserWidth } from "utils/getBrowserDevice";
import "./register.scss";

type Props = {};

const Register = (props: Props) => {
  const [showMobile, setShowMobile] = useState<number>(300);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const device = getBrowserWidth();

  const handleFormSubmit = async (values: any) => {
    const myForm = new FormData();

    myForm.append("name", values.name);
    myForm.append("email", values.email);
    myForm.append("password", values.password);

    myForm.append("avatar", values.avatar);

    try {
      const result = await dispatch(addUser(myForm));
      unwrapResult(result);

      toast.success("Register successfully");
      navigate("/login");
    } catch (error: any) {
      console.log(error);
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
      <div className="login-banner">
        <span>My Account</span>
      </div>
      <div className="login client">
        <RegisterForm onSubmit={handleFormSubmit}></RegisterForm>
      </div>
      <Footer bg="#f0f0f0"></Footer>
      <SidebarMobile
        onClose={handleCloseMobileSidebar}
        show={showMobile}
      ></SidebarMobile>
      {device === "xs" && (
        <Popup active={true}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
            }}
          >
            <h3>sorry, this feature currently only works on desktop</h3>
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
    </>
  );
};

export default Register;
