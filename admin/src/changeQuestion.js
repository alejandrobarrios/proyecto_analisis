import React, {Component } from 'react';
import {Button, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import "./App.css";
import {Redirect} from 'react-router-dom';
import logo from './trviavetlogo.png';


export default class loadQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category:'',
      description:'',
      option1:'',
      option2:'',
      option3:'',
      option4:'',
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogQuestion = this.handleLogQuestion.bind(this);
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


  handleChange (event) {
    //this.setState({value: event.target.value});

    this.setState({
      [event.target.name] : event.target.value
    });

  }

  handleLogQuestion (event) {
    //console.log(this.state);
    //this.props.addUser(this.state.firstName, this.state.lastName);//ejecuto addUser que pase desde App

    event.preventDefault();
    //doSomethingWithEvent(event);

    fetch('http://localhost:4567/admin/questions', {

      method: 'POST',
      body: JSON.stringify({
        category: this.state.category,
        description: this.state.description,
        options:[{description: this.state.option1, correct: true},
                {description: this.state.option2, correct: false},
                {description: this.state.option3, correct: false},
                {description: this.state.option4, correct: false},
        ]
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response =>
      alert(' Se ha cargado correctamente la pregunta en: ' + this.state.category ))
    .catch((error) => {
      alert('No se pudo cargar la pregunta en: ' + this.state.category );

      });


    }

  onSubmit =(event) =>{

    //para no refrescar el formulario cada vez que presiono el boton
    console.log(this.state);
    event.preventDefault();


  }


  render() {
    const styles2 = {
        fontSize:'20px',
        top: 180,
        left: 500,
        right:0,

    }
    const styles3 = {
        fontSize:'12px',
      }

    return (
      <div className="App-header">
      <img className="begin-logo" src={logo} alt="logo" />
      <div className="App-header2">
      <center><h1>Seleccione la categoria a la cual pertenece la preguanta que modificara</h1></center>
        <DropdownButton id="dropdown-basic-button " variant="info" title="Estadisticas">
          <Dropdown.Item href="/modEC">Examen Clínica</Dropdown.Item>
          <Dropdown.Item href="/modF">Farmacología</Dropdown.Item>
          <Dropdown.Item href="/modEp">Epidemiología</Dropdown.Item>
          <Dropdown.Item href="/modEn">Enfermedades</Dropdown.Item>
          <Dropdown.Item href="/modQ">Quirúrgica</Dropdown.Item>
          <Dropdown.Item href="/modCM">Clínica Médica</Dropdown.Item>
        </DropdownButton>
      </div>
      </div>
    );
  }
}
