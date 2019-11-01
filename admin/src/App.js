import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import "./App.css";
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
//npm install --save react-router-dom
import Begin from './begin';
import Home from './home';
import Statitics from './estadisticas';
import Privileges from './privilegesAdmin';



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




      render () {
        return (
          <div>
          <Begin />

          <BrowserRouter>
              <div>
              <nav>
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/estadisticas">Statitics</Link>
                </li>
                <li>
                  <Link to="/privilegesAdmin">Privileges</Link>
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
                  <Route 
                    path="/privilegesAdmin"
                    component={Privileges} />
                </Switch>
              </div>
          </BrowserRouter>
          </div>

        );
      }
    }

export default App;
