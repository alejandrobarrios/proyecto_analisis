import React, {Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import Que from './questions.js';
import {Redirect} from 'react-router-dom';

export default class modFarm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qu: [],
      identificad: '',
      redirect:false

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleQ = this.handleQ.bind(this);
  }

  handleChange (event) {
    //this.setState({value: event.target.value});

    this.setState({
      [event.target.name] : event.target.value
    });

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
       fetch('http://localhost:4567/admin/statQues',{
        method: 'POST',
        body: '{"category":"farmacologia"}'
        })
        .then(response => response.json())
        .then((data) => {
          this.setState({ qu : data} )
        })
          .catch(console.log)


    }

    handleQ (event) {
      //console.log(this.state);
      //this.props.addUser(this.state.firstName, this.state.lastName);//ejecuto addUser que pase desde App

      event.preventDefault();
      //doSomethingWithEvent(event);

      fetch('http://localhost:4567/admin/delquestions', {

        method: 'DELETE',
        body: JSON.stringify({
          id: this.state.identificad,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response =>
        alert('Se pudo borrar la pregunta con id: ' + this.state.identificad ))
      .catch((error) => {
        alert('No se pudo borrar la pregunta con id: ' + this.state.identificad);

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
        {this.renderRedirect()}
        <h2>Para seleccionar la pregunta a borrar, debe ingresar el id de la pregunta.</h2>
        <form onSubmit={this.handleQ}>

        <br/>
          <label>
            Ingrese el id:
            <input type="text" name="identificad" value={this.state.identificad} onChange={this.handleChange} />
          </label>
        <br/>
        <input type="submit" value="Buscar Pregunta" />
        </form>

        <Que qu={this.state.qu} />

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
