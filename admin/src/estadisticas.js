import React, {Component } from 'react';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";


export default class estadisticas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category:'',
    
    };

    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);

    //this.showMenu = this.showMenu.bind(this);
    // this.closeMenu = this.closeMenu.bind(this);
  }



  handleStatitics (event) {
    //console.log(this.state);
    //this.props.addUser(this.state.firstName, this.state.lastName);//ejecuto addUser que pase desde App
    //alert('Agregamos un Nuevo Usuario: ' + this.state.username );
    //doSomethingWithEvent(event);

    fetch('http://localhost:4567/admin/statCat', {

      method: 'POST',
      body: JSON.stringify({
        category: this.state.category,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => console.log(json))

  }


    
  onSubmit =(event) =>{

    //para no refrescar el formulario cada vez que presiono el boton
    console.log(this.state);
    event.preventDefault();
  }
  


  render() {
    return (
      <div>
      
        <center><h1>EstadísticasS</h1></center>
        <h3>¿Qué desea hacer?</h3>
      

      </div>
    );
  }
}
