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
    const p = navigation.getParam('puntos','nada');
    const r = navigation.getParam('correctas','nada');
    const w = navigation.getParam('incorrectas','nada');
    const users = navigation.getParam('user','nada');
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
        <Text style={styles.welcome}> Su puntaje es: {p} </Text>
        <Text style={styles.welcome}> Respuestas correctas: {r} </Text>
        <Text style={styles.welcome}> Respuestas incorrectas: {w} </Text>
         
      </View>
    );
  }

  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(77,94,129, 1)',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    margin: 10,
  },
  welcomeImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 10,
    marginLeft: 0,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 20,
  },
  button: {
    margin:10,
    backgroundColor: 'rgba(77,94,129, 1)',
  }
})