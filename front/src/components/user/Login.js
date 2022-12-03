import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { Link, useNavigate } from "react-router-dom"
import { login, clearErrors } from "../../actions/userActions"
import { useDispatch, useSelector } from 'react-redux'
import "../../styles/users/StylesUsuarios.css"
import { Loader } from '../layout/Loader'

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const { isAuthenticated, error, loading } = useSelector(state => state.auth)

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/")
        }
        if (error) {
            dispatch(clearErrors)
        }
    }, [dispatch, isAuthenticated, error])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
                    <MetaData title={"Inicie Sesión"} />
                    <div className='row wrapper container-register'>
                        <div className='col-10 col-lg-5'>
                            <form className='shadow-lg cuadrosD_usuarios'  onSubmit={submitHandler}>
                                <h1 className='mb-3 titulosD_usuario'>Inicio de Sesión</h1>
                                {/*Campo para email*/}
                                <div className='form-group'>
                                    <label htmlFor='email_field'>Correo electrónico</label>
                                    <input type="email"
                                        id="email_field"
                                        className='form-control inputsD_usuarios'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}></input>
                                </div>
                                {/*Campo para contraseña*/}
                                <div className='form-group'>
                                    <label htmlFor='password_field'>Contraseña</label>
                                    <input type="password"
                                        id="password_field"
                                        className='form-control inputsD_usuarios'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    ></input>
                                </div>

                                <Link to="/password/forgot" className='float-right mb-2 textosD_usuarios'>¿Olvidó su contraseña?</Link>

                                {/*Boton iniciar sesiòn*/}
                                <button id="login_button" type="submit" className=' btn-block py-3 botonesD_usuario'>INGRESAR</button>

                                <Link to="/register" className='float-right mt-3'>¿Usuario nuevo? Registrate</Link>

                            </form>
                        </div>
                    </div>

                </Fragment>
            )}
        </Fragment>
    )
}
