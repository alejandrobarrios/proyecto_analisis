import React, {Component } from 'react';
import { Button, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import Statitics from './estadisticas';
import Privileges from './privilegesAdmin';
import StatExClin from './statExClin';
import StatFarma from './statFarma';
import StatEpidem from './statEpidem';
import StatEnferm from './statEnferm';
import StatQuiru from './statQuiru';
import StatMedic from './statMedic';
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
      <div className= "home">

      <center><h1>Welcome to TriviaVet</h1></center>
      <h3>¿Qué desea hacer?</h3>
      <div className="menu">
      <ButtonGroup>
        <Button href="/loadQues" variant="outline-secondary" type="submit">Agregar Pregunta</Button>
        <Button href="/modifyQues" variant="outline-secondary" type="submit">Modificar Pregunta</Button>
        <Button href="/deleteQues" variant="outline-secondary" type="submit">Eliminar Pregunta</Button>
        <DropdownButton id="dropdown-basic-button " variant="outline-secondary" title="Estadisticas">
          <Dropdown.Item href="/exClin">Examen Clinica</Dropdown.Item>
          <Dropdown.Item href="/farma">Farmacologia</Dropdown.Item>
          <Dropdown.Item href="/edpide">Epidemiologia</Dropdown.Item>
          <Dropdown.Item href="/enferm">Enfermedades</Dropdown.Item>
          <Dropdown.Item href="/quiru">Quirurgica</Dropdown.Item>
          <Dropdown.Item href="/clinMed">Clinica Medica</Dropdown.Item>
        </DropdownButton>
        <Button href="/privilegesAdmin" variant="outline-secondary" type="submit">Dar Privilegios</Button>

        <Button variant="outline-secondary" type="submit">Cerrar Sesión</Button>
        </ButtonGroup>
    </div>
    <div>
    <BrowserRouter>
        <div>
          <Switch>
            <Route
              path="/exClin"
              component={StatExClin} />
            <Route
              path="/farma"
              component={StatFarma} />
              <Route
                path="/edpide"
                component={StatEpidem} />
                <Route
                  path="/enferm"
                  component={StatEnferm} />
                  <Route
                    path="/quiru"
                    component={StatQuiru} />
                    <Route
                      path="/clinMed"
                      component={StatMedic} />
                      <Route
                      path="/privilegesAdmin"
                      component={Privileges} />
          </Switch>
        </div>
    </BrowserRouter>
    </div>
    </div>
    );
  }
}
