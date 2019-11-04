import React, {Component } from 'react';
import {Button} from 'react-bootstrap';


export default class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      firstName: '',
      lastName: '',
      dni:'',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }





  handleChange (event) {
    //this.setState({value: event.target.value});

    this.setState({
      [event.target.name] : event.target.value
    });

  }



  handleSubmit (event) {
    //console.log(this.state);
    //this.props.addUser(this.state.firstName, this.state.lastName);//ejecuto addUser que pase desde App
    alert('Agregamos un Nuevo Usuario: ' + this.state.username );
    event.preventDefault();
    //doSomethingWithEvent(event);

    fetch('http://localhost:4567/admin/users', {

      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        name: this.state.firstName,
        lastname: this.state.lastName,
        dni: this.state.dni,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => console.log(json))

  }


  handleLogIn (event) {
    //console.log(this.state);
    //this.props.addUser(this.state.firstName, this.state.lastName);//ejecuto addUser que pase desde App
    alert('Agregamos un Nuevo Usuario: ' + this.state.username );
    event.preventDefault();
    //doSomethingWithEvent(event);

    fetch('http://localhost:4567/admin/users', {

      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
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


  render() {
    return (
      <div nameClass="App-header">
        <h4>Crear Cuenta</h4>
        <form  onSubmit={this.handleSubmit}>
          <label>
            <input placeholder="Nombre de Usuario" type="text" name="username"  value={this.state.username} onChange={this.handleChange} />
          </label>
        <br/>
          <label>
            <input placeholder="Contraseña" type="text" name="password"  value={this.state.password} onChange={this.handleChange} />
          </label>
        <br/>
          <label>
            <input placeholder="Nombre" type="text" name="firstName"  value={this.state.name} onChange={this.handleChange} />
          </label>
        <br/>
          <label>
            <input placeholder="Apellido" type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
          </label>
        <br/>
          <label>
            <input placeholder="DNI" type="text" name="dni" value={this.state.dni} onChange={this.handleChange} />
          </label>
        <br/>
        <Button className="button" variant="secondary" type="submit">Crear Cuenta</Button>
        </form>

      </div>
    );
  }
}
