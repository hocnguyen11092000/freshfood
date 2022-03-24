import { Box, Grid, Pagination, Paper, Stack, Typography } from "@mui/material";
import productApi from "api/productApi";
import Header from "components/Common/header/Header";
import { descData } from "features/admin/Home/pages/Home";
import Category from "features/client/product/components/filter/category/Category";
import SearchProduct, {
  SearchValue,
} from "features/client/product/components/filter/search/SearchProduct";
import ProductItem from "features/client/product/components/product-item/ProductItem";
import { ListResponse, Product } from "models";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Price from "../../components/filter/price/Price";
import ProductSkelation from "../../components/product-skelaton/ProductSkelation";
import "./listproduct.scss";

type Props = {};

const ListProduct = (props: Props) => {
  const [page, setPage] = React.useState<number>(1);

  const [filter, setFilter] = useState<any>({
    page,
    keyword: "",
    cat: "",
    "price[lte]": undefined,
  });

  const handleChange = (event: any, value: any) => {
    setPage(value);
    setFilter({
      ...filter,
      page: value,
    });
  };

  const fetchProductList = async (filter: any) => {
    const res: ListResponse<Product> = await productApi.getAll(filter);
    return res;
  };

  const { isLoading, error, data } = useQuery<
    ListResponse<Product>,
    ErrorConstructor
  >(["fetchProducts", filter], () => fetchProductList(filter));

  if (error) return <div>error</div>;

  let count = 0;

  if (data?.productCount) {
    count = Math.ceil(data?.productCount / 8);
  }

  const dataProducts = descData(data?.products);

  const handleSubmit = (value: SearchValue) => {
    setFilter({
      ...filter,
      keyword: value.keyword,
    });
  };

  const handleChangeCategory = (category: string) => {
    setFilter({
      ...filter,
      cat: category,
    });
  };

  const handleResetFilter = () => {
    setFilter({
      page: 1,
      keyword: "",
      cat: "",
      "price[lte]": undefined,
    });
    setPage(1);
  };

  const handlePriceChange = (value: string) => {
    setFilter({
      ...filter,
      "price[lte]": value,
    });
  };

  return (
    <>
      <Header></Header>
      <div
        style={{
          backgroundColor: "rgb(240, 240, 240)",
          margin: "0",
          padding: "0",
        }}
        className="wrapper-product"
      >
        <Box className="list-product">
          <Grid container spacing={1}>
            <Grid item md={3} sm={12} xs={12}>
              <Paper elevation={0} sx={{ padding: "20px" }}>
                <div onClick={handleResetFilter} className="reset">
                  All product
                </div>
                <SearchProduct onSubmit={handleSubmit}></SearchProduct>
                <Typography variant="h6" component="h6">
                  Category
                </Typography>
                <Category
                  isChoosed={filter.cat}
                  onChange={handleChangeCategory}
                ></Category>
                <Typography variant="h6" component="h6">
                  Price
                </Typography>
                <Price onSubmit={handlePriceChange}></Price>
              </Paper>
              <Paper elevation={0} sx={{ padding: "20px", marginTop: "10px" }}>
                <Typography variant="h6" component="h6">
                  Filters is applied:
                  <div style={{ fontSize: "0.9rem" }}>
                    category:
                    <span className="list-product__filter">
                      {filter.cat !== "" ? ` ${filter.cat}` : " all"}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.9rem" }}>
                    price below equal:
                    <span className="list-product__filter">
                      {filter["price[lte]"] !== undefined
                        ? ` ${filter["price[lte]"]}.000đ`
                        : " all"}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.9rem" }}>
                    page:
                    <span className="list-product__filter">
                      {` ${filter.page}`}
                    </span>
                  </div>
                </Typography>
              </Paper>
            </Grid>
            <Grid item md={9} sm={12}>
              <Paper elevation={0} sx={{ padding: "20px" }}>
                <Grid container>
                  {isLoading && <ProductSkelation></ProductSkelation>}
                  {data &&
                    dataProducts.map((item: Product, index: number) => {
                      return (
                        <Grid item xs={12} sm={12} md={3} key={index}>
                          <ProductItem item={item}></ProductItem>
                        </Grid>
                      );
                    })}
                </Grid>
                <div className="pagination" style={{ marginTop: "0" }}>
                  <Grid container>
                    <Grid item sm={12}>
                      <Stack spacing={2} sx={{ width: "100%" }}>
                        <Pagination
                          count={count}
                          page={page}
                          onChange={handleChange}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default ListProduct;
