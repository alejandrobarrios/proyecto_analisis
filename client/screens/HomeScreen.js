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

            <View style={styles.button}>
              <Button title="Jugar" onPress={this._handlePlay} />
            </View>

            <View style={styles.button}>
              <Button title="Estadisticas" onPress={this._handleStats} />
            </View>

            <View style={styles.button}>
              <Button title="Instrucciones" onPress={this._handleInstructions} />
            </View>

            <View style={styles.button}>
              <Button title="Cerrar Sesion" onPress={this._handleLogout} />
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
  };

  _handleStats = async () => {
    axios.post("http://192.168.0.31:4567/allstats",{
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
      this.props.navigation.navigate('Stats',{'puntos': p, 'correctas': r, 'incorrectas': w});
    })  
    .catch((error) => {
      if(error.toString().match(/401/)) {
        alert("Se ha producido un error al ver estadísticas");
        return;
      }
      alert("Networking Error");
    });
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(77,94,129, 1)',
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
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 50,
    marginLeft: 0,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginTop:-15,
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
    fontSize: 14,
    color: '#2e78b7',
    textAlign: 'center',
  },
  button: {
    marginTop:22,
    color: 'rgba(0,0,0, 1)',
  }
});
