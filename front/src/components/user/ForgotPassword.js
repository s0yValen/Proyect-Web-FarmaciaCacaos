import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearErrors } from '../../actions/userActions'

export const ForgotPassword = () => {

    const [email, setEmail] = useState('')
    const alert = useAlert();
    const dispatch = useDispatch();
    const { error, loading, message } = useSelector(state => state.forgotPassword)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message)
        }

    }, [dispatch, alert, error, message])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email);
        alert.success('revisa tu correo')

        dispatch(forgotPassword(formData))
    }

    return (
        <Fragment>
            <MetaData title={'Olvide mi contraseña'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg cuadrosD_usuarios" onSubmit={submitHandler}>
                        <h1 className="mb-3 titulosD_usuario">Olvide mi contraseña</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Email registrado</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control inputsD_usuarios"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn-block py-3 botonesD_usuario"
                            disabled={loading ? true : false} >
                            RECUPERAR CONTRASEÑA
                    </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default ForgotPassword