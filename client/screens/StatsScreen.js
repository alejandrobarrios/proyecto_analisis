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
import ProgressCircle from 'react-native-progress-circle'

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
    var a = new Number(r);
    var b = new Number(w);

    let cant = (b + a);
    let cor = Math.round((a * 100)/cant);
    let inc = Math.round((b * 100)/cant);
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>

          <Text style={styles.welcome}> Su puntaje es: {p} </Text>

          <Text style={styles.welcomeGreen}> Porcentaje de respuestas correctas </Text>

          <ProgressCircle
            percent={cor}
            radius={50}
            borderWidth={8}
            color="#21A950"
            shadowColor="#999"
            bgColor="#fff"
          >
            <Text style={{ fontSize: 18 }}>{cor}%</Text>
          </ProgressCircle>

           <Text style={styles.welcomeRed}> Porcentaje de respuestas incorrectas </Text>

          <ProgressCircle
            percent={inc}
            radius={50}
            borderWidth={8}
            color="#DE3D3D"
            shadowColor="#999"
            bgColor="#fff"
          >
            <Text style={{ fontSize: 18 }}>{inc}%</Text>
          </ProgressCircle>

        </View>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#37435D',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginBottom: 18,
  },
   welcomeRed: {
    fontSize: 20,
    textAlign: 'center',
    color: '#DE3D3D',
    margin: 10,
  },
  welcomeGreen: {
    fontSize: 20,
    textAlign: 'center',
    color: '#21A950',
    margin: 10,
  },
  welcomeImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginLeft: 0,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 20,
  },
  button: {
    marginTop:50,
    paddingRight: 110,
    paddingLeft: 110,
    
  },
})