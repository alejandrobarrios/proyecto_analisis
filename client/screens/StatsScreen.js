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

export default class StatsScreen extends React.Component {
   static navigationOptions = {
     title: 'Estadísticas',
     headerTintColor: '#fff',
     headerStyle: {
     backgroundColor: 'rgba(77,94,129,1)',  
    }
  };

  render() {
    const { navigation } = this.props;
    const question = navigation.getParam('resp','nada');
    return (
      <View style={styles.container}> 
        <Text style={styles.welcome}> Su puntaje es {question} </Text>

       <View style={styles.button}>
          <Button title="Volver atrás" onPress={this._handleBack} />
        </View>
         
      </View>
    );
  }


_handleBack = async () => {
    this.props.navigation.navigate('Home');
  };

  /*_handlePlay = async () => {
    axios.post("http://192.168.0.31:4567/stats",{
      },{
        headers: {'Authorization' : await AsyncStorage.getItem('userToken')}
    })
      .then(response => JSON.parse(JSON.stringify(response)))
      .then(response => {
      var p = JSON.parse(JSON.stringify(response.data.Point.point));
      console.log(p);
      this.props.navigation.navigate('Play',{'puntos': p});
    })
    .catch((error) => {
      if(error.toString().match(/401/)) {
        alert("Username o Password incorrecto");
        return;
      }
      alert("Networking Error");
    });
  };*/
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(77,94,129, 1)',
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
    margin:10,
    backgroundColor: 'rgba(77,94,129, 1)',
  }
})