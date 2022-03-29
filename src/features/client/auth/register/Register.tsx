import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "app/hooks";
import Footer from "components/Common/footer/Footer";
import Header from "components/Common/header/Header";
import SidebarMobile from "components/Common/sidebarMobile/SidebarMobile";
import { addUser } from "features/admin/user/userSlice";
import RegisterForm from "features/auth/components/RegisterForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./register.scss";

type Props = {};

const Register = (props: Props) => {
  const [showMobile, setShowMobile] = useState<number>(300);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
    } catch (error) {
      console.log(error);
      toast.error("Register error");
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
    </>
  );
};

export default Register;
