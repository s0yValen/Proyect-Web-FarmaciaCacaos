import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login, clearErrors } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

export const Logger = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isAuthenticated, error } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
        if (error) {
            dispatch(clearErrors);
        }
    }, [dispatch, isAuthenticated, error])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <Fragment>
            <nav class="MFnav"> 
                <label for="touch"><span><img class="MFLogin" src="../images/usuarios.png" alt=""></img></span></label>
                <input type="checkbox" id="touch"></input>
                <ul class="slide">
                    <form onSubmit={submitHandler}>
                        <li class="text-menu">Correo Electronico:</li>
                        <li><input type="email" class="input-menu" value={email} onChange={(e) => setEmail(e.target.value)}></input></li>
                        <li class="text-menu">Contraseña:</li>
                        <li><input type="password" class="input-menu" value={password} onChange={(e) => setPassword(e.target.value)}></input></li>
                        <li><button class="salir">Ingresar</button></li>
                    </form>
                    <li class="registro">¿Olvidaste tu contraseña?</li>
                    <li class="registrate"><Link to={'/password/forgot'}>Recuperar Contraseña</Link></li>
                    <li class="registro">¿Aun no estas registrado?</li>
                    <li class="registrate"><Link to={'/register'}>Registrate</Link></li>
                </ul>
            </nav>
        </Fragment>
    )
}
