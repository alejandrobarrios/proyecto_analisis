import React, {Component } from 'react';
import {Button} from 'react-bootstrap';
import "./App.css";
import {Redirect, Link} from 'react-router-dom';
import logo from './trviavetlogo.png';


export default class loadQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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


  render() {

    return (
      <div className="App-header4">
        <div className="App-header4 arr">
        {this.renderRedirect()}
        <img className="begin-logo" src={logo} alt="logo" />
        <div className="App-header2">
        <center><h4>- Seleccione la categoría de la pregunta a modificar -</h4></center>

          <Link to="/modEC" className="link1">• Examen Clínica •</Link>
          <Link to="/modF" className="link1">• Farmacología •</Link>
          <Link to="/modEp" className="link1">• Epidemiología •</Link>
          <Link to="/modEn" className="link1">• Enfermedades •</Link>
          <Link to="/modQ" className="link1">• Quirúrgico •</Link>
          <Link to="/modCM" className="link1">• Clínica Médica •</Link>

        </div>
        <div className="arr2">
          <Button className="button2" variant="secondary" onClick={this.setRedirect}> Volver a inicio</Button>
        </div>
        </div>
      </div>
    );
  }
}
