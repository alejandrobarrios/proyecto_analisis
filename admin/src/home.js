import React, {Component } from 'react';
import { Button, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import logo from './trviavetlogo.png';
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
          <img className="begin-logo" src={logo} alt="logo" />
          
          <div className= "App-header2">
          <center><h1>Bienvenido a TriviaVet Admin</h1></center>
          <div className= "h3">
            <h3>¿Qué desea hacer?</h3>
          </div>
          <div className="menu">
            <ButtonGroup>
              <DropdownButton className="button" id="dropdown-basic-button " variant="secondary" title="Preguntas">
                <Dropdown.Item href="/loadQuestion">Cargar una pregunta</Dropdown.Item>
                <Dropdown.Item href="/deleteQues">Borrar una pregunta</Dropdown.Item>
              </DropdownButton>
              <DropdownButton className="button" id="dropdown-basic-button " variant="secondary" title="Estadisticas">
                <Dropdown.Item href="/exClin">Examen Clínica</Dropdown.Item>
                <Dropdown.Item href="/farma">Farmacología</Dropdown.Item>
                <Dropdown.Item href="/edpide">Epidemiología</Dropdown.Item>
                <Dropdown.Item href="/enferm">Enfermedades</Dropdown.Item>
                <Dropdown.Item href="/quiru">Quirúrgica</Dropdown.Item>
                <Dropdown.Item href="/clinMed">Clínica Médica</Dropdown.Item>
              </DropdownButton>
              <div className="button">
                <Button href="/privilegesAdmin" variant="secondary" type="submit">Dar Privilegios</Button>
              </div>
              <div className="button">
                <Button href="/" variant="secondary" type="submit">Cerrar Sesión</Button>
              </div>
            </ButtonGroup>
          </div>
        </div>
    </div>
    );
  }
}
