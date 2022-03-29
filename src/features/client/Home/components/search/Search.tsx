import axios from "axios";
import { ListParams, Product } from "models";
import React, { useEffect, useState } from "react";
import "./search.scss";
import queryString from "query-string";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { productActions } from "features/admin/products/productSlice";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
type Props = {
  search?: number;
  onClose?: () => void;
};

const Search = (props: Props) => {
  const { search, onClose } = props;
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.product.filter);
  const loading = useAppSelector((state) => state.product.loading);
  const product = useAppSelector((state) => state.product.list);

  useEffect(() => {
    dispatch(productActions.fetchProductList(filter));
  }, [dispatch, filter]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    dispatch(
      productActions.setFilter({
        ...filter,
        keyword: e.target.value,
      })
    );
  };

  const handleCloseSearch = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className="home-search"
      style={{ right: `${search}px`, transition: "0.3s ease" }}
    >
      <div className="home-search-close">
        <CloseIcon onClick={handleCloseSearch}></CloseIcon>
      </div>
      <div className="home-search__form">
        <div className="home-search__form-form-group">
          <input type="text" placeholder="search ..." onChange={handleSearch} />
          <button>Search</button>
        </div>
      </div>
      <div className="home-search-product">
        {!loading && product.length === 0 && (
          <div style={{ margin: "20px ", color: "#333" }}>
            Product not found
          </div>
        )}
        {loading ? (
          <div style={{ margin: "20px ", color: "#333" }}>loading...</div>
        ) : (
          product &&
          filter.keyword !== undefined &&
          filter.keyword !== "" &&
          product.map((item: Product) => {
            return (
              <Link to={`../product/${item._id}`}>
                <Grid
                  container
                  spacing={1}
                  sx={{
                    margin: "10px",
                    background: "#dbf8e6",
                    borderRadius: "5px",
                    alignItems: "center",
                  }}
                >
                  <Grid item md={3} sx={{ padding: "8px" }}>
                    <img src={item.images[0].url} alt={item.name} width="45" />
                  </Grid>
                  <Grid item md={6} sx={{ padding: "8px" }}>
                    {item.name}
                  </Grid>
                  <Grid item md={3} sx={{ padding: "8px" }}>
                    {item.price}.000đ
                  </Grid>
                </Grid>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Search;
