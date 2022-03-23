import { Grid, LinearProgress, Paper } from "@mui/material";
import productApi from "api/productApi";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { cartActions } from "features/client/cart/cartSlice";
import { Images, ListResponse, Product } from "models";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { QuantityField } from "../../../../../components/form-controls/QuantityField";
import "./detailproduct.scss";
import Header from "../../../../../components/Common/header/Header";
type Props = {};

const DetailProduct = (props: Props) => {
  const dispatch = useAppDispatch();
  const [imgActive, setImgActive] = useState<number>(0);
  const imgRef = useRef<any>();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  const { id } = useParams();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const fetchProductDetail = async (id: string) => {
    const res: ListResponse<Product> = await productApi.getById(id);
    return res;
  };

  const DetailProduct = useQuery(["productDetail", id], () =>
    fetchProductDetail(id as string)
  );

  const { isLoading, error, data } = DetailProduct;

  if (isLoading)
    return (
      <div style={{ marginTop: "10px" }}>
        <LinearProgress color="info" />
      </div>
    );

  if (error) return <div>error</div>;

  const handleFormSubmit = async (values: any) => {
    values.quantity = Number.parseInt(values.quantity);

    if (data) {
      values._id = data.product._id;
      values.name = data.product.name;
      values.price = Number.parseInt(data.product.price);
      values.image = data.product.images[0].url;
      values.discount = Number.parseInt(data.product.discount);
      values.weight = Number.parseFloat(data.product.weight);
    }

    if (
      Number.parseInt(values.quantity) *
        Number.parseInt(data?.product.weight) <=
      data?.product.stock
    ) {
      let check = false;

      cartItems.forEach(async (item) => {
        if (item._id === id) {
          if (
            Number(item.weight) * Number(item.quantity) <
            data?.product.stock
          ) {
            dispatch(cartActions.addToCart(values));
            check = true;
          } else {
            check = true;
            window.alert("quantity exceeds the allowed quantity ");
          }
        }
      });

      if (!check) {
        dispatch(cartActions.addToCart(values));
      }
    } else {
      window.alert("quantity exceeds the allowed quantity");
    }
  };

  const handleChangeImage = (e: any, index: number) => {
    if (imgRef.current) {
      imgRef.current.src = e.target.src;
      setImgActive(index);
    }
  };

  return (
    <>
      <Header></Header>
      <div className="detail-product">
        <Grid container spacing={1}>
          <Grid item sm={6}>
            <Grid container spacing={1}>
              <Grid item sm={12}>
                <Paper
                  sx={{ padding: "10px 20px" }}
                  elevation={0}
                  className="detail-product__left"
                >
                  {data &&
                    data.product.images.map((item: Images, index: number) => {
                      if (index !== 0) return;
                      return (
                        <img
                          key={index}
                          src={item.url}
                          alt=""
                          width="40%"
                          ref={imgRef}
                        />
                      );
                    })}
                </Paper>
              </Grid>
              <Grid item sm={12}>
                <Paper sx={{ padding: "10px 20px" }} elevation={0}>
                  {data &&
                    data.product.images.map((item: Images, index: number) => {
                      return (
                        <img
                          key={index}
                          src={item.url}
                          alt=""
                          className={`detail-product__left-sub-img ${
                            imgActive === index ? "active" : ""
                          }`}
                          onClick={(e: any) => handleChangeImage(e, index)}
                        />
                      );
                    })}
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={6}>
            <Paper
              sx={{ padding: "10px 20px" }}
              elevation={0}
              className="detail-product__right"
            >
              <p className="detail-product__right-name">
                {data?.product?.name}
              </p>
              <p className="detail-product__right-name">
                amount :{data?.product?.weight} {data?.product?.unit}
              </p>
              <strong
                style={{ fontWeight: "600" }}
                className="detail-product__right-price"
              >
                price: {data?.product.price}.000đ
                {data?.product.discount != "0" && (
                  <span className="detail-product__right-price-discount">
                    {data?.product.discount + "%"}
                  </span>
                )}
              </strong>
              <div className="detail-product__right-quantity-form">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  <QuantityField
                    id="quantity"
                    name="quantity"
                    control={control}
                    type="number"
                    setValue={setValue}
                    width={88}
                  ></QuantityField>
                  <button
                    className="detail-product__right-quantity-form-add-cart"
                    type="submit"
                  >
                    Add to cart
                  </button>
                </form>
                <div className="detail-product__right-shortDescrpition">
                  <h3>Short description</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Commodi eveniet iste voluptas eos necessitatibus ab
                    excepturi autem sed, ducimus non at sit dolore quaerat.
                    Voluptatibus, pariatur dignissimos id, in esse, tempora
                    nesciunt voluptatem accusantium nisi quam ipsum inventore
                    officiis repellendus nostrum numquam qui sit quia nihil ex
                    aliquid error? Maxime! nesciunt voluptatem accusantium nisi
                    quam ipsum inventore officiis repellendus nostrum numquam
                  </p>
                </div>
              </div>
            </Paper>
          </Grid>
          <h2 style={{ margin: "20px 0 10px 8px" }}>Product description</h2>
          <div
            className="detail-product-description"
            dangerouslySetInnerHTML={{ __html: data?.product.description }}
          ></div>
        </Grid>
      </div>
    </>
  );
};

export default DetailProduct;
