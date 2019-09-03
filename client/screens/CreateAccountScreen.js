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
    header: null,
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
        
        <Text style={styles.welcome}> Crea un Usuario </Text>

        <View style={styles.container2}>
        
          <TextInput
            placeholder="Nombre/s*"
            style={styles.input}
            onChangeText={(value) => this.setState({ name: value })}
            value={this.state.name}
          />

          <TextInput
            placeholder="Apellido/s*"
            style={styles.input}
            onChangeText={(value) => this.setState({ lastname: value })}
            value={this.state.lastname}
          />

          <TextInput
            placeholder="N° Documento*"
            style={styles.input}
            onChangeText={(value) => this.setState({ dni: value })}
            value={this.state.dni}
          />

          <TextInput
            placeholder="Nombre de Usuario*"
            style={styles.input}
            onChangeText={(value) => this.setState({ username: value })}
            value={this.state.username}
          />

           <TextInput
            placeholder="Contraseña*"
            style={styles.input}
            onChangeText={(value) => this.setState({ password: value })}
            value={this.state.password}
            secureTextEntry={true}
          />

        </View>
        <Text style={styles.getStartedText}> (*)Debe ingresar todos los datos para crear un Usuario </Text>
        <View style={styles.containerButton}>
          <View style={styles.button}>
            <Button color="#F2B558" title="Registrarse" onPress={this._signUp} />
          </View>
          <View style={styles.button}>
            <Button color="#37435D" title="Cancelar" onPress={this._handleHome} />
          </View>
        </View>
      </View>
    );
  }

  _handleHome = async () => {
    this.props.navigation.navigate('Auth');
  };

  _signUp = () => {
    const { username, password, name, lastname, dni } = this.state;

    axios.post("http://192.168.0.200:4567/users", {
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

      alert("(*)Verifica los campos del registro");
    });
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#6b7a8f',
  },
  container2: {
    marginTop: 30,
    justifyContent: 'center',
    backgroundColor: '#6b7a8f',
    paddingRight: 50,
    paddingLeft: 50,
  },
  containerButton: {
    marginTop: 30,
  },
  welcome: {
    fontSize: 27,
    textAlign: 'center',
    color: 'white',
    marginTop:30,
  },
  input: {
    margin: 15,
    marginTop: 8,
    height: 30,
    padding: 5,
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',  
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
    paddingRight: 110,
    paddingLeft: 110,
  },
  getStartedText: {
    marginTop: 30,
    fontSize: 14,
    color: 'white',
    lineHeight: 24,
    textAlign: 'center',
  }
})
