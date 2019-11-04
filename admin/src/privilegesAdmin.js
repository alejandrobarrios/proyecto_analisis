import React, {Component } from 'react';
import "./App.css";
import { Button } from 'react-bootstrap';
import {Redirect} from 'react-router-dom';


export default class privilegesAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      redirect:false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePrivilege = this.handlePrivilege.bind(this);
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

  handlePrivilege (event) {
    //console.log(this.state);
    //this.props.addUser(this.state.firstName, this.state.lastName);//ejecuto addUser que pase desde App

    event.preventDefault();
    //doSomethingWithEvent(event);

    fetch('http://localhost:4567/admin/convertTo', {

      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
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
      <div className = "App-header">
      {this.renderRedirect()}
      <h2>Ingrese el usuario a dar Permiso de Admin</h2>
      <form onSubmit={this.handlePrivilege}>

      <br/>
        <label>
          <input type="text" placeholder="Usuario" name="username"  value={this.state.username} onChange={this.handleChange} />
        </label>
      <br/>
      <Button className="button" variant="secondary" type="submit">Dar Privilegios</Button>

      </form>
      <Button className="button" variant="secondary" onClick={this.setRedirect}>
          Volver a Home
      </Button>
      </div>
    );
  }
}
