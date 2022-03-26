import Footer from "components/Common/footer/Footer";
import Header from "components/Common/header/Header";
import SidebarMobile from "components/Common/sidebarMobile/SidebarMobile";
import React, { useState } from "react";
import "./blog.scss";
type Props = {};

const Blog = (props: Props) => {
  const [showMobile, setShowMobile] = useState<number>(300);

  const handleChangeMobileSidebar = () => {
    setShowMobile(0);
  };

  const handleCloseMobileSidebar = () => {
    setShowMobile(300);
  };
  return (
    <>
      <Header onChange={handleChangeMobileSidebar}></Header>
      <div className="blog">updating...</div>
      <Footer bg="#f0f0f0"></Footer>
      <SidebarMobile
        onClose={handleCloseMobileSidebar}
        show={showMobile}
      ></SidebarMobile>
    </>
  );
};

export default Blog;
