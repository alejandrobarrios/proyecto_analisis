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
    const level1 = navigation.getParam('c1', 'nada');
    const level2 = navigation.getParam('c2', 'nada');
    const level3 = navigation.getParam('c3', 'nada');
    const level4 = navigation.getParam('c4', 'nada');
    const level5 = navigation.getParam('c5', 'nada');
    const level6 = navigation.getParam('c6', 'nada');

    return (

      <View style={styles.container}>

        <Text style={styles.welcome}> Puntaje actual: {question} </Text>
        
        <View style={styles.button}> 
          <Button title="Ex-Clinica" onPress={this._handleCategory.bind(this, 'examen_clinica')} color = '#37435D' />
        </View>

        <Text style={styles.welcome}> {level1} {level2} {level3} {level4} {level5} {level6} </Text>
        
        <View style={styles.button}> 
         <Button title="Farmacología" onPress={this._handleCategory.bind(this, 'farmacologia')} color = '#37435D' />
        </View>
        
        <View style={styles.button}> 
          <Button title="Enfermedades" onPress={this._handleCategory.bind(this, 'enfermedades')} color = '#37435D' />
        </View>
        
        <View style={styles.button}> 
          <Button title="Clinica médica" onPress={this._handleCategory.bind(this, 'clinica_medica')} color = '#37435D' />
        </View>
        
        <View style={styles.button}> 
          <Button title="Epidemiología" onPress={this._handleCategory.bind(this, 'epidemiologia')} color = '#37435D' />
        </View>

        <View style={styles.button}> 
          <Button title="Quirúrgica" onPress={this._handleCategory.bind(this, 'quirurgica')} color = '#37435D' />
        </View>

      </View>
    );
  } 

 _handleCategory =  async (categoria) => {

    axios.post(API_HOST+"/getcat", {
      category: categoria,
    }, {
      headers: {'Authorization' : await AsyncStorage.getItem('userToken')}
    })
      .then(response => JSON.parse(JSON.stringify(response)))
      .then(response => {
        var q = JSON.parse(JSON.stringify(response.data.category.category));
        console.log(q);
        this.props.navigation.navigate('Question',{'category': q});
      })
    .catch((error) => {
      if(error.toString().match(/401/)) {
        alert("Usuario o password incorrecto");
        return;
      }

      alert("Esta categoria no posee preguntas para responder. Seleccione otra. ");
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
