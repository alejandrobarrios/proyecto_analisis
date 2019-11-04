import React from 'react'
const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 3,
            width: 1000
        }}
    />
);
const Questi = ({ qu }) => {
  return (
    <div className="arr2">
      <center><h4>Preguntas de la categoría</h4></center>
      {qu.map((point) => (
        <div>
          <div class="card-body">
            <h5>ID: {point.id} | -  Pregunta: {point.description}</h5>
          </div>
          <ColoredLine color="white" />
        </div>
      ))}
    </div>
  )
};

export default Questi
