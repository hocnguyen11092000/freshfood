import { Grid, Skeleton } from "@mui/material";
import { getBrowserWidth } from "features/client/Home/components/HomeSkeleton";
import React from "react";

type Props = {};

const ProductSkelation = (props: Props) => {
  const device = getBrowserWidth();
  return (
    <>
      {Array.from(new Array(8)).map((_, index: number) => {
        return (
          <Grid item xs={12} sm={4} md={4} lg={3} key={index}>
            <div
              style={{
                marginBottom: "20px",
                maxHeight: "276px",
                height: "276px",
                width: "100%",
              }}
            >
              <Skeleton
                variant="rectangular"
                width={"95%"}
                height={210}
                sx={{ marginBottom: "10px" }}
              />
              <Skeleton
                variant="text"
                width={"95%"}
                sx={{ marginBottom: "10px" }}
              />
              <Skeleton variant="text" width={"95%"} />
            </div>
          </Grid>
        );
      })}
    </>
  );
};

export default ProductSkelation;
