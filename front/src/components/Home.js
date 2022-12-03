import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import { useParams, Link, Routes, Route } from "react-router-dom";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import { BannerHome } from "./layout/BannerHome";
import "../styles/Home.css";
import "../styles/products/ProductAll.css";
import { Loader } from "./layout/Loader";

export const Home = () => {
  const params = useParams();
  const keyword = params.keyword;
  const [precio, setPrecio] = useState([100, 1000000]);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, products, error, resPerPage, productsCount } = useSelector(
    (state) => state.products
  );
  console.log("products: ", products);
  const alert = useAlert();

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }

    dispatch(getProducts(currentPage, keyword, precio));
  }, [dispatch, alert, error, currentPage, keyword, precio]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const pause = [];

  return (
    <>{loading ? <Loader/> : (
      <div className="Home">
      <BannerHome/>
        {products.map(
          (product) => (
            pause.push(product.id),
            (
              <div key={product.id} className="tarjetaProduct">
                <div className="da-card" id={product._id}>
                  <Link to={`/producto/${product._id}`}>
                    <img src={product.imagen[0].url}></img>
                  </Link>
                </div>
                <hr className="hr" />
                <div key={product.id}>
                  <h3 className="productName">{product.nombre}</h3>
                </div>
                <div className="priceProduct">${product.precio}</div>

                <div className="butonAgregar">
                  <Link to={`/producto/${product._id}`}>
                    <button>Ver Detalles</button>
                  </Link>
                </div>
              </div>
            )
          )
        )}
      </div>)}
      {pause.length >= 1 ? (
        <div className="pagination mainPag">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={productsCount}
            onChange={setCurrentPageNo}
            nextPageText={"Siguiente"}
            prevPageText={"Anterior"}
            firstPageText={"Primera"}
            lastPageText={"Ultima"}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      ) : (
        console.log("first")
      )}
    </>
  );
};
export default Home;
