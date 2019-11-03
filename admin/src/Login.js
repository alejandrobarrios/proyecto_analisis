import React, {Component } from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      redirect:false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
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
    this.state.redirect = true;
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
    .then(response =>
      console.log("hi"),
      console.log(this.state.redirect)
    )
    .catch((error) => {
      alert('No se pudo encontrar ' + this.state.username + '. O su contraseña no es la cargada' );

      });

      console.log(this.state.redirect);


    }

    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/home' />
      }
    }

  onSubmit =(event) =>{

    //para no refrescar el formulario cada vez que presiono el boton
    console.log(this.state);
    event.preventDefault();


  }


  render() {
    return (
      <div className="Login">
      {this.renderRedirect()}
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
      <input type="submit" value={this.renderRedirect()}  />
      </form>
      {this.renderRedirect()}
      </div>
    );
  }
}
