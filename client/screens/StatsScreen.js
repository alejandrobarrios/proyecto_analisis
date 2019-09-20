import React from 'react';
import {
  AsyncStorage,
  View,
  Image,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Progress,
} from 'react-native';
import axios from 'axios';
import ProgressCircle from 'react-native-progress-circle';


export default class StatsScreen extends React.Component {
   static navigationOptions = {
     title: 'Tus estadísticas',
     headerTintColor: '#fff',
     headerStyle: {
     backgroundColor: '#37435D',  
    }
  };


  render() {
    const { navigation } = this.props;
    const p = navigation.getParam('puntos','nada');
    const r = navigation.getParam('correctas','nada');
    const w = navigation.getParam('incorrectas','nada');
    var a = new Number(r);
    var c = new Number(p);
    var b = new Number(w);
    var s ;
    var j ;
    var l ;

    let cant = (b + a);
    let cor = Math.round((a * 100)/cant);
    let inc = Math.round((b * 100)/cant);

    if(isNaN(c)){
    	l = 0;
    }else{
    	l = c;
    }

    if(isNaN(cor)){
    	s = 0;
    }else{
    	s = cor;
    }

    if(isNaN(inc)){
    	j = 0;
    }else{
    	j = inc;
    }
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
          <Text style={styles.welcome}> Puntaje </Text>

        
          <ProgressCircle
            percent={cor}
            radius={50}
            borderWidth={0}
            color="rgba(0,0,0,0)"
            shadowColor="#999"
            bgColor="#fff"
          >
            <Text style={{ fontSize: 18 }}>{p} de {cant}</Text>  
          </ProgressCircle>

        
          <Text style={styles.welcomeGreen}> Correctas </Text>

      <ProgressCircle
            percent={cor}
            radius={50}
            borderWidth={8}
            color="#21A950"
            shadowColor="#999"
            bgColor="#fff"
          >
            <Text style={{ fontSize: 18 }}>{s}%</Text>
          </ProgressCircle>


          <Text style={styles.welcomeRed}> Incorrectas </Text>

      <ProgressCircle
            percent={inc}
            radius={50}
            borderWidth={8}
             color="#DE3D3D"
            shadowColor="#999"
            bgColor="#fff"
          >
            <Text style={{ fontSize: 18 }}>{j}%</Text>
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
    backgroundColor: '#6b7a8f',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginBottom: 18,
  },
   welcomeRed: {
    alignItems: 'center',
    fontSize: 20,
    textAlign: 'right',
    color: '#fff',
    margin: 10,
  },
  welcomeGreen: {
    alignItems: 'center',
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    margin: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 20,
  },
  button: {
    marginTop:10,
    paddingRight: 110,
    paddingLeft: 110,
  },
  welcomeImage: {
    width: 161,
    height: 161,
    marginTop: -30,
    resizeMode: 'contain',
    marginLeft: 0,
    justifyContent: 'center',
  },
})