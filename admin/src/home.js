import React, {Component } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";


export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category:'',
    
    };

    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();
    
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu(event) {
    
    if (!this.dropdownMenu.contains(event.target)) {
      
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
      
  }

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
      
      <center><h1>Welcome to TriviaVet</h1></center>
      <h3>¿Qué desea hacer?</h3>
      <div className="menu">
        <Button variant="outline-secondary">Agregar Pregunta</Button>
        <Button variant="outline-secondary">Modificar Pregunta</Button>
        <Button variant="outline-secondary">Eliminar Pregunta</Button>
        <Button variant="outline-secondary">Estadísticas</Button>
        <Button variant="outline-secondary">Cerrar Sesión</Button>
        
        <Button onClick={this.showMenu} variant="outline-secondary"> Estadísticas </Button>
        
        {
          this.state.showMenu
            ? (
              <div
                className="menu"
                ref={(element) => {
                  this.dropdownMenu = element;
                }}
              >
                <Button variant="outline-secondary" onClick={this.handleStatitics.bind(this, 'examen_clinica')} >Examen</Button>
                <Button variant="outline-secondary" onClick={this.handleStatitics.bind(this, 'examen_clinica')}>Cat2</Button>
                <Button variant="outline-secondary">Cat3</Button>
                <Button variant="outline-secondary">Cat4</Button>
                <Button variant="outline-secondary">Cat5</Button>
                <Button variant="outline-secondary">Cat6</Button>
              </div>
            )
            : (
              null
            )
        }

    </div>
    </div>
    );
  }
}
