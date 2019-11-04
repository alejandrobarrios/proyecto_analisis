import React from 'react'

const StatQu = ({ statQues }) => {
  return (
    <div>
      <center><h1>Preguntas de la categoria</h1></center>
      {statQues.map((point) => (
        <div class="card">
          <div class="card-body">
            <h5>La pregunta es: {point.description}</h5>
            <br/>
            <h5>La cantidad de usuarios que han respondido correctamente esta pregunta son: {point.amount_user_right}</h5>
            <br/>
            <h5>La cantidad de usuarios que han respondido incorrectamente esta pregunta son: {point.amount_user_wrong}</h5>
          </div>
        </div>
      ))}
    </div>
  )
};

export default StatQu
