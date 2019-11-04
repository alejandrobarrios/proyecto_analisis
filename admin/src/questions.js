import React from 'react'

const Questi = ({ qu }) => {
  return (
    <div>
      <center><h1>Preguntas de la categoria</h1></center>
      {qu.map((point) => (
        <div class="card">
          <div class="card-body">
            <h5>El id de la pregunta es: {point.id}</h5>
            <br/>
            <h5>La pregunta es: {point.description}</h5>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Questi
