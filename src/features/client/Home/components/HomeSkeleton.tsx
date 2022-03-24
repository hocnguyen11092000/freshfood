import { Grid, Skeleton } from "@mui/material";
import React from "react";

type Props = {};
export const getBrowserWidth = function () {
  if (window.innerWidth < 768) {
    // Extra Small Device
    return "xs";
  } else if (window.innerWidth < 991) {
    // Small Device
    return "sm";
  } else if (window.innerWidth < 1199) {
    // Medium Device
    return "md";
  } else {
    // Large Device
    return "lg";
  }
};

const HomeSkeleton = (props: Props) => {
  const device = getBrowserWidth();

  return (
    <>
      {Array.from(new Array(8)).map((_, index: number) => {
        return (
          <div>
            {/* <div className="newProduct__wrapper-block-img"> */}
            {/* <img src={item.images[0].url} alt="" /> */}
            <Skeleton
              variant="rectangular"
              width={device === "xs" ? "100%" : 257.25}
              height={240}
              sx={{ marginBottom: "10px", borderRadius: "5px" }}
              animation="wave"
            />
            {/* </div> */}
            {/* <div className="newProduct__wrapper-block-name"> */}
            {/* {item.name} */}
            <Skeleton
              variant="rectangular"
              width={device === "xs" ? "100%" : 257.25}
              height={33}
              sx={{ marginBottom: "10px", borderRadius: "5px" }}
              animation="wave"
            />
            {/* </div> */}
            {/* <div className="newProduct__wrapper-block-price"> */}
            {/* {item.price}.000đ/kg */}
            <Skeleton
              variant="rectangular"
              width={device === "xs" ? "100%" : 257.25}
              height={23}
              sx={{ marginBottom: "30px", borderRadius: "5px" }}
              animation="wave"
            />
          </div>
          // </div>
        );
      })}
    </>
  );
};

export default HomeSkeleton;
