import React, {Component } from 'react';
import "./App.css";


export default class loadQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category:'',
      description:'',
      option1:'',
      option2:'',
      option3:'',
      option4:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogQuestion = this.handleLogQuestion.bind(this);
  }


  handleChange (event) {
    //this.setState({value: event.target.value});

    this.setState({
      [event.target.name] : event.target.value
    });

  }

  handleLogQuestion (event) {
    //console.log(this.state);
    //this.props.addUser(this.state.firstName, this.state.lastName);//ejecuto addUser que pase desde App

    event.preventDefault();
    //doSomethingWithEvent(event);

    fetch('http://localhost:4567/admin/questions', {

      method: 'POST',
      body: JSON.stringify({
        category: this.state.category,
        description: this.state.description,
        options:[{description: this.state.option1, correct: true},
                {description: this.state.option2, correct: false},
                {description: this.state.option3, correct: false},
                {description: this.state.option4, correct: false},
        ]
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response =>
      alert(' se pudo encontrar' + this.state.username ))
    .catch((error) => {
      alert('No se pudo encontrar' + this.state.username );

      });


    }

  onSubmit =(event) =>{

    //para no refrescar el formulario cada vez que presiono el boton
    console.log(this.state);
    event.preventDefault();


  }


  render() {
    return (
      <div>
      <h2>Dar Permiso</h2>
      <form onSubmit={this.handleLogQuestion}>

      <br/>
        <label>
          Categoria a la cual pertenece la pregunta:
          <input type="text" name="category"  value={this.state.category} onChange={this.handleChange} />
        </label>
      <br/>
        <label>
          Descripcion de la pregunta:
          <input type="text" name="description"  value={this.state.description} onChange={this.handleChange} />
        </label>
      <br/>
        <label>
          Opcion la cual sera la correcta:
          <input type="text" name="option1"  value={this.state.option1} onChange={this.handleChange} />
        </label>
      <br/>
        <label>
          Otra opcion:
          <input type="text" name="option2"  value={this.state.option2} onChange={this.handleChange} />
        </label>
      <br/>
        <label>
          Otra opcion:
          <input type="text" name="option3"  value={this.state.option3} onChange={this.handleChange} />
        </label>
      <br/>
        <label>
          Otra opcion:
          <input type="text" name="option4"  value={this.state.option4} onChange={this.handleChange} />
        </label>
      <br/>

      <input type="submit" value="cargar" />
      </form>
      </div>
    );
  }
}
