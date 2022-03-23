import productApi from "api/productApi";
import Contact from "components/Common/contact/Contact";
import Footer from "components/Common/footer/Footer";
import Header from "components/Common/header/Header";
import { ListResponse, Product } from "models";
import React, { useEffect, useRef } from "react";
import HomeSkeleton from "./components/HomeSkeleton";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import "./home.scss";

type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();
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

  const fetchProductList = async (filter: any) => {
    const res: ListResponse<Product> = await productApi.getAll(filter);
    return res;
  };

  const { isLoading, error, data } = useQuery("products", fetchProductList);

  const handleNavigate = (id: string) => {
    navigate(`product/${id}`);
  };

  if (error) return <div>error</div>;

  return (
    <>
      <Header
        ref={headerRef}
        height="100vh"
        bg="https://new-organic-shop.netlify.app/static/media/hero.823fc1bf37a46977f90e.jpg"
      ></Header>
      <div className="category">
        <div className="category__heading">Category</div>
        <div className="category__wrapper">
          <div className="category__wrapper-block">
            <ul className="category__wrapper-block-list">
              <li className="category__wrapper-block-list-item">
                <div className="category__wrapper-block-list-item-imgBox">
                  <img
                    src="https://new-organic-shop.netlify.app/static/media/grid-vegetable.912ca37a17a77bb5b253.jpg"
                    alt=""
                  />
                </div>
                <span>Vegetable</span>
              </li>
            </ul>
          </div>
          <div className="category__wrapper-block">
            <ul className="category__wrapper-block-list">
              <li className="category__wrapper-block-list-item">
                <div className="category__wrapper-block-list-item-imgBox">
                  <img
                    src="https://new-organic-shop.netlify.app/static/media/grid-fruit.609ab3c2712494b6dfa0.jpg"
                    alt=""
                  />
                </div>

                <span>Fruit</span>
              </li>
            </ul>
          </div>
          <div className="category__wrapper-block">
            <ul className="category__wrapper-block-list">
              <li className="category__wrapper-block-list-item">
                <div className="category__wrapper-block-list-item-imgBox">
                  <img
                    src="https://new-organic-shop.netlify.app/static/media/grid-meat.3d687798dc0aa475a7a7.jpg"
                    alt=""
                  />
                </div>
                <span>Meat</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="newProduct">
        <div className="newProduct__heading">New Products</div>
        <div className="newProduct__wrapper">
          {isLoading && <HomeSkeleton></HomeSkeleton>}
          {data &&
            data.products.map((item: Product) => {
              return (
                <>
                  <div
                    key={item._id}
                    className="newProduct__wrapper-block"
                    onClick={() => handleNavigate(item._id)}
                  >
                    <div className="newProduct__wrapper-block-img">
                      <img src={item.images[0].url} alt="" />
                    </div>
                    <div className="newProduct__wrapper-block-name">
                      {item.name}
                    </div>
                    <div className="newProduct__wrapper-block-price">
                      {item.price}.000đ/kg
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
      <Contact></Contact>
      <Footer></Footer>
    </>
  );
};

export default Home;
