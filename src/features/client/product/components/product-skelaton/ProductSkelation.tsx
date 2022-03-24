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
          <Grid item xs={12} sm={12} md={3} key={index}>
            <div
              style={{
                marginBottom: "20px",
                maxHeight: "265px",
                height: "265px",
              }}
            >
              <Skeleton
                variant="rectangular"
                width={device === "xs" ? 310 : 210}
                height={200}
                sx={{ marginBottom: "10px" }}
              />
              <Skeleton
                variant="text"
                width={device === "xs" ? 310 : 210}
                sx={{ marginBottom: "10px" }}
              />
              <Skeleton variant="text" width={device === "xs" ? 310 : 210} />
            </div>
          </Grid>
        );
      })}
    </>
  );
};

export default ProductSkelation;
