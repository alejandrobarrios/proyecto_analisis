import React, {Component } from 'react';
import "./App.css";


export default class privilegesAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePrivilege = this.handlePrivilege.bind(this);
  }





  handleChange (event) {
    //this.setState({value: event.target.value});

    this.setState({
      [event.target.name] : event.target.value
    });

  }

  handlePrivilege (event) {
    //console.log(this.state);
    //this.props.addUser(this.state.firstName, this.state.lastName);//ejecuto addUser que pase desde App
    
    event.preventDefault();
    //doSomethingWithEvent(event);

    fetch('http://localhost:4567/admin/convertTo', {

      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response =>
      alert(' se pudo encontrar' + this.state.username ))
    .catch((error) => {
      alert('No se pudo encontrar' + this.state.username );

      });

   
    }

  onSubmit =(event) =>{

    //para no refrescar el formulario cada vez que presiono el boton
    console.log(this.state);
    event.preventDefault();


  }


  render() {
    return (
      <div>
      <h2>Dar Permiso</h2>
      <form onSubmit={this.handlePrivilege}>

      <br/>
        <label>
          Username:
          <input type="text" name="username"  value={this.state.username} onChange={this.handleChange} />
        </label>
      <br/>
      <input type="submit" value="Dar Privilegios" />
      </form>
      </div>
    );
  }
}
