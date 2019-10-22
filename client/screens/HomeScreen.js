import React from 'react';
import {API_HOST} from 'react-native-dotenv';
import {
  AsyncStorage,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import axios from 'axios';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;
    const user = navigation.getParam('user','nada');
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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
            <Text style={styles.welcome}>
              ¡{user}! ¿Qué quieres hacer?
            </Text>
            <View style={styles.move}>
              <View style={styles.button}>
                <Button color="#F2B558" title="Jugar" onPress={this._handlePlay} />
              </View>

              <View style={styles.button}>
                <Button color="#37435D" title="Ver estadísticas" onPress={this._handleStats} />
              </View>

              <View style={styles.button}>
                <Button color="#37435D" title="Ver instrucciones" onPress={this._handleInstructions} />
              </View>

              <View style={styles.button}>
                <Button color="#37435D" title="Ver top 10 Puntuaciones" onPress={this._handlesScore} />
              </View>

              <Text onPress={this._handleLogout} style={styles.logout}  >
                Cerrar Sesión
              </Text>
            </View>
        </ScrollView>
      </View>
    );
  }

  _handleLogout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

   _handleInstructions =  () => {
    this.props.navigation.navigate('Rules');
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
      console.log(p);
      console.log(cat1);
      console.log(cat2);
      console.log(cat3);
      console.log(cat4);
      console.log(cat5);
      console.log(cat6);
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

  _handleStats = async () => {
    axios.post(API_HOST+"/allstats",{
      },{
        headers: {'Authorization' : await AsyncStorage.getItem('userToken')}
    })
      .then(response => JSON.parse(JSON.stringify(response)))
      .then(response => {
      var p = JSON.parse(JSON.stringify(response.data.Point.point));
      var r = JSON.parse(JSON.stringify(response.data.Correctas.amount_right));
      var w = JSON.parse(JSON.stringify(response.data.Incorrectas.amount_wrong));
      
      console.log(p);
      console.log(r);
      console.log(w);
      
      this.props.navigation.navigate('Stats',{'puntos': p, 'correctas': r, 'incorrectas': w });
    })  
    .catch((error) => {
      if(error.toString().match(/401/)) {
        alert("Se ha producido un error al ver estadísticas");
        return;
      }
      alert("Networking Error");
    });
  };


  _handlesScore = async () => {
    axios.post(API_HOST+"/allscore",{
      },{
        headers: {'Authorization' : await AsyncStorage.getItem('userToken')}
    })
      .then(response => JSON.parse(JSON.stringify(response)))
      .then(response => {
      var p1 = JSON.parse(JSON.stringify(response.data.Point1.point));
      var a1 = JSON.parse(JSON.stringify(response.data.User1.username));
      var p2 = JSON.parse(JSON.stringify(response.data.Point2.point));
      var a2 = JSON.parse(JSON.stringify(response.data.User2.username));
      var p3 = JSON.parse(JSON.stringify(response.data.Point3.point));
      var a3 = JSON.parse(JSON.stringify(response.data.User3.username));
      var p4 = JSON.parse(JSON.stringify(response.data.Point4.point));
      var a4 = JSON.parse(JSON.stringify(response.data.User4.username));
      var p5 = JSON.parse(JSON.stringify(response.data.Point5.point));
      var a5 = JSON.parse(JSON.stringify(response.data.User5.username));
      var p6 = JSON.parse(JSON.stringify(response.data.Point6.point));
      var a6 = JSON.parse(JSON.stringify(response.data.User6.username));
      var p7 = JSON.parse(JSON.stringify(response.data.Point7.point));
      var a7 = JSON.parse(JSON.stringify(response.data.User7.username));
      var p8 = JSON.parse(JSON.stringify(response.data.Point8.point));
      var a8 = JSON.parse(JSON.stringify(response.data.User8.username));
      var p9 = JSON.parse(JSON.stringify(response.data.Point9.point));
      var a9 = JSON.parse(JSON.stringify(response.data.User9.username));
      var p10 = JSON.parse(JSON.stringify(response.data.Point10.point));
      var a10 = JSON.parse(JSON.stringify(response.data.User10.username));
      console.log(p1);
      this.props.navigation.navigate('Score',{'puntos1': p1,'puntos2': p2,'puntos3': p3,'puntos4': p4,'puntos5': p5,'puntos6': p6,'puntos7': p7,'puntos8': p8,'puntos9': p9,'puntos10': p10,'user1': a1,'user2': a2,'user3': a3,'user4': a4,'user5': a5,'user6': a6,'user7': a7,'user8': a8,'user9': a9,'user10': a10});
    })
    .catch((error) => {
      if(error.toString().match(/401/)) {
        alert("Username o Password incorrecto");
        return;
      }
      alert(Error);
    });
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6b7a8f',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 251,
    height: 251,
    marginTop: 70,
    resizeMode: 'contain',
    marginLeft: 0,
  },
  welcome: {
    fontSize: 17,
    textAlign: 'center',
    color: 'white',
    marginTop:30,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  logout: {
    marginTop:90,
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  button: {
    marginTop:15,
    color: 'rgba(0,0,0, 1)',
    paddingRight: 40,
    paddingLeft: 40,
  },
  move: {
    marginTop: 10,
  }
});
