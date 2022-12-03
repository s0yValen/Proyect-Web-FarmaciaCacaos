import React, { Fragment } from 'react'
import "../../App.css"
import { Link } from "react-router-dom"
import { Search } from './Search'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from "../../actions/userActions"
import { Logger } from './Logger'
import "../../styles/layouts/Header.css"

const Header = () => {
    const { cartItems } = useSelector(state => state.cart)

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth)

    const logoutHandler = () => {
        dispatch(logout());
        alert.success("LogOut exitoso")
    }
    return (
        // <Fragment>
        //     <nav className='navbar row'>
        //         <div className='col-12 col-md-3'>
        //             <div className='navbar-brand'>
        //                 <Link to="/" ><img src="../images/cacaoscompany.png" alt="Cacaos Farmacy Logo"></img></Link>
        //             </div>
        //         </div>

        //         <div className='col-12 col-md-5 mt-2 mt-md-0'>
        //             {/*Aqui va buscar*/}
        //             <Search />
        //         </div>
        //         {/*Boton inicio sesión*/}
        //         <div className="col-12 col-md-4 mt-4 mt-md-0 text-center">
        //             <Link to="/carrito"><i class="fa fa-shopping-cart fa-2x text-white" aria-hidden="false"></i>
        //                 <span className="ml-1" id="cart_count">{cartItems.length}</span></Link>

        //             {user ? (
        //                 <div className="ml-4 dropdown d-inline">
        //                     <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button"
        //                         id="dropDownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //                         <figure className='avatar avatar-nav'>
        //                             <img
        //                                 src={user.avatar && user.avatar.url}
        //                                 alt={user && user.nombre}
        //                                 className="rounded-circle"></img>
        //                         </figure>
        //                         <span>{user && user.nombre}</span>
        //                     </Link>
        //                     <div className='dropdown-menu' aria-labelledby='dropDownMenu'>
        //                         {/*Preguntamos el rol de quien esta online*/}
        //                         {user && user.role === "admin" && (
        //                             <Link className="dropdown-item" to="/dashboard">Adm. Productos</Link>
        //                         )}

        //                         <Link className="dropdown-item" to="/">Pedidos</Link>
        //                         <Link className="dropdown-item" to="/yo">Mi Perfil</Link>
        //                         <Link className="dropdown-item" to="/" onClick={logoutHandler}>Cerrar Sesion</Link>
        //                     </div>
        //                 </div>
        //             ) : !loading && <Link to="/login" className='btn ml-4' id="login_btn">Login</Link>}
        //             {/* // ) : !loading && <Logger/>} */}


        //         </div>

        //     </nav>

        // </Fragment>

        <Fragment>
            <header class="Rectangle-1">
                <Link to={'/'}><img class="logo-1" src="../images/cacaoscompany.png" alt=""></img></Link>

                <Search />

                <Link to={'/carrito'} class="carrito"><div>
                    <img class="img-carrito" src="../images/carrito.png" alt="" />
                </div></Link>

                {user ? (
                    // <Fragment>
                        // <div className="ml-4 dropdown d-inline">
                        //     <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button"
                        //         id="dropDownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        //         <figure className='avatar avatar-nav'>
                        //             <img
                        //                 src={user.avatar && user.avatar.url}
                        //                 alt={user && user.nombre}
                        //                 className="rounded-circle"></img>
                        //         </figure>
                        //         <span>{user && user.nombre}</span>
                        //     </Link>
                        //     <div className='dropdown-menu' aria-labelledby='dropDownMenu'>
                        //         {/*Preguntamos el rol de quien esta online*/}
                        //         {user && user.role === "admin" && (
                        //             <Link className="dropdown-item" to="/dashboard">Adm. Productos</Link>
                        //         )}

                        //         <Link className="dropdown-item" to="/">Pedidos</Link>
                        //         <Link className="dropdown-item" to="/yo">Mi Perfil</Link>
                        //         <Link className="dropdown-item" to="/" onClick={logoutHandler}>Cerrar Sesion</Link>
                        //     </div>
                        // </div>


                        <nav class="MFnav">
                            <label class="MFLabel" for="touch">
                                <img class="MFLogged" src={user.avatar && user.avatar.url} alt={user && user.nombre}/>
                                <p>{user && user.nombre}</p>
                                </label>
                            <input type="checkbox" id="touch"></input>
                            <ul class="slide">
                                {/*Preguntamos el rol de quien esta online*/}
                                {user && user.role === "admin" && (
                                    <li><Link to="/dashboard"><button class="loggedbtn">Administración</button></Link></li>
                                )}
                                <li><Link to="/myOrders"><button class="loggedbtn">Pedidos</button></Link></li>
                                <li><Link to="/yo"><button class="loggedbtn">Mi perfil</button></Link></li>
                                <li><Link to="/" onClick={logoutHandler}><button class="loggedbtn lastloggedbtn">Cerrar sesión</button></Link></li>
                            </ul>
                        </nav>
                    // </Fragment>
                ) : !loading && <Logger />}

                {/* <Logger /> */}
            </header>
        </Fragment>
    )

}

export default Header
