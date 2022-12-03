import React, { Fragment } from 'react'
import "../../styles/layouts/Loader.css"

export const Loader = () => {
    return (
        <Fragment>
            <div id="container">
                <a>
                <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                </a>
            </div>
        </Fragment>
    )
}
