import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import "../../styles/cart/CartSuccess.scss"

export const Success = () => {
    return (
        <Fragment>

            <MetaData title={'Order Success'} />

            <div class="success-checkmark">
                <div class="check-icon">
                    <span class="icon-line line-tip"></span>
                    <span class="icon-line line-long"></span>
                    <div class="icon-circle"></div>
                    <div class="icon-fix"></div>
                </div>
            </div>

            <div class="successText">
                <p class='total-title'>Su orden ha sido registrada con éxito, <span>pronto estaremos en contacto</span></p>
                <div class="containerButon">
                <Link to="/"><button>Volver al inicio</button></Link>
                </div>
            </div>

        </Fragment>
    )
}