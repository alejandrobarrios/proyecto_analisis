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
            Inicia sesión
          </Text>

          <View style={styles.inputPlus}>
            <TextInput
              placeholder="Usuario"
              style={styles.input1}
              onChangeText={(value) => this.setState({ username: value })}
              value={this.state.username}
              maxLength = {10}
            />

            <TextInput
              maxLength = {10}
              placeholder="Contraseña"
              style={styles.input2}
              secureTextEntry={true}
              onChangeText={(value) => this.setState({ password: value })}
              value={this.state.password}
            />
          </View>
          <View style={styles.centerButton}>
            <View style={styles.button}>
              <Button color="#F2B558" title="Iniciar" onPress={this._signIn} />
            </View>
            
            <View style={styles.button}>  
              <Button color="#37435D" title="Crear usuario" onPress={this._handleCreateAccount} />
            </View>
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
   
    axios.post(API_HOST+"/login", {
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
    backgroundColor: '#6b7a8f',
  },
  welcomeImage: {
    width: 250,
    height: 250,
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
  input1: {
    margin: 15,
    marginTop: 8,
    height: 30,
    padding: 5,
    paddingRight: 144,
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    alignSelf: 'flex-start',    
  },
  input2: {
    margin: 15,
    marginTop: 8,
    height: 30,
    padding: 5,
    paddingRight: 104,
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    alignSelf: 'flex-start',    
  },
  inputPlus: {
    paddingLeft: 89,
    paddingTop: 20,
  },
  getStartedText: {
    marginTop: -10,
    fontSize: 17,
    color: '#37435D',
    lineHeight: 32,
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    height: 35,

  },
  button: {
    margin:10,
    paddingTop: 4,
    paddingBottom: 1,
    paddingRight: 40,
    paddingLeft: 40,
    marginTop: 5,
    width: 300,
    color: '#F13E3E',
  },
  acomodar:{
    marginBottom: 50,
  },
  centerButton:{
    alignItems:'center',
    paddingTop: 25,

  }
})
