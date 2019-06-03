import React from 'react';
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

export default class PlayScreen extends React.Component {
  static navigationOptions = {
    title: 'You are sign in',
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
        <Text style={styles.welcome}> Seleccione una categoria </Text>

        <Button title="Anatomia" onPress={this._handleCategory} />

        <Button title="Animales Grandes" onPress={this._handleCategory.bind(this,'Animales Grandes')} />

        <Button title="Animales Pequeños" onPress={this._handleCategory} />

        <Button title="Quimica" onPress={this._handleCategory} />

        <Button title="Clinica" onPress={this._handleCategory} />

        <Button title="Random" onPress={this._handleCategory} />

      </View>
    );
  }

  _signIn = () => {
    const { username, password } = this.state;

    axios.post("http://192.168.0.192:4567/login", {
      username: username,
      password: password,
    }, {
      auth: {
        username: username,
        password: password
      }
    })
      .then(response => JSON.stringify(response))
      .then(response => {
        // Handle the JWT response here
        AsyncStorage.setItem('userToken', response.data);
        this.props.navigation.navigate('App');
      })
    .catch((error) => {
      if(error.toString().match(/401/)) {
        alert("Username or Password incorrect");
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
    margin: 10,
  },
  input: {
    margin: 15,
    height: 40,
    padding: 5,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#4228F8'
  }
})
