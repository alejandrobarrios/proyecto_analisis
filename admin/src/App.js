import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import "./App.css";
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
//npm install --save react-router-dom
import MyForm from './miFormulario';
import Home from './home';
import Statitics from './estadisticas';



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
        require('dotenv').config();
        return (

          <BrowserRouter>
              <div>
              <nav>
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
              </ul>
              </nav>
                <Switch>
                  <Route
                    path="/home"
                    component={Home} />
                  <Route 
                    path="/estadisticas"
                    component={Statitics} />
                </Switch>
              </div>
          </BrowserRouter>

        );
      }
    }

export default App;
