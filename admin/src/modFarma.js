import React, {Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import {Button} from 'react-bootstrap'
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
         <div className="App-header4">
        {this.renderRedirect()}
        <h2>Para borrar la pregunta debe ingresar el id</h2>
        <form className="button" onSubmit={this.handleQ}>

        <br/>
          <label>
            <input placeholder="Ingresa el Id" type="text" name="identificad" value={this.state.identificad} onChange={this.handleChange} />
          </label>
        <br/>
        <Button className="button" variant="secondary" type="submit">Buscar Pregunta</Button>
        </form>

        <Que qu={this.state.qu} />

        
        <Button onClick={this.setRedirect} className="button arr2" variant="secondary" type="submit">Volver</Button>
        
      </div>
    );
  }
}
