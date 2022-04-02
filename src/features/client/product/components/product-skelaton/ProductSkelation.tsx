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
                width: "100%",
                height: "100%",
              }}
            >
              <Skeleton variant="rectangular" width={"95%"} height={215} />
              <Skeleton variant="text" width={"95%"} height={40} />
              <Skeleton variant="text" width={"95%"} height={35} />
            </div>
          </Grid>
        );
      })}
    </>
  );
};

export default ProductSkelation;
