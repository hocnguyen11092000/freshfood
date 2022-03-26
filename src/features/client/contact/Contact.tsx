import { Grid } from "@mui/material";
import Footer from "components/Common/footer/Footer";
import Header from "components/Common/header/Header";
import SidebarMobile from "components/Common/sidebarMobile/SidebarMobile";
import React, { useState } from "react";
import { getBrowserWidth } from "../Home/components/HomeSkeleton";
import ContactForm from "./components/ContactForm";
import "./contact.scss";
type Props = {};

const Contact = (props: Props) => {
  const device = getBrowserWidth();
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
      <div className="contact-page">
        <Grid container spacing={3}>
          <Grid item md={6} sm={12} xs={12}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7619.923006586029!2d105.89247047522825!3d10.328130363740641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a8415e018e315%3A0x74bb958ad21f2051!2zVHLGsOG7nW5nIFRIUFQgUGjhuqFtIFRow6BuaCBUcnVuZw!5e0!3m2!1svi!2s!4v1648286131285!5m2!1svi!2s"
              width="100%"
              height="735"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <div className="contact-page__heading">
              <h3>Contact</h3>
              <div className="contact-page__heading-group">
                <div>My address</div>
                <span>Cai Be, Tien Giang</span>
              </div>
              <div className="contact-page__heading-group">
                <div>My email</div>
                <span>hocnguyen1109200@gmail.com</span>
              </div>
              <div className="contact-page__heading-group">
                <div>My phone</div>
                <span>0363935029</span>
              </div>
              <div className="contact-page__heading-group">
                <div>working time</div>
                <span>From Monday to Sunday from 9:00 to 21:00</span>
              </div>
            </div>
            <ContactForm device={device}></ContactForm>
          </Grid>
        </Grid>
      </div>
      <Footer bg="#f0f0f0"></Footer>
      <SidebarMobile
        onClose={handleCloseMobileSidebar}
        show={showMobile}
      ></SidebarMobile>
    </>
  );
};

export default Contact;
