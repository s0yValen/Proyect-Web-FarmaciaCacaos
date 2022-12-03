import React, { Fragment, useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  newReview,
  clearErrors,
} from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import ListReviews from "../order/ListReviews";
import "../../styles/products/ProductAll.css";
import { Loader } from "../layout/Loader";

export const ProductDetails = () => {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comentario, setComentario] = useState("");
  const [sliderData, setSliderData] = useState(element);

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  console.log("product:", product);
  const { user } = useSelector((state) => state.auth);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );

  useEffect(() => {
    dispatch(getProductDetails(params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Opinion registrada correctamente");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, alert, error, reviewError, params.id, success]);

  const increaseQty = () => {
    const contador = document.querySelector(".count");

    if (contador.valueAsNumber >= product.inventario) return;

    const qty = contador.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const contador = document.querySelector(".count");

    if (contador.valueAsNumber <= 1) return;

    const qty = contador.valueAsNumber - 1;
    setQuantity(qty);
  };

  const addToCart = () => {
    dispatch(addItemToCart(params.id, quantity));
    alert.success("Producto agregado al carro");
  };

  function setUserRatings() {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");

            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }
  const reviewHandler = () => {
    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comentario", comentario);
    formData.set("idProducto", params.id);

    dispatch(newReview(formData));
  };

  let element = [];
  let noEl;

  product.imagen &&
    product.imagen.map((e, i) => {
      i === 0 ? (element = e.url) : (noEl = "");
      return element;
    });

  const handleCLick = (index) => {
    const slider = product.imagen[index];
    setSliderData(slider.url);
  };

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={product.nombre}></MetaData>
          <div className="containerCardMain">
            <div key={product.id} className="cardLeft">
              <div className="imageContainer">
                <img src={sliderData || element} />
              </div>
              <div className="imagensCarousel">
                {product.imagen &&
                  product.imagen.map((img, index) => (
                    <img
                      key={img.nombre}
                      className="imgContainer"
                      src={img.url}
                      onClick={() => handleCLick(index)}
                      alt={product.nombre}
                    ></img>
                  ))}
              </div>
            </div>
            <div className=" cardRigth">
              <div className="container rigthOne">
                <div className="nameProduct">
                  <h1 className="titlteMain ">{product.nombre}</h1>
                </div>
                <h2 className="productDesciption">{product.descripcion}</h2>

                <h3 className="priceProductMain hprice">${product.precio}</h3>
                <br />
                <h2 className="seller">
                  Categoría:{" "}
                  <span className="sellerName">{product.categoria} </span>{" "}
                </h2>
                <h2 className="seller">
                  Vendedor:{" "}
                  <span className="sellerName">{product.vendedor} </span>{" "}
                </h2>
                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(product.calificacion / 5) * 100}%` }}
                  ></div>
                </div>
                <p className="noOpiniones">{product.numCalificaciones} Reviews</p>
              </div>
              <div className="row rigthTwo">
                <div
                  style={{ width: "30vw", backgroundColor: "white" }}
                  className="stockCounter justify-content-around contador"
                >
                  <button
                    className="btn col-sm-2 btn-menos d-inline"
                    onClick={decreaseQty}
                  >
                    <img
                      class="arrow-left"
                      src="../images/arrow.png"
                      style={{ width: "1.5vw", cursor: "pointer" }}
                    />
                  </button>
                  <input
                    type="number"
                    className="col-sm-8 form-control count d-inline input-operacion"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="btn col-sm-2 btn-suma d-inline"
                    onClick={increaseQty}
                  >
                    <img
                      class=""
                      src="../images/arrow.png"
                      style={{ width: "1.5vw", cursor: "pointer" }}
                    />
                  </button>
                </div>
                <div className="containerButon">
                  <button disabled={product.inventario === 0} onClick={addToCart}>
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opinionsContainer">
            <div>
              {user ? (
                <button
                  id="btn_review"
                  type="button"
                  className="botonesD_usuario"
                  data-toggle="modal"
                  data-target="#ratingModal"
                  onClick={setUserRatings}
                  style={{
                    width: "97%",
                    height: "5vh",
                    margin: "1vw",
                    fontSize: "1vw",
                  }}
                >
                  Deja tu Opinión{" "}
                  <i class="fa fa-mouse-pointer" aria-hidden="true"></i>
                </button>
              ) : (
                <div className="alert alert-danger mt-5" type="alert">
                  Inicia Sesión para dejar tu review
                </div>
              )}
            </div>
            <div className="opinionesAll">
              {product.opiniones && product.opiniones.length > 0 && (
                <ListReviews opiniones={product.opiniones} />
              )}
            </div>
          </div>
          {/*Mensaje emergente para dejar opinion y calificacion */}
          <div>
            <div className="row mt-2 mb-5">
              <div className="rating w-50">
                <div
                  className="modal fade"
                  id="ratingModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="ratingModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="titulosD_usuario" id="ratingModalLabel">
                          Enviar Review
                        </h5>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <ul className="stars ">
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                        </ul>

                        <textarea
                          name="review"
                          id="review"
                          className="form-control mt3"
                          value={comentario}
                          onChange={(e) => setComentario(e.target.value)}
                        ></textarea>

                        <button
                          className="botonesD_usuario btn my-3 float-right review-btn px-4 text-white"
                          onClick={reviewHandler}
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          Enviar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
