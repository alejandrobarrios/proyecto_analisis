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

export default class AnswerScreen extends React.Component {
  static navigationOptions ={ 
   header:null,
  };


  constructor(props){
    super(props);
    this.state = {puntos:"",
      correcta: "",
    };
  }

  async componentWillMount () {
    const { navigation } = this.props;
    const identificador = navigation.getParam('desc', 'NO-Ident');
    axios.post(API_HOST+"/getanswer", {
      description: identificador
      }, {
        headers: { 'Authorization' : await AsyncStorage.getItem('userToken')}
    })
    .then(response => JSON.parse(JSON.stringify(response)))
        .then(response => {
          var r = response.data.Point;
          var c = response.data.Correctas;
          var l = response.data.level;
          this.setState({puntos : r, correcta:c, });
        })
  }

  render() {
    const { navigation } = this.props;
    const po=this.state.puntos.point;
    const cor=this.state.correcta.description;
    const identificador = navigation.getParam('desc', 'NO-Ident');

    var a = String(identificador);
    var b = String(cor);
    var s ;
    var j ;

    if(a==b){
      s = 'Correcta';
    }else{
      s = 'Incorrecta'
    }


    return (
      <View style={styles.container}> 

        <Text style={styles.welcome}> Su respuesta ha sido : {s} </Text>
        
        <Text style={styles.welcome}> Su puntaje es : {po} </Text>

        <View style={styles.button}>
          <Button title="Volver a jugar" onPress={this._handlePlay} color = '#F2B558' />
        </View>

         <View style={styles.button}>
          <Button title="Volver a inicio" onPress={this._handleBack} color = '#37435D' />
        </View>
      </View>
    );
  }


_handleBack = async () => {
    this.props.navigation.navigate('Home');
  };

  _handlePlay = async () => {
    axios.post(API_HOST+"/stats",{
      },{
        headers: {'Authorization' : await AsyncStorage.getItem('userToken')}
    })
      .then(response => JSON.parse(JSON.stringify(response)))
      .then(response => {
      var p = JSON.parse(JSON.stringify(response.data.Point.point));
      var cat1 = JSON.parse(JSON.stringify(response.data.Level_examen_clinica.level_examen_clinica));
      var cat2 = JSON.parse(JSON.stringify(response.data.Level_farmacologia.level_farmacologia));
      var cat3 = JSON.parse(JSON.stringify(response.data.Level_enfermedades.level_enfermedades));
      var cat4 = JSON.parse(JSON.stringify(response.data.Level_clinica_medica.level_clinica_medica));
      var cat5 = JSON.parse(JSON.stringify(response.data.Level_epidemiologia.level_epidemiologia));
      var cat6 = JSON.parse(JSON.stringify(response.data.Level_quirurgica.level_quirurgica));
      this.props.navigation.navigate('Play',{'puntos': p, 'c1': cat1, 'c2': cat2, 'c3': cat3, 'c4': cat4, 'c5': cat5, 'c6': cat6});
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
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 80,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
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
    marginTop:15,
    color: 'rgba(0,0,0, 1)',
    paddingRight: 40,
    paddingLeft: 40,
  },
})