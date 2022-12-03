import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allOrders, deleteOrder, clearErrors } from '../../actions/orderActions'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'
import { Loader } from '../layout/Loader'

const OrdersList = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Orden eliminada correctamente');
            navigate('/orderList');
            dispatch({ type: DELETE_ORDER_RESET })
        }

    }, [dispatch, alert, error, isDeleted])


    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Fecha',
                    field: 'fecha',
                    sort: 'asc'
                },
                {
                    label: 'No. Orden',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: '# Items',
                    field: 'numItems',
                    sort: 'asc'
                },
                {
                    label: 'Valor Total',
                    field: 'valorTotal',
                    sort: 'asc'
                },
                {
                    label: 'Estado',
                    field: 'estado',
                    sort: 'asc'
                },
                {
                    label: 'Acciones',
                    field: 'acciones',
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            var fecha = new Date(order.fechaCreacion).toLocaleDateString()
            data.rows.push({
                fecha: fecha,
                id: order._id,
                numItems: order.items.length,
                valorTotal: `$${order.precioTotal}`,
                estado: order.estado && String(order.estado).includes('Entregado')
                    ? <p style={{ color: 'green' }}>{order.estado}</p>
                    : <p style={{ color: 'red' }}>{order.estado}</p>,
                acciones: <Fragment>
                    <div class="tableBtns">
                        <Link to={`/admin/order/${order._id}`}>
                            <i className="fa fa-eye"></i>
                        </Link>
                        <Link onClick={() => deleteOrderHandler(order._id)}>
                            <i className="fa fa-trash"></i>
                        </Link>
                    </div>
                </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <MetaData title={'Todos los Pedidos'} />
                <div className="row">
                    <div className="col-12 col-md-2">
                        <Sidebar />
                    </div>

                    <div className="col-12 col-md-10">
                        <Fragment>
                            <h1 className="my-5 titulosD_usuario">Todos los pedidos</h1>

                            {loading ? <Loader/> : (
                                <div class="Table-viewProducts">
                                    <MDBDataTable
                                        data={setOrders()}
                                        className="px-3"
                                        noBottomColumns={true}
                                        bordered
                                        striped
                                        hover
                                    />
                                </div>
                            )}

                        </Fragment>
                    </div>
                </div>
        </Fragment>
    )
}

export default OrdersList