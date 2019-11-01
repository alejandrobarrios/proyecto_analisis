import React, {Component} from 'react';


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

      logIn = (username, password) => {
         //console.log("adding a new user...");
         const newUser = {
            username : username,
            password : password,
         }
         this.setState ({
            users  : [...this.state.users, newUser]
         })
         console.log(this.state.users);
      }

      render () {
        return (

          <div>
            <MyForm addUser={this.addUser} />
            <Login addUser={this.logIn} />
          </div>
    );
  }
}
