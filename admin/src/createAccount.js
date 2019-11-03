import React, {Component } from 'react';


export default class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      firstName: '',
      lastName: '',
      dni:'',
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
    alert('Agregamos un Nuevo Usuario: ' + this.state.username );
    event.preventDefault();
    //doSomethingWithEvent(event);

    fetch('http://localhost:4567/admin/users', {

      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        name: this.state.firstName,
        lastname: this.state.lastName,
        dni: this.state.dni,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => console.log(json))

  }


  handleLogIn (event) {
    //console.log(this.state);
    //this.props.addUser(this.state.firstName, this.state.lastName);//ejecuto addUser que pase desde App
    alert('Agregamos un Nuevo Usuario: ' + this.state.username );
    event.preventDefault();
    //doSomethingWithEvent(event);

    fetch('http://localhost:4567/admin/users', {

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
          color: '#653294',
          fontSize:'28px',
          top: 120,
          left:200,
          right: 0,
          width: 100,
          height: 100,
     }
     const styleBox = {
       box1: {
         color: '#F2B558',
         fontSize:'20px',
          position: 'absolute',
          top: 75,
         left: 250,
         right:0,
         width: 100,
         height: 100,
          },
          box2: {
            color: '#F2B558',
            fontSize:'20px',
             position: 'absolute',
             top: 45,
            left: 250,
            right:0,
            width: 20,
            height: 20,
             },
     }

        const styles2 = {
            fontSize:'15px',
        }
        const styles3 = {
            fontSize:'12px',
          }
        const styles4 = {
            fontSize:'15px',
            top: 1000,
          }
    return (
      <div >
      <h3 style ={styleBox.box2}>Create Account</h3>
      <form style={styleBox.box1} onSubmit={this.handleSubmit}>

      <br/>
        <label style ={styles2}>
          User Name:
          <input style={styles3} type="text" name="username"  value={this.state.username} onChange={this.handleChange} />
        </label>
      <br/>
      <br/>
        <label style ={styles2}>
          Password:
          <input style={styles3} type="password" name="password"  value={this.state.password} onChange={this.handleChange} />
        </label>
      <br/>
      <br/>
        <label style ={styles2}>
          Firts Name:
          <input style={styles3} type="text" name="firstName"  value={this.state.name} onChange={this.handleChange} />
        </label>
      <br/>
      <br/>
        <label style ={styles2}>
          Last Name:
          <input style={styles3} type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
        </label>
      <br/>
      <br/>
        <label style ={styles2}>
          DNI:
          <input style={styles3} type="text" name="dni" value={this.state.dni} onChange={this.handleChange} />
        </label>
      <br/>
      <input style={styles4} type="submit" value="Crear Cuenta" />
      </form>

      </div>
    );
  }
}
