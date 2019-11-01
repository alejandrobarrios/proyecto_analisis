import React, {Component } from 'react';


export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
  }





  handleChange (event) {
    //this.setState({value: event.target.value});

    this.setState({
      [event.target.name] : event.target.value
    });

  }

  handleLogIn (event) {
    //console.log(this.state);
    //this.props.addUser(this.state.firstName, this.state.lastName);//ejecuto addUser que pase desde App
    alert('Agregamos un Nuevo Usuario: ' + this.state.username );
    event.preventDefault();
    //doSomethingWithEvent(event);

    fetch('http://localhost:4567/admin/login', {

      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
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
      <h2>Log in</h2>
      <form onSubmit={this.handleLogIn}>

      <br/>
        <label>
          User Name:
          <input type="text" name="username"  value={this.state.username} onChange={this.handleChange} />
        </label>
      <br/>
      <br/>
        <label>
          Password:
          <input type="text" name="password"  value={this.state.password} onChange={this.handleChange} />
        </label>
      <br/>
      <input type="submit" value="Enviar" />
      </form>
      </div>
    );
  }
}
