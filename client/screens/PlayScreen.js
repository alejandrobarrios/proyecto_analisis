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
  static navigationOptions = {
    title: 'Seleccione una categoria',
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
        <Text style={styles.welcome}> Su puntaje actual es : {question} </Text>
        <Text style={styles.welcome}> Se le sumara un punto, si le acierta </Text>
        <Text style={styles.welcome}> No se le sumara un punto, si no le acierta </Text>
        
        <View style={styles.button}> 
<<<<<<< HEAD
          <Button title="Anatomia" onPress={this._handleCategory.bind(this, 'anatomia')} />
=======
          <Button title="Anatomía" onPress={this._handleCategory.bind(this,'anatomia')} />
>>>>>>> a638ddea5566fadca2069f4c847648f6c783dc96
        </View>
        
        <View style={styles.button}> 
         <Button title="Animales Grandes" onPress={this._handleCategory.bind(this, 'animales grandes')} />
        </View>
        
        <View style={styles.button}> 
          <Button title="Animales Pequeños" onPress={this._handleCategory.bind(this, 'animales pequeños')} />
        </View>
        
        <View style={styles.button}> 
<<<<<<< HEAD
          <Button title="Quimica" onPress={this._handleCategory.bind(this, 'quimica')} />
        </View>
        
        <View style={styles.button}> 
          <Button title="Clinica" onPress={this._handleCategory.bind(this, 'clinica')} />
=======
          <Button title="Química" onPress={this._handleCategory.bind(this,'Quimica')} />
        </View>
        
        <View style={styles.button}> 
          <Button title="Clínica" onPress={this._handleCategory.bind(this,'Clinica')} />
>>>>>>> a638ddea5566fadca2069f4c847648f6c783dc96
        </View>
        
        <View style={styles.button}>
          <Button title="Random" onPress={this._handleCategory.bind(this, 'random')} />
        </View>

        <View style={styles.button}>
          <Button title="Volver atrás" onPress={this._handleBack} />
        </View>

      </View>
    );
  } 
  _handleBack = async () => {
    this.props.navigation.navigate('Home');
  };


<<<<<<< HEAD
  _handleCategory =  async (categoria) => {

    axios.post("http://192.168.0.17:4567/getquestions", {
      category: categoria,
    }, {
      headers: {'Authorization' : await AsyncStorage.getItem('userToken')}
=======
    axios.get("http://192.168.0.31:4567/questions", {
      category: description
>>>>>>> a638ddea5566fadca2069f4c847648f6c783dc96
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
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 15,
    textAlign: 'center',
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
    marginTop:20,
  }
})