import React from 'react'

const Stat = ({ stat }) => {
  return (
    <div>
      <center><h1>Estadisticas de la categoria</h1></center>
      {stat.map((point) => (
        <div class="card">
          <div class="card-body">
            <center><h4 class="card-title">{point.category}</h4></center>
            <h5>La cantidad de usuarios que han respondido correctamente las preguntas de esta categoria son: {point.amount_user_right}</h5>
            <br/>
            <h5>La cantidad de usuarios que han respondido incorrectamente las preguntas de esta categoria son: {point.amount_user_wrong}</h5>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Stat
