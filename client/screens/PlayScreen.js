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

export default class PlayScreen extends React.Component {
  static navigationOptions ={ 
    title: 'Seleccione una categoría',
     headerStyle: {
      backgroundColor: '#F2B558',
     },headerTintColor: '#fff',

  };

  constructor(props) {
    super(props);
    this.state = {
      category: ''
    }
  }

  render() {
    const { navigation } = this.props;
    const question = navigation.getParam('puntos','nada');
    return (

      <View style={styles.container}>

        <Text style={styles.welcome}> Puntaje actual: {question} </Text>
        
        <View style={styles.button}> 
          <Button title="Anatomía" onPress={this._handleCategory.bind(this, 'anatomia')} color = '#37435D' />
        </View>
        
        <View style={styles.button}> 
         <Button title="Animales Grandes" onPress={this._handleCategory.bind(this, 'animales grandes')} color = '#37435D' />
        </View>
        
        <View style={styles.button}> 
          <Button title="Animales Pequeños" onPress={this._handleCategory.bind(this, 'animales pequeños')} color = '#37435D' />
        </View>
        
        <View style={styles.button}> 
          <Button title="Química" onPress={this._handleCategory.bind(this, 'quimica')} color = '#37435D' />
        </View>
        
        <View style={styles.button}> 
          <Button title="Clínica" onPress={this._handleCategory.bind(this, 'clinica')} color = '#37435D' />
        </View>

      </View>
    );
  } 

  _handleCategory =  async (categoria) => {

    axios.post("http://192.168.0.31:4567/getquestions", {
      category: categoria,
    }, {
      headers: {'Authorization' : await AsyncStorage.getItem('userToken')}
    })
      .then(response => JSON.parse(JSON.stringify(response)))
      .then(response => {
        var q = JSON.parse(JSON.stringify(response.data.Question.description));
        var op1 = JSON.parse(JSON.stringify(response.data.Opcion1.description));
        var op2 = JSON.parse(JSON.stringify(response.data.Opcion2.description));
        var op3 = JSON.parse(JSON.stringify(response.data.Opcion3.description));
        var op4 = JSON.parse(JSON.stringify(response.data.Opcion4.description));
        console.log(q);
        this.props.navigation.navigate('Question',{'description': q, 'opcion1': op1, 'opcion2': op2, 'opcion3': op3,'opcion4': op4});
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
  welcome: {
    fontSize: 22,
    textAlign: 'center',
    color: 'white',
    marginTop: 10,
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
    marginTop:15,
    color: 'rgba(0,0,0, 1)',
    paddingRight: 40,
    paddingLeft: 40,
  },
})
