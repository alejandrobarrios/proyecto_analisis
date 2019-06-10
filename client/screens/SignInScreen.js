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
  static navigationOptions = {
    title: 'Bienvenido a TriviaVet',
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
      <Text style={styles.getStartedText}>
        Debe loguearse para poder ingresar
      </Text>
        <View style={styles.welcomeContainer}>
         <Image
            source={
            __DEV__
                ? require('../assets/images/LogoBlue.png')
                : require('../assets/images/robot-prod.png')
            }
            style={styles.welcomeImage}
          />
        </View>

        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={(value) => this.setState({ username: value })}
          value={this.state.username}
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(value) => this.setState({ password: value })}
          value={this.state.password}
        />

        <View style={styles.button}>
          <Button title="Sign in" onPress={this._signIn} />
        </View>
          
        <View style={styles.button}>  
          <Button title="Create Account" onPress={this._handleCreateAccount} />
        </View>
      </View>
    );
  }

  _handleCreateAccount = async () => {
    this.props.navigation.navigate('CreateAccount');
  };

  _signIn = () => {
    const { username, password } = this.state;
    axios.post("http://192.168.0.17:4567/login", {
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
        // Handle the JWT response here
        AsyncStorage.setItem('userToken', response.config.headers.Authorization);
        this.props.navigation.navigate('Home');
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
  welcomeImage: {
    width: 120,
    height: 100,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: 0,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 80,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  input: {
    margin: 15,
    marginTop: -10,
    height: 30,
    padding: 5,
    fontSize: 16,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#4228F8'
  },
  getStartedText: {
    marginTop: -150,
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  button: {
    margin:10,
  }
})
