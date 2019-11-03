import React, {Component} from 'react';
import "./App.css";
import { BrowserRouter, Switch, Route} from 'react-router-dom';
//npm install --save react-router-dom
import Begin from './begin';
import Home from './home';
import Privileges from './privilegesAdmin';

import StatExClin from './statExClin';
import StatFarma from './statFarma';
import StatEpidem from './statEpidem';
import StatEnferm from './statEnferm';
import StatQuiru from './statQuiru';
import StatMedic from './statMedic';
import LoadQues from './loadQuestion';



    class App extends Component {

      state = {
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
          <BrowserRouter>
              <div>
                <Switch>
                <Route
                  exact path="/"
                  component={Begin} />
                  <Route
                    path="/home"
                    component={Home} />
                  <Route
                    path="/exClin"
                    component={StatExClin} />
                  <Route
                    path="/farma"
                    component={StatFarma} />
                    <Route
                      path="/edpide"
                      component={StatEpidem} />
                      <Route
                        path="/enferm"
                        component={StatEnferm} />
                        <Route
                          path="/quiru"
                          component={StatQuiru} />
                          <Route
                            path="/clinMed"
                            component={StatMedic} />
                            <Route
                            path="/privilegesAdmin"
                            component={Privileges} />
                            <Route
                              path="/loadQuestion"
                              component={LoadQues} />
                </Switch>
              </div>
          </BrowserRouter>
          </div>

        );
      }
    }

export default App;
