import React from "react";
import "./contact.scss";
type Props = {};

const Contact = (props: Props) => {
  const contactImg = [
    {
      id: 1,
      url: "https://new-organic-shop.netlify.app/static/media/footer-1.b2b8a4256f5fd14c842c.jpg",
    },
    {
      id: 2,
      url: "https://new-organic-shop.netlify.app/static/media/footer-2.3ed3514c1176c2257fda.jpg",
    },
    {
      id: 3,
      url: "https://new-organic-shop.netlify.app/static/media/footer-3.aab539046edf489af43b.jpg",
    },
    {
      id: 4,
      url: "https://new-organic-shop.netlify.app/static/media/footer-4.e1a9157a0ae5e22e1f44.jpg",
    },
  ];
  return (
    <div className="contact">
      {contactImg.map((item, index) => {
        return (
          <div key={index} className="contact__imgBox">
            <img src={item.url} alt="" />
            <button>Follow us</button>
          </div>
        );
      })}
    </div>
  );
};

export default Contact;
