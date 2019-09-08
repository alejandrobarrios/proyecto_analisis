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
  FlatList,
} from 'react-native';
import { WebBrowser } from 'expo';
import axios from 'axios';

import { MonoText } from '../components/StyledText';

export default class InstructionsScreen extends React.Component {
  static navigationOptions = {
     title: 'Instrucciones',
     headerTintColor: '#fff',
     headerStyle: {
     backgroundColor: '#37435D',  
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container2}>
          <FlatList
            data={[
              {key: '1. Seleccionar JUGAR'},
              {key: '2. Elegir categoría'},
              {key: '3. Para responder debera presionar sobre el numero de la izquierda de la pantalla con la opcion que desee elegir'},
              {key: '4. Al responder se mostrará su puntaje'},
              {key: '5. Para volver a jugar deberá presionar VOLVER A SELECCIONAR UNA CATEGORÍA'},
              {key: '6. Para salir, presionar VOLVER A LA PANTALLA PRINCIPAL'},
              {key: '7. Ver estadísticas de su juego pulsando ESTADÍSTICAS'},
              {key: '8. Para desloguearse, pulsar CERRAR SESIÓN'},
            ]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
          />

          <View style={styles.button}>
            <Button color="#F2B558" title="Volver atrás" onPress={this._handleBack} />
          </View>
        </View> 
      </View>
          
    )
  };
  

  _handleBack =  () => {
    this.props.navigation.navigate('Home')
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6b7a8f',
  },
  container2: {
    flex: 1,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  button: {
    margin:10,
    paddingTop: 4,
    paddingBottom: 1,
    paddingRight: 60,
    paddingLeft: 60,
    marginTop: -50,
    color: '#F13E3E',
  },

  item: {
    marginTop: 15,
    padding: 10,
    fontSize: 14,
    textAlign: 'center', 
    color: "white",
  },
});
