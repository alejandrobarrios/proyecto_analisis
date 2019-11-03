import React, {Component } from 'react';

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
      alert('No se pudo encontrar ' + this.state.username + '. O su contraseña no es la cargada' )

      });

      console.log(this.state.redirect);


    }


  onSubmit =(event) =>{


  }


  render() {

    const styles = {
            box1: {
              color: '#F2B558',
              fontSize:'20px',
               position: 'absolute',
               top: 120,
              left: 900,
              right:0,
              width: 100,
              height: 100,
               },
          }
        const styles2 = {
            fontSize:'20px',
            top: 180,
            left: 500,
            right:0,

        }
        const styles3 = {
            fontSize:'12px',
          }

          const styles4 = {
              fontSize:'15px',
            }
       if (this.state.redirect === true) {
          return <Redirect to='/home' />
        }


    return (
      <div>
      <h2 style={styles.box1}>Login</h2>
      <form style={styles.box1} onSubmit={this.handleLogIn}>


      <br/>
        <label style={styles2}>
          User Name:
          <input style={styles3} type="text" name="username"  value={this.state.username} onChange={this.handleChange} />
        </label>
      <br/>
      <br/>
        <label style={styles2}>
          Password:
          <input style={styles3} type="password" name="password"  value={this.state.password} onChange={this.handleChange} />
        </label>
      <br/>
      <input style={styles4}  type="submit" value="Enviar" />
      </form>
      </div>
    );
  }
}
