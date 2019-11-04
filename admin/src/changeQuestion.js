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

      const styles4 = {
          color: '#afafaf',
        }
    return (
      <div className="App-header">
      {this.renderRedirect()}
      <img className="begin-logo" src={logo} alt="logo" />
      <div className="App-header2">
      <center><h1>Seleccione la categoria a la cual pertenece la preguanta que modificara</h1></center>

        <Link style={styles4} to="/modEC" className="link">Examen Clinica</Link>
        <Link style={styles4} to="/modF" className="link">Farmacologia</Link>
        <Link style={styles4} to="/modEp" className="link">Epidemiologia</Link>
        <Link style={styles4} to="/modEn" className="link">Enfermedades</Link>
        <Link style={styles4} to="/modQ" className="link">Quirurgico</Link>
        <Link style={styles4} to="/modCM" className="link">Clinica Medica</Link>

      </div>
      <Button  className="button2" variant="secondary" onClick={this.setRedirect}> Volver a inicio</Button>
      </div>
    );
  }
}
