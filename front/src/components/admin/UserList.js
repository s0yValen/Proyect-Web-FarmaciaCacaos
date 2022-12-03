import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers, deleteUser, clearErrors } from '../../actions/userActions'
import { DELETE_USER_RESET } from '../../constants/userConstants'
import { Loader } from '../layout/Loader'

const UsersList = () => {
    const navigate=useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, users } = useSelector(state => state.allUsers);
    const { isDeleted } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(allUsers());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Usuario Eliminado correctamente');
            navigate('/admin/users');
            dispatch({ type: DELETE_USER_RESET })
        }

    }, [dispatch, alert, error, isDeleted])

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'ID Usuario',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Nombre',
                    field: 'nombre',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Rol',
                    field: 'rol',
                    sort: 'asc'
                },
                {
                    label: 'Acciones',
                    field: 'acciones',
                },
            ],
            rows: []
        }

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                nombre: user.nombre,
                email: user.email,
                rol: user.role,

                acciones: <Fragment>
                    <div class="tableBtns">
                        <Link to={`/admin/user/${user._id}`}>
                            <i className="fa fa-pencil"></i>
                        </Link>
                        <Link onClick={() => deleteUserHandler(user._id)}>
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
            <MetaData title={'Usuarios Registrados'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5 titulosD_usuario">Usuarios Registrados</h1>

                        {loading ? <Loader/> : (
                            <div class="Table-viewProducts">
                                <MDBDataTable
                                    data={setUsers()}
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

export default UsersList