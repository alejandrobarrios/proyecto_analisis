import React, {Component} from 'react';


import Contacts from './components/contacts';
import MyForm from './components/miFormulario';
import Users from './components/users';


    class App extends Component {

      state = {
        contacts: [],
        users: []
      }


      addUser = (firstName, lastName) => {
         //console.log("adding a new user...");
         const newUser = {
            firstName : firstName,
            lastName : lastName
         }
         this.setState ({
            users  : [...this.state.users, newUser]
         })
         console.log(this.state.users);
      }



      componentDidMount() {


       //fetch('http://jsonplaceholder.typicode.com/users')
       fetch('http://localhost:4567/')
        .then(response => response.json())
        .then((data) => {
          this.setState({ contacts : data })
          console.log(this.state.contacts)
        })
        .catch(console.log)



       //fetch('http://jsonplaceholder.typicode.com/users')
       fetch('http://localhost:4567/allusers3')
        .then(response => response.json())
        .then((data) => {
          this.setState({ users : data })
          console.log(this.state.users)
        })
        .catch(console.log)




      }



      render () {
        return (

          <div>
            <Contacts contacts={this.state.contacts} />
            <MyForm addUser={this.addUser} />
            <Users users={this.state.users} />
          </div>


        );
      }
    }

export default App;
