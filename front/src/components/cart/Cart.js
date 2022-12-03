import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addItemToCart, removeItemFromCart, removeAllItems } from '../../actions/cartActions'
import MetaData from '../layout/MetaData'
import "../../styles/cart/Cart.css"
import { Loader } from '../layout/Loader'


const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart)
    const { user, loading } = useSelector(state => state.auth)

    const increaseQty = (id, quantity, inventario) => {
        const newQty = quantity + 1;
        if (newQty > inventario) return;
        dispatch(addItemToCart(id, newQty))
    }

    const decreaseQty = (id, quantity) => {
        const newQty = quantity - 1;
        if (newQty <= 0) return;
        dispatch(addItemToCart(id, newQty))
    }

    const checkOutHandler = () => {
        if (user) {
            navigate("/shipping")
        }
        else {
            navigate("/login")
        }
    }

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }

    const removeAllItemsHandler = () => {
        dispatch(removeAllItems())
        window.location.reload();
    }

    return (
        <Fragment>
            <MetaData title={'Mi carrito'} />
            {loading ? <Loader /> : (
                <div class="whole-cart">
                    <div class="title-n-trashcan">
                        <div class="title">
                            <img class="cart-icon" src="../images/carrito.png" />
                            <p>Carrito de Compras</p>
                        </div>
                        <button href="#" class="trashcan" disabled={cartItems.length === 0} onClick={() => removeAllItemsHandler()}><div>
                            <img src="../../images/trashcan.png" />
                        </div></button>
                    </div>

                    <div class="total-box">
                        <div class="total">
                            <p class="total-title">Productos: <span> {cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)}</span></p>
                            <hr class="h-lines" />
                            <p class="total-title">Total estimado a<span> Pagar:</span></p>
                            <p class="total-number">${cartItems.reduce((acc, item) => acc + (item.quantity * item.precio), 0).toFixed(2)}</p>
                        </div>
                        <button class="pay-btn" href='#' disabled={cartItems.length === 0} onClick={checkOutHandler}><div>Pagar</div></button>
                    </div>
                    {cartItems.length === 0 ? <p class="total-title empty-cart-text">Tu carrito está vacío, <Link to={'/'} class="start-to-fill"><span> Comienza a llenarlo!</span></Link></p> : (
                        <Fragment>
                            {cartItems && cartItems.map(item => (
                                <Fragment>
                                    <div key={item.nombre} class="product-card">
                                        <img class="product-img card-element" src={item.imagen} alt={item.nombre} />
                                        <hr className='lines card-element' />
                                        <div class="name card-element">
                                            <p><Link to={`/producto/${item.product}`}>{item.nombre}</Link></p>
                                        </div>
                                        <hr class='lines card-element' />
                                        <div class="name card-element product-price">
                                            <p>${item.precio}</p>
                                        </div>
                                        <hr class='lines card-element' />
                                        <div class="quantity card-element">
                                            <img class="arrow-left" src="../images/arrow.png" onClick={() => decreaseQty(item.product, item.quantity)} />
                                            <input class="number" readOnly value={item.quantity} />
                                            <img class="" src="../images/arrow.png" onClick={() => increaseQty(item.product, item.quantity, item.inventario)} />
                                        </div>
                                        <hr className='lines card-element' />
                                        <a href="#" class="card-trashcan card-element"><div>
                                            <img src="../../images/trashcan.png" onClick={() => removeCartItemHandler(item.product)} />
                                        </div></a>
                                    </div>
                                </Fragment>
                            ))}
                        </Fragment>
                    )}
                </div>
            )}
        </Fragment>
    )
}

export default Cart