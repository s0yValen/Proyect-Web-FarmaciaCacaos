import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import '../../styles/admin/Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProducts } from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'
import { allUsers } from '../../actions/userActions'
import { Loader } from '../layout/Loader';

export const Dashboard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { orders, cantidadTotal, loading } = useSelector(state => state.allOrders)

    let outOfStock = 0;
    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })

    useEffect(() => {
        dispatch(getAdminProducts())
        dispatch(allOrders())
        dispatch(allUsers())
    }, [dispatch])

    return (
        <Fragment>

            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4 titulosD_usuario">Administración</h1>
                    {loading ? <Loader /> : (
                        <Fragment>
                            <MetaData title={'Administracion'} />

                            <div className="row pr-4 cards-u">
                                <div className="col-xl-2 col-sm-6 mb-3">
                                    <div className="card text-white card-u-1">
                                        <div className="card-body info-cards">
                                            <div className="text-center card-font-size">{products && products.length}<br /> <b class="text-u-1">Productos</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/ProductList">
                                            <span className="float-left">Ver Detalles</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-2 col-sm-6 mb-3">
                                    <div className="card text-white card-u-2">
                                        <div className="card-body info-cards">
                                            <div className="text-center card-font-size">{orders && orders.length}<br /> <b class="text-u-2">Pedidos</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/orderList">
                                            <span className="float-left">Ver Detalles</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-2 col-sm-6 mb-3">
                                    <div className="card text-white card-u-3">
                                        <div className="card-body info-cards">
                                            <div className="text-center card-font-size">{users && users.length}<br /> <b class="text-u-3">Usuarios</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/admin/users">
                                            <span className="float-left">Ver Detalles</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-xl-2 col-sm-6 mb-3">
                                    <div className="card text-white card-u-4">
                                        <div className="card-body info-cards out-of-stock">
                                            <div className="text-center card-font-size">{outOfStock}<br /> <b class="text-u-4">Agotados</b></div>
                                        </div>
                                    </div>
                                </div>




                            </div>
                            <div className="row pr-4 cards-u">
                                <div className="col-xl-4 col-sm-6 mb-3 ">
                                    <div className="card text-white card-u-5">
                                        <div className="card-body info-cards">
                                            <div className="text-center card-font-size">${cantidadTotal && cantidadTotal.toFixed(2)}<br /> <b class="text-u-5">Ventas Totales</b></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>

                    )}
                </div>
            </div>

        </Fragment >
    )
}





export default Dashboard