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
      description: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> Seleccione una categoria </Text>
        
        <View style={styles.button}> 
          <Button title="Anatomía" onPress={this._handleCategory.bind(this,'anatomia')} />
        </View>
        
        <View style={styles.button}> 
         <Button title="Animales Grandes" onPress={this._handleCategory.bind(this,'Animales Grandes')} />
        </View>
        
        <View style={styles.button}> 
          <Button title="Animales Pequeños" onPress={this._handleCategory.bind(this,'Animales Pequños')} />
        </View>
        
        <View style={styles.button}> 
          <Button title="Química" onPress={this._handleCategory.bind(this,'Quimica')} />
        </View>
        
        <View style={styles.button}> 
          <Button title="Clínica" onPress={this._handleCategory.bind(this,'Clinica')} />
        </View>
        
        <View style={styles.button}>
          <Button title="Random" onPress={this._handleCategory.bind(this,'Random')} />
        </View>

        <View style={styles.button}>
          <Button title="Volver atrás" onPress={this._handleBack} />
        </View>

      </View>
    );
  } 
  _handleBack = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('App');
  };

  _handleCategory = (category) => {
    const {description} = category;

    axios.get("http://192.168.0.31:4567/questions", {
      category: description
    })
      .then(response => JSON.stringify(response))
      .then(response => {
        this.props.navigation.navigate('Question',response.data);
      })
    .catch((error) => {
      if(error.toString().match(/401/)) {
        alert("No hay preguntas en la categoria seleccionada");
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
  },
  button: {
    marginTop:20,
  }
})
