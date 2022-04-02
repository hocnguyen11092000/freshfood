import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import blogApi from "api/blogApi";
import axios from "axios";
import Footer from "components/Common/footer/Footer";
import Header from "components/Common/header/Header";
import SidebarMobile from "components/Common/sidebarMobile/SidebarMobile";
import { ListParams, ListResponse } from "models";
import { Blog } from "models/blog";
import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery, QueryFunctionContext } from "react-query";
import "./blog.scss";
import BlogItem from "./components/BlogItem";
type Props = {};

const BlogPage = (props: Props) => {
  const [page, setPage] = useState<number>(1);
  const [showMobile, setShowMobile] = useState<number>(300);

  const headerRef = useRef<any>();

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

  const [filter, setFilter] = useState<any>({
    page,
  });

  const fetchBlogList = async ({ pageParam = 1 }: QueryFunctionContext) => {
    const res = await axios.get(
      `https://orchid.tk/api/v1/blogs?page=${pageParam}`
    );
    return res;
  };

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery<any, ErrorConstructor>("blogs", fetchBlogList, {
      getNextPageParam: (lastPage, pages) => {
        if (pages.length * 4 > pages[0]?.data?.blogCount) return undefined;

        return pages.length + 1;
      },
    });

  const handleChangeMobileSidebar = () => {
    setShowMobile(0);
  };

  const handleCloseMobileSidebar = () => {
    setShowMobile(300);
  };
  return (
    <>
      <Header ref={headerRef} onChange={handleChangeMobileSidebar}></Header>
      <div className="blog">
        <Grid container spacing={4}>
          <Grid item lg={4} md={5} sm={12} xs={12}>
            <div className="blog__newPosts">
              <h3 className="blog__newPosts-heading">New Posts</h3>
              <ul className="blog__newPosts-list">
                <li className="blog__newPosts-list-item">
                  <Grid container spacing={1}>
                    <Grid item sm={4}>
                      <img
                        src="https://nethue.com.vn/temp/-uploaded-gioi-thieu_gioithieu2_cr_320x215.png"
                        alt=""
                        width="100%"
                        height="100%"
                        style={{ objectFit: "cover" }}
                      />
                    </Grid>
                    <Grid item sm={8}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "0.9rem" }}
                          className="blog__newPosts-list-item-title"
                        >
                          LIST 10 ĐẶC SẢN HUẾ LÀM QUÀ VỪA NGON VỪA RẺ CHO KHÁCH
                          DU LỊCH
                        </Typography>
                        <Typography
                          sx={{ fontSize: "0.9rem", marginTop: "10px" }}
                          className="blog__newPosts-list-item-time"
                        >
                          <Typography
                            component="span"
                            sx={{ color: "#ccc", marginRight: "10px" }}
                          >
                            NV THUYTIEN
                          </Typography>
                          24.12.2021
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </li>
                <li className="blog__newPosts-list-item">
                  <Grid container spacing={1}>
                    <Grid item sm={4}>
                      <img
                        src="https://nethue.com.vn/temp/-uploaded-gioi-thieu_gioithieu2_cr_320x215.png"
                        alt=""
                        width="100%"
                        height="100%"
                        style={{ objectFit: "cover" }}
                      />
                    </Grid>
                    <Grid item sm={8}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "0.9rem" }}
                          className="blog__newPosts-list-item-title"
                        >
                          LIST 10 ĐẶC SẢN HUẾ LÀM QUÀ VỪA NGON VỪA RẺ CHO KHÁCH
                          DU LỊCH
                        </Typography>
                        <Typography
                          sx={{ fontSize: "0.9rem", marginTop: "10px" }}
                          className="blog__newPosts-list-item-time"
                        >
                          <Typography
                            component="span"
                            sx={{ color: "#ccc", marginRight: "10px" }}
                          >
                            NV THUYTIEN
                          </Typography>
                          24.12.2021
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </li>
              </ul>
            </div>
          </Grid>
          <Grid item lg={8} md={7} sm={12} xs={12}>
            <div className="blog__all">
              <Typography component="h3">Blogs</Typography>
              <Box>
                <Grid container spacing={2}>
                  {isLoading && (
                    <div style={{ margin: "20px" }}>Loading...</div>
                  )}
                  {data &&
                    data.pages.map((group: any) => {
                      return group.data?.blogs.map((item: Blog) => (
                        <BlogItem key={item._id} item={item}></BlogItem>
                      ));
                    })}
                </Grid>
                {hasNextPage && (
                  <>
                    <div style={{ margin: "15px 0", textAlign: "center" }}>
                      <button
                        className="blog__all-load-more"
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                      >
                        {isFetchingNextPage
                          ? "Loading more..."
                          : hasNextPage
                          ? "Load More"
                          : "Nothing more to load"}
                      </button>
                    </div>
                  </>
                )}
              </Box>
            </div>
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

export default BlogPage;
