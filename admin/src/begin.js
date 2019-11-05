import React, {Component} from 'react';
import logo from './trviavetlogo.png';

import MyForm from './createAccount';
import Login from './Login';
import "./App.css";


  export default class Begin extends Component {
      state = {
        contacts: [],
        users: []
      }


      addUser = (username, password, firstName, lastName, dni) => {
         //console.log("adding a new user...");
         const newUser = {
            username : username,
            password : password,
            firstName : firstName,
            lastName : lastName,
            dni : dni
         }
         this.setState ({
            users  : [...this.state.users, newUser]
         })
         console.log(this.state.users);
      }

      render () {
        return (
          <div className= "imagen" >
          <div className= "card-body">
          <center><h1>Bienvenido a TriviaVet Admin</h1></center>
          <center><img className="begin-logo" src={logo} alt="logo"/></center>
          </div>
          <div className="App-header7">
              <Login />
          </div>
          <div className="App-header8">
              <MyForm addUser={this.addUser} />
          </div>
          </div>

    );
  }
}
