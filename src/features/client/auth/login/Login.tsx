import { useAppDispatch } from "app/hooks";
import Footer from "components/Common/footer/Footer";
import SidebarMobile from "components/Common/sidebarMobile/SidebarMobile";
import { login } from "features/auth/authSlice";
import { Values } from "models";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import Header from "../../../../components/Common/header/Header";
import "./login.scss";

type Props = {};

const Login = (props: Props) => {
  const dispatch = useAppDispatch();
  const [showMobile, setShowMobile] = useState<number>(300);

  const handleFormSubmit = async (values: Values) => {
    await dispatch(login(values));
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
        <LoginForm onSubmit={handleFormSubmit}></LoginForm>
      </div>
      <Footer bg="#f0f0f0"></Footer>
      <SidebarMobile
        onClose={handleCloseMobileSidebar}
        show={showMobile}
      ></SidebarMobile>
    </>
  );
};

export default Login;
