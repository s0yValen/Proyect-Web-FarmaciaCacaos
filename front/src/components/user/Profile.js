import React, { Fragment } from 'react'
import MetaData from '../layout/MetaData'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import "../../styles/users/StylesUsuarios.css"
import { Loader } from '../layout/Loader'

export const Profile = () => {

    const { user, loading } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
                    <MetaData title={"Mi perfil"} />
                    <div class="wholeProfile">
                        <div class="prfTitle">
                            <img src="../images/usericon.png"/>
                            <p>Mi perfil</p>
                        </div>
                            <img class="prfPicture" src={user.avatar.url} alt={user.nombre} />
                        <div class="prfInfoNEdit">
                            <div class="prfInfo">
                                <p class="prfSubtitle">Nombre Completo:</p>
                                <p class="prfSubInfo">{user.nombre}</p>
                                <p class="prfSubtitle">Email:</p>
                                <p class="prfSubInfo">{user.email}</p>
                                <p class="prfSubtitle">Fecha de Registro:</p>
                                <p class="prfSubInfo prfSubInfoLast">{String(user.fechaRegistro).substring(0, 10)}</p>
                            </div>
                            <div class="prfEdit">
                                <Link to="/yo/update"><button>Editar Perfil</button></Link>
                                <br class="prfLineJump"/>
                                <Link to="/password/update"><button>Cambiar contraseña</button></Link>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}
