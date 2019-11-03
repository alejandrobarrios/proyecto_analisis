import React, {Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import Stat from './stat.js';
import {Redirect} from 'react-router-dom';

export default class statQuiru extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stat: [],
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
        body: '{"category":"quirurgica"}'
      })
        .then(response => response.json())
        .then((data) => {
          this.setState({ stat : data })
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
      <div>
      {this.renderRedirect()}
        <Stat stat={this.state.stat} />

        <center><button
            block
            bsSize="large"
            onClick={this.setRedirect}
          >
            Volver a Home
        </button>
        </center>
      </div>
    );
  }
}
