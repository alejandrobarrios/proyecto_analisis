import React from 'react';
import "./App.css";

const StatCat = ({ statCat }) => {
  return (
    <div className="card-body">
      <center><h1>Estadisticas de la categoria</h1></center>
      {statCat.map((point) => (
        <div className="card">
          <div className="card-body">
            <center><h4 class="card-title">{point.category}</h4></center>
            <h5 >La cantidad de usuarios que han respondido correctamente las preguntas de esta categoria son: {point.amount_user_right}</h5>
            <br/>
            <h5 >La cantidad de usuarios que han respondido incorrectamente las preguntas de esta categoria son: {point.amount_user_wrong}</h5>
          </div>
        </div>
      ))}
    </div>
  )
};

export default StatCat
