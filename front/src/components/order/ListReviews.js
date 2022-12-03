import React from 'react'
import "../../styles/order/Reviews.css"

const ListReviews = ({ opiniones }) => {
    return (
        <div class="reviews">
            <h3 className='titulosD_usuario' style={{margin:"0"}}>Opiniones de Otros clientes:</h3>
            <hr />
            {opiniones && opiniones.map(opinion => (
                <div key={opinion._id} class="review-card my-3">
                    <div class="rating-outer" style={{margin:"0"}}>
                        <div class="rating-inner" style={{ width: `${(opinion.rating / 5) * 100}%`, margin:"0" }}></div>
                    </div>
                    <p class="review_user" style={{marginTop:"0.5vw"}}>Por: {opinion.nombreCliente}</p>
                    <p class="review_comment">{opinion.comentario}</p>

                    <hr />
                </div>
            ))}
        </div>
    )
}

export default ListReviews