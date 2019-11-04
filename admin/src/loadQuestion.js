import React, {Component } from 'react';
import "./App.css";
import {Redirect} from 'react-router-dom';
import { Button} from 'react-bootstrap';


export default class loadQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category:'',
      description:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogQuestion = this.handleLogQuestion.bind(this);
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to= "/home" />
    }
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
    .then(response =>{
      alert(' Se ha cargado correctamente la pregunta en: ' + this.state.category )
    })
    .catch((error) => {
      console.log(error);
      alert('No se pudo cargar la pregunta, verifica todo los campos')

      })
    }

  onSubmit =(event) =>{

    //para no refrescar el formulario cada vez que presiono el boton
    console.log(this.state);
    event.preventDefault();


  }


  render() {

    return (
      <div className="App-header">
      {this.renderRedirect()}
      <h2>Carga de pregunta</h2>
      <div>
        <form onSubmit={this.handleLogQuestion}>

        <br/>
          <label className="button">
            Categoría de la pregunta:
            <input className="box" type="text" name="category"  value={this.state.category} onChange={this.handleChange} />
          </label>
        <br/>
          <label className="button">
            Descripción de la pregunta:
            <input className="box" type="text" name="description"  value={this.state.description} onChange={this.handleChange} />
          </label>
        <br/>
          <label className="button">
            Opción uno correcta:
            <input className="box" type="text" name="option1"  value={this.state.option1} onChange={this.handleChange} />
          </label>
        <br/>
          <label className="button">
            Opción dos incorrecta:
            <input className="box" type="text" name="option2"  value={this.state.option2} onChange={this.handleChange} />
          </label>
        <br/>
          <label className="button">
            Opción tres incorrecta:
            <input className="box" type="text" name="option3"  value={this.state.option3} onChange={this.handleChange} />
          </label>
        <br/>
          <label className="button">
            Opción cuatro incorrecta:
            <input className="box" type="text" name="option4"  value={this.state.option4} onChange={this.handleChange} />
          </label>
        <br/>
        <div>
          <center> <Button  className="button2" variant="secondary" type="submit">Cargar pregunta</Button></center>
        </div>

        </form>
      </div>
      <div>
      <Button  className="button2" variant="secondary" onClick={this.setRedirect}> Volver a inicio</Button>
      </div>
      </div>
    );
  }
}
