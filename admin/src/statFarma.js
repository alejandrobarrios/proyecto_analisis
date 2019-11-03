import React, {Component } from 'react';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";


export default class statFarma extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category:'',
    };
  }



  componentDidMount() {


       //fetch('http://jsonplaceholder.typicode.com/users')
       fetch('http://localhost:4567/admin/statCat',{
        method: 'POST',
        body: '{"category":"farmacologia"}'
      })
        .then(response => response.json())
        .then((data) => {
          this.setState({ contacts : data })
          console.log(this.state.contacts)
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

        <center><h1>Estadísticas</h1></center>
        <h3>¿Qué desea hacer?</h3>



      </div>
    );
  }
}
