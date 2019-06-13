import React from 'react';
import {API_HOST} from 'react-native-dotenv';
import {
  AsyncStorage,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

export default class CreateAccountScreen extends React.Component {
  static navigationOptions ={ 
    title: 'Crear una cuenta',
     headerStyle: {
      backgroundColor: 'rgba(77,94,129, 1)',
     },headerTintColor: '#fff',

  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      name: '',
      lastname: '',
      dni: ''

    }
  }

  render() {
    return (
      <View style={styles.container}>
        

          <TextInput
          placeholder="Usuario"
          style={styles.inputFirst}
          onChangeText={(value) => this.setState({ username: value })}
          value={this.state.username}
        />

        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          onChangeText={(value) => this.setState({ password: value })}
          value={this.state.password}
        />

        <TextInput
          placeholder="Nombre"
          style={styles.input}
          onChangeText={(value) => this.setState({ name: value })}
          value={this.state.name}
        />

        <TextInput
          placeholder="Apellido"
          style={styles.input}
          onChangeText={(value) => this.setState({ lastname: value })}
          value={this.state.lastname}
        />

        <TextInput
          placeholder="DNI"
          style={styles.input}
          onChangeText={(value) => this.setState({ dni: value })}
          value={this.state.dni}
        />

        <Text style={styles.getStartedText}> (*)Debe ingresar todos los datos para crear un Usuario </Text>

        <View style={styles.button}>
          <Button title="Registrarse" onPress={this._signUp} />
        </View>

        <View style={styles.button}>
          <Button title="Cancelar" onPress={this._handleHome} />
        </View>

      </View>
    );
  }

  _handleHome = async () => {
    this.props.navigation.navigate('Auth');
  };

  _signUp = () => {
    const { username, password, name, lastname, dni } = this.state;

    axios.post("http://192.168.0.17:4567/users", {
      username: username,
      password: password,
      name: name,
      lastname: lastname,
      dni: dni,
    }, {
      auth: {
        username: 'admin',
        password: 'admin'
      }
    })
      .then(response => JSON.stringify(response))
      .then(response => {
        this.props.navigation.navigate('SignIn');
      })
    .catch((error) => {
      if(error.toString().match(/401/)) {
        alert("Username o Password incorrecto");
        return;
      }

      alert("Networking Error");
    });
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(77,94,129, 1)',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    margin: 5,
  },
  input: {
    margin: 15,
    marginTop: 0,
    height: 30,
    padding: 5,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#4228F8'
  },
  inputFirst: {
    margin: 15,
    marginTop: 0,
    height: 30,
    padding: 5,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#4228F8'
  },
  button: {
    marginTop:10,
  },
  getStartedText: {
    marginTop: 30,
    fontSize: 17,
    color: 'white',
    lineHeight: 24,
    textAlign: 'center',
  }
})
