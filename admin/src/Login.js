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
    const styles = {
            box1: {
              color: '#653294',
              fontSize:'40px',
               position: 'absolute',
               top: 120,
              left: 500,
              right:0,
              width: 100,
              height: 100,
               },
          }
        const styles2 = {
            fontSize:'20px',
            top: 180,
            left: 500,
            right:0,
            width: 100,
            height: 100,
        }

    return (
      <div>
      <h2 style={styles.box1}>Login</h2>
      <form style={styles.box1} sonSubmit={this.handleLogIn}>

      <br/>
        <label style={styles2}>
          User Name:
          <input type="text" name="username"  value={this.state.username} onChange={this.handleChange} />
        </label>
      <br/>
      <br/>
        <label style={styles2}>
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
