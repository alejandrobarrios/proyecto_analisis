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
import ChangeQues from './changeQuestion';

import ModExC from './modExC';
import ModEf from './modEnf';
import ModEp from './modEpide';
import ModF from './modFarma';
import ModM from './modMedi';
import ModQ from './modQuiru';



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
                              <Route
                                path="/deleteQues"
                                component={ChangeQues} />
                                <Route
                                  path="/modEC"
                                  component={ModExC} />
                                  <Route
                                    path="/modF"
                                    component={ModF} />
                                    <Route
                                      path="/modEp"
                                      component={ModEp} />
                                      <Route
                                        path="/modEn"
                                        component={ModEf} />
                                        <Route
                                          path="/modQ"
                                          component={ModQ} />
                                          <Route
                                            path="/modCM"
                                            component={ModM} />

                </Switch>
              </div>
          </BrowserRouter>
          </div>

        );
      }
    }

export default App;
