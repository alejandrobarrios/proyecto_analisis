import React, {Component } from 'react';
import { Button, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
//import { createSwitchNavigator } from "@react-navigation/core";
//import { createBrowserApp } from "@react-navigation/web";


export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category:'',

    };
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
      <div className= "App-header">

        <center><h1>Welcome to TriviaVet</h1></center>
        <h3>¿Qué desea hacer?</h3>
        <div className="menu">
          <ButtonGroup>
            <DropdownButton id="dropdown-basic-button " variant="info" title="Preguntas">
              <Dropdown.Item href="/loadQuestion">Cargar una pregunta</Dropdown.Item>
              <Dropdown.Item href="/modifyQues">Modificar una pregunta</Dropdown.Item>
              <Dropdown.Item href="/deleteQues">Borrar una pregunta</Dropdown.Item>
            </DropdownButton>
            <DropdownButton id="dropdown-basic-button " variant="info" title="Estadisticas">
              <Dropdown.Item href="/exClin">Examen Clinica</Dropdown.Item>
              <Dropdown.Item href="/farma">Farmacologia</Dropdown.Item>
              <Dropdown.Item href="/edpide">Epidemiologia</Dropdown.Item>
              <Dropdown.Item href="/enferm">Enfermedades</Dropdown.Item>
              <Dropdown.Item href="/quiru">Quirurgica</Dropdown.Item>
              <Dropdown.Item href="/clinMed">Clinica Medica</Dropdown.Item>
            </DropdownButton>
            <Button href="/privilegesAdmin" variant="success" type="submit">Dar Privilegios</Button>

            <Button href="/" variant="danger" type="submit">Cerrar Sesión</Button>
          </ButtonGroup>
        </div>
    </div>
    );
  }
}
