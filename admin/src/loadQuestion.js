import React, {Component } from 'react';
import {Button} from 'react-bootstrap';
import "./App.css";
import {Redirect} from 'react-router-dom';


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
      {this.renderRedirect()}
      <h2>Carga de pregunta</h2>
      <form onSubmit={this.handleLogQuestion}>

      <br/>
        <label style={styles2}>
          Categoria a la cual pertenece la pregunta:
          <input style={styles3} type="text" name="category"  value={this.state.category} onChange={this.handleChange} />
        </label>
      <br/>
        <label style={styles2}>
          Descripcion de la pregunta:
          <input style={styles3} type="text" name="description"  value={this.state.description} onChange={this.handleChange} />
        </label>
      <br/>
        <label style={styles2}>
          Opcion la cual sera la correcta:
          <input style={styles3} type="text" name="option1"  value={this.state.option1} onChange={this.handleChange} />
        </label>
      <br/>
        <label style={styles2}>
          Otra opcion:
          <input style={styles3} type="text" name="option2"  value={this.state.option2} onChange={this.handleChange} />
        </label>
      <br/>
        <label style={styles2}>
          Otra opcion:
          <input style={styles3} type="text" name="option3"  value={this.state.option3} onChange={this.handleChange} />
        </label>
      <br/>
        <label style={styles2}>
          Otra opcion:
          <input style={styles3} type="text" name="option4"  value={this.state.option4} onChange={this.handleChange} />
        </label>
      <br/>

     <center> <Button variant="success" type="submit">Cargar</Button></center>
     <br/>
      </form>
      <center><Button
          block
          bsSize="large"
          onClick={this.setRedirect}
        >
          Volver a Home
      </Button>
      </center>
      </div>
    );
  }
}
