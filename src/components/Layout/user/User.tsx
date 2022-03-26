import { useAppSelector } from "app/hooks";
import Cart from "features/client/cart/Cart";
import CheckOut from "features/client/checkout/CheckOut";
import Contact from "features/client/contact/Contact";
import Home from "features/client/Home/Home";
import DetailProduct from "features/client/product/pages/detailProduct/DetailProduct";
import ListProduct from "features/client/product/pages/listProduct/ListProduct";
import Blog from "features/client/blog/Blog";
import React from "react";
import { Route, Routes } from "react-router-dom";

type Props = {};

const UserLayout = (props: Props) => {
  const cart = useAppSelector((state) => state.cart.cartItems);
  let count = 0;

  cart.forEach((item) => (count += item.quantity));
  return (
    <>
      {/* <Header></Header> */}
      <Routes>
        {/* <Route element={<ProtectedRoute></ProtectedRoute>}> */}
        {/* product */}
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/shop" element={<ListProduct></ListProduct>}></Route>
        {/* contact */}
        <Route path="/contact" element={<Contact></Contact>}></Route>
        {/* blog */}
        <Route path="/blog" element={<Blog></Blog>}></Route>
        {/* checkout */}
        <Route path="/checkout" element={<CheckOut></CheckOut>}></Route>
        <Route
          path="/product/:id"
          element={<DetailProduct></DetailProduct>}
        ></Route>
        {/* cart */}
        <Route path="/cart" element={<Cart></Cart>}></Route>
        {/* </Route> */}
      </Routes>
    </>
  );
};

export default UserLayout;
