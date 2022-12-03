import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useDispatch, useSelector } from 'react-redux'
import { getProductReviews, deleteReview, clearErrors } from '../../actions/productActions'
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'
import { Loader } from '../layout/Loader'

const ProductReviews = () => {

    const [productId, setProductId] = useState('')

    const dispatch = useDispatch();

    const { error, opiniones } = useSelector(state => state.productReviews);
    const { isDeleted, error: deleteError } = useSelector(state => state.review)

    useEffect(() => {

        if (error) {
            dispatch(clearErrors())
        }

        if (deleteError) {
            dispatch(clearErrors())
        }

        if (productId !== '') {
            dispatch(getProductReviews(productId))
        }

        if (isDeleted) {
            dispatch({ type: DELETE_REVIEW_RESET })
        }



    }, [dispatch, error, productId, isDeleted, deleteError])

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(productId, id))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductReviews(productId))
    }

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comentario',
                    field: 'comentario',
                    sort: 'asc'
                },
                {
                    label: 'Usuario',
                    field: 'usuario',
                    sort: 'asc'
                },
                {
                    label: 'Acciones',
                    field: 'acciones',
                },
            ],
            rows: []
        }

        opiniones.forEach(opinion => {
            data.rows.push({
                rating: opinion.rating,
                comentario: opinion.comentario,
                usuario: opinion.nombreCliente,

                acciones:
                    <div class="tableBtns">
                        <Link onClick={() => deleteReviewHandler(opinion._id)}>
                            <i className="fa fa-trash"></i>
                        </Link>
                    </div>
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'Opiniones por producto'} />

            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="row justify-content-center mt-5">
                            <div className="col-5">
                                <form onSubmit={submitHandler}>
                                    <div className="form-group">
                                        <h2 className="my-5 titulosD_usuario" htmlFor="productId_field">Ingrese el ID del producto</h2>
                                        <input
                                            type="text"
                                            id="productId_field"
                                            className="form-control inputsD_usuarios"
                                            value={productId}
                                            onChange={(e) => setProductId(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        id="search_button"
                                        type="submit"
                                        className="btn-block py-2 botonesD_usuario searchReviewsBtn"
                                    >
                                        BUSCAR
                                    </button>
                                </ form>
                            </div>

                        </div>
                        
                            { opiniones && opiniones.length > 0 ? (
                                
                                <div class="Table-viewProducts">
                                    <MDBDataTable
                                        data={setReviews()}
                                        className="px-3"
                                        noBottomColumns={true}
                                        bordered
                                        striped
                                        hover
                                    />
                                </div>
                                
                            ) : (
                                <p className="mt-5 text-center"></p>
                            )}
                        


                    </Fragment>
                </div>
            </div>


        </Fragment>
    )
}

export default ProductReviews