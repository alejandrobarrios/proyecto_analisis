import React, {Component } from 'react';
import {Button} from 'react-bootstrap'
import {Redirect } from 'react-router-dom';


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
      alert('Usuiario ' + this.state.username + ' inexistente. O su contraseña no coincide' );

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
      <div >
      <h2>Login</h2>
      <form  onSubmit={this.handleLogIn}>


      <br/>
        <div>
        <label>
          <input placeholder="Usuario" type="text" name="username"  value={this.state.username} onChange={this.handleChange} />
        </label>
        </div>
        <div>
        <label>
          <input placeholder="Contraseña" type="password" name="password"  value={this.state.password} onChange={this.handleChange} />
        </label>
        </div>
        <Button className="button" variant="secondary" type="submit">Enviar</Button>
      </form>
      </div>
    );
  }
}
