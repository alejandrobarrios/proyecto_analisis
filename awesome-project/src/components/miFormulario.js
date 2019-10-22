import React, {Component } from 'react';


export default class miFormulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      dni:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }





  handleChange (event) {
    //this.setState({value: event.target.value});

    this.setState({ 
      [event.target.name] : event.target.value
    });

  }

  handleSubmit (event) {
    //console.log(this.state);
    //this.props.addUser(this.state.firstName, this.state.lastName);//ejecuto addUser que pase desde App
    alert('Agregamos un Nuevo Usuario: ' + this.state.firstName );
    event.preventDefault();
    //doSomethingWithEvent(event);

    fetch('http://localhost:4567/newUserAriel', {

      method: 'POST',
      body: JSON.stringify({
        nombre: this.state.firstName,
        apellido: this.state.lastName,
        dni: this.state.dni,
        userId: 1
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
      <form onSubmit={this.handleSubmit}>
      <br/>
        <label>
          Firts Name:
          <input type="text" name="firstName"  value={this.state.firstName} onChange={this.handleChange} />
        </label>
        <br/>
        <label>
          Last Name:
          <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
        </label>
        <br/>
        <label>
          DNI:
          <input type="text" name="dni" value={this.state.dni} onChange={this.handleChange} />
        </label>
        <br/>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}





