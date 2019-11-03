import React, {Component } from 'react';
import { useHistory } from "react-router-dom";

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      redirect: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
  }


  handleChange (event) {
    //this.setState({value: event.target.value});

    this.setState({
      [event.target.name] : event.target.value
    });

  }



  handleLogIn (event) {
    //console.log(this.state);
    //this.props.addUser(this.state.firstName, this.state.lastName);//ejecuto addUser que pase desde App
    event.preventDefault();
    //doSomethingWithEvent(event);

    fetch('http://localhost:4567/admin/login', {

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
    .then(() => this.setState(() => ({
        redirect: true
      })))
    .then(response => {

      console.log(response);
      console.log(this.state.redirect);
    })
    .catch((error) => {
      console.log(error);
      alert('No se pudo encontrar ' + this.state.username + '. O su contraseña no es la cargada' )

      });

      console.log(this.state.redirect);


    }


  onSubmit =(event) =>{


  }


  render() {
    if (this.state.redirect === true) {
     return <Redirect to='/home' />
   }

    return (
      <div className="Login">
      <h2>Log in</h2>
      <form onSubmit={this.handleLogIn}>

      <br/>
        <label>
          User Name:
          <input type="text" name="username"  value={this.state.username} onChange={this.handleChange} />
        </label>
      <br/>
      <br/>
        <label>
          Password:
          <input type="text" name="password"  value={this.state.password} onChange={this.handleChange} />
        </label>
      <br/>
      <input type="submit" value="enviar" />
      </form>
      </div>
    );
  }
}
