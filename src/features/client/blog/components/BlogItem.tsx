import { Grid, Typography } from "@mui/material";
import { Blog } from "models/blog";
import React from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

type Props = {
  item?: Blog;
};

const BlogItem = (props: Props) => {
  const { item } = props;

  return (
    <>
      <Grid item md={4} sm={5} xs={12}>
        <Link to={`/blog/${item?._id}`}>
          <img
            src={item?.image.url}
            alt={item?.title}
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
          />
        </Link>
      </Grid>
      <Grid item md={8} sm={7} xs={12}>
        <Typography component="p" sx={{ fontSize: "1rem" }}>
          <Link to={`/blog/${item?._id}`}>{item?.title}</Link>
        </Typography>
        <Typography
          component="p"
          sx={{
            fontSize: "0.9rem",
            color: "#ccc",
            margin: "10px 20px 10px 0",
          }}
        >
          {item?.author}
          <Typography
            component="span"
            sx={{
              display: "inline-block",
              marginLeft: "15px",
              fontSize: "0.9rem",
            }}
          >
            {format(item?.createdAt)}
          </Typography>
        </Typography>

        <Typography component="p" sx={{ fontSize: "0.9rem" }}>
          {item?.shortDescription}
        </Typography>
      </Grid>
    </>
  );
};

export default BlogItem;
