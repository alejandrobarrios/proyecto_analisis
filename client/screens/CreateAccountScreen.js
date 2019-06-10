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
  static navigationOptions = {
    title: 'Crear Cuenta',
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
        
        <Text style={styles.getStartedText}> A continuacion debera ingresar sus datos para crear un Usuario </Text>

        <Text style={styles.welcome}> Usuario </Text>
          <TextInput
          placeholder=""
          style={styles.input}
          onChangeText={(value) => this.setState({ username: value })}
          value={this.state.username}
        />

        <Text style={styles.welcome}> Contraseña </Text>
        <TextInput
          placeholder=""
          style={styles.input}
          onChangeText={(value) => this.setState({ password: value })}
          value={this.state.password}
        />

        <Text style={styles.welcome}> Nombre </Text>
        <TextInput
          placeholder=""
          style={styles.input}
          onChangeText={(value) => this.setState({ name: value })}
          value={this.state.name}
        />

        <Text style={styles.welcome}> Apellido </Text>
        <TextInput
          placeholder=""
          style={styles.input}
          onChangeText={(value) => this.setState({ lastname: value })}
          value={this.state.lastname}
        />

        <Text style={styles.welcome}> DNI </Text>
        <TextInput
          placeholder=""
          style={styles.input}
          onChangeText={(value) => this.setState({ dni: value })}
          value={this.state.dni}
        />

        <View style={styles.button}>
          <Button title="Sign up" onPress={this._signIn} />
        </View>

      </View>
    );
  }

  _signIn = () => {
    const { username, password, name, lastname, dni } = this.state;

    axios.post(API_HOST+"/users", {
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
        this.props.navigation.navigate('Auth');
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
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
  },
  input: {
    margin: 15,
    marginTop: -20,
    height: 30,
    padding: 5,
    fontSize: 16,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#4228F8'
  },
  button: {
    marginTop:0,
  },
  getStartedText: {
    marginTop: -150,
    fontSize: 17,
    color: 'rgba(0,0,0, 1)',
    lineHeight: 24,
    textAlign: 'center',
  }
})
