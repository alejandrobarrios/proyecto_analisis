import React, {Component } from 'react';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
//import { createSwitchNavigator } from "@react-navigation/core";
//import { createBrowserApp } from "@react-navigation/web";
import { Link } from 'react-router-dom';


export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category:'',
    
    };

    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);

    //this.showMenu = this.showMenu.bind(this);
    // this.closeMenu = this.closeMenu.bind(this);
  }



  handleStatitics (event) {
    //console.log(this.state);
    //this.props.addUser(this.state.firstName, this.state.lastName);//ejecuto addUser que pase desde App
    //alert('Agregamos un Nuevo Usuario: ' + this.state.username );
    //doSomethingWithEvent(event);

    fetch('http://localhost:4567/admin/statCat', {

      method: 'POST',
      body: JSON.stringify({
        category: this.state.category,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => console.log(json))

  }


    
  onSubmit =(event) =>{

    //para no refrescar el formulario cada vez que presiono el boton
    console.log(this.state);
    event.preventDefault();
  }
  
  // Navigation
  // var Navigation = React.createClass({
  //const MyNavigator = createSwitchNavigator(routes);

  //const App = createBrowserApp(MyNavigator);
  render() {
    return (
      <div>
      
      <center><h1>Welcome to TriviaVet</h1></center>
      <h3>¿Qué desea hacer?</h3>
      <div className="menu">
        <Button href="/estadisticas" variant="outline-secondary" type="submit">Agregar Pregunta</Button>
        <Button variant="outline-secondary" type="submit">Modificar Pregunta</Button>
        <Button variant="outline-secondary" type="submit">Eliminar Pregunta</Button>
        <Button variant="outline-secondary" >Estadísticas</Button>
        <Button variant="outline-secondary" type="submit">Cerrar Sesión</Button>
      
        <DropdownButton id="dropdown-basic-button" title="Dropdown button">
          <Dropdown.Item href="/estadisticas" type="submit" onClick={this.handleStatitics.bind(this, 'examen_clinica')}>Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>

    </div>
    </div>
    );
  }
}
