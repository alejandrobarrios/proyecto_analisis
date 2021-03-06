import React, {Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import Stat from './stat.js';
import StatQ from './statQ.js';
import {Redirect} from 'react-router-dom';
import {Button} from 'react-bootstrap';


export default class statFarma extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statCat: [],
      statQues:[],
      redirect: false,
    };
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to= "/home" />
    }
  }

  componentDidMount() {


       //fetch('http://jsonplaceholder.typicode.com/users')
       fetch('http://localhost:4567/admin/statCat',{
        method: 'POST',
        body: '{"category":"farmacologia"}'
      })
        .then(response => response.json())
        .then((data) => {
          this.setState({statCat : data} )
        })
        .catch(console.log)

        fetch('http://localhost:4567/admin/statQues',{
          method: 'POST',
          body: '{"category":"farmacologia"}'
          })
          .then(response => response.json())
          .then((data) => {
            this.setState({statQues : data} )
            console.log(this.state.statQues)
          })
            .catch(console.log)

    }



  onSubmit =(event) =>{

    //para no refrescar el formulario cada vez que presiono el boton
    console.log(this.state);
    event.preventDefault();
  }



  render() {
    return (
      <div className="card-body">
      {this.renderRedirect()}
      <Stat statCat={this.state.statCat} />
      <StatQ statQues={this.state.statQues} />

        <center><Button onClick={this.setRedirect} className="button arr2" variant="secondary" type="submit">Volver</Button>
        </center>
      </div>
    );
  }
}
