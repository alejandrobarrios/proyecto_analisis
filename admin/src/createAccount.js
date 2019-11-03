import React, {Component } from 'react';


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
      <div>
      <center><h1>Welcome to TriviaVet</h1></center>
      <h3>Create Account</h3>
      <form onSubmit={this.handleSubmit}>

      <br/>
        <label>
          User Name:
          <input type="text" name="username"  value={this.state.username} onChange={this.handleChange} />
        </label>
      <br/>
      <br/>
        <label>
          Password:
          <input type="password" name="password"  value={this.state.password} onChange={this.handleChange} />
        </label>
      <br/>
      <br/>
        <label>
          Firts Name:
          <input type="text" name="firstName"  value={this.state.name} onChange={this.handleChange} />
        </label>
      <br/>
      <br/>
        <label>
          Last Name:
          <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
        </label>
      <br/>
      <br/>
        <label>
          DNI:
          <input type="text" name="dni" value={this.state.dni} onChange={this.handleChange} />
        </label>
      <br/>
      <input type="submit" value="Crear Cuenta" />
      </form>

      </div>
    );
  }
}
