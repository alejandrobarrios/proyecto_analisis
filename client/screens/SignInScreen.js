import React from 'react';
import {API_HOST} from 'react-native-dotenv';
import {
  AsyncStorage,
  View,
  Image,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

export default class SignInScreen extends React.Component {
  static navigationOptions ={ 
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (  
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/trviavetlogo.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

        <View style={styles.acomodar}>
          <Text style={styles.getStartedText}>
            Iniciar Sesion
          </Text>
      
          <TextInput
            placeholder="Usuario"
            style={styles.input}
            onChangeText={(value) => this.setState({ username: value })}
            value={this.state.username}
          />

          <TextInput
            placeholder="Contraseña"
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(value) => this.setState({ password: value })}
            value={this.state.password}
          />

          <View style={styles.button}>
            <Button title="Ingresar" onPress={this._signIn} />
          </View>
          
          <View style={styles.button}>  
            <Button title="Crear una cuenta" onPress={this._handleCreateAccount} />
          </View>
        </View>
      
      </View>
      
      
    );
  }

  _handleCreateAccount = async () => {
    this.props.navigation.navigate('CreateAccount');
  };

  _signIn = () => {
    const { username, password } = this.state;
   
    axios.post("http://192.168.0.126:4567/login", {
      username: username,
      password: password,
    }, {
      auth: {
        username: username,
        password: password
      }
    })
      .then(response => JSON.parse(JSON.stringify(response)))
      .then(response => {
        var p = JSON.parse(JSON.stringify(response.data.username));
        console.log(p);
        AsyncStorage.setItem('userToken', response.config.headers.Authorization);
        this.props.navigation.navigate('Home',{'user': p});
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
  welcomeImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: -10,
    marginLeft: 0,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
    borderBottomColor: '#4228F8'
  },
  getStartedText: {
    marginTop: -10,
    fontSize: 17,
    color: '#FFFFFF',
    lineHeight: 24,
    textAlign: 'center',
  },
  button: {
    margin:10,
  },
  acomodar:{
    marginBottom: 50,
  }
})
