import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Blog } from "../../../../models/blog";
import blogApi from "../../../../api/blogApi";
import "./detailblog.scss";
import Footer from "components/Common/footer/Footer";
import SidebarMobile from "components/Common/sidebarMobile/SidebarMobile";
import Header from "components/Common/header/Header";
import { LinearProgress } from "@mui/material";
type Props = {};

const DetailBlog = (props: Props) => {
  const [blog, setBlog] = useState<Blog>();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const headerRef = useRef<any>();
  const [showMobile, setShowMobile] = useState<number>(300);
  const { id } = useParams();

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
    (async () => {
      if (!id) return;
      setIsloading(true);

      try {
        const res = await blogApi.getById(id);
        setBlog(res.blog);
        setIsloading(false);
      } catch (error) {
        setIsloading(false);
        console.log(error);
      }
    })();
  }, [id]);

  if (isLoading)
    return (
      <div style={{ marginTop: "20px" }}>
        <LinearProgress color="info" />
      </div>
    );

  const handleChangeMobileSidebar = () => {
    setShowMobile(0);
  };

  const handleCloseMobileSidebar = () => {
    setShowMobile(300);
  };

  return (
    <>
      <Header ref={headerRef} onChange={handleChangeMobileSidebar}></Header>
      <div className="detail-blog-banner">
        <span>Blog</span>
      </div>
      <div className="detail-blog">
        {blog && (
          <p
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></p>
        )}
      </div>
      <Footer bg="#f0f0f0"></Footer>
      <SidebarMobile
        onClose={handleCloseMobileSidebar}
        show={showMobile}
      ></SidebarMobile>
    </>
  );
};

export default DetailBlog;
