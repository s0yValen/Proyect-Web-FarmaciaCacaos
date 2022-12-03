import React, { Fragment } from 'react'
import "../../styles/layouts/BannerHome.css"

export function BannerHome(params) {
  return (
    <Fragment>
      <div className="bannerContainer" >
        <div className='imagenContainer'>
          <img src="../images/banner-home.png" style={{ width: "100%" }}></img>
        </div>
      </div>
    </Fragment>

  )
}
