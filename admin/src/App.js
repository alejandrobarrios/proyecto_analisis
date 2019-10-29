import React, {Component} from 'react';


import Contacts from './contacts';
import MyForm from './miFormulario';
import Users from './users';


    class App extends Component {

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


      componentDidMount() {


       //fetch('http://jsonplaceholder.typicode.com/users')
       fetch('http://localhost:4567/admin/statCat',{
        method: 'POST',
        body: '{"category":"examen_clinica"}'
      })
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
            <MyForm addUser={this.addUser} />
          </div>


        );
      }
    }

export default App;
