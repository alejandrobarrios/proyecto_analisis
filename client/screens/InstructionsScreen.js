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
    textAlign : 'center',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: 'rgba(77,94,129,1)',  
    }
  };

  render() {
    return (
      <View style={styles.container}>

        <FlatList
          data={[
            {key: '1. Seleccionar JUGAR'},
            {key: '2. Elegir categoría'},
            {key: '3. Para responder '},
            {key: '4. Al responder se mostrará su puntaje'},
            {key: '5. Para volver a jugar debera presionar VOLVER A SELECCIONAR UNA CATEGORÍA'},
            {key: '6. Para salir, presionar VOLVER A LA PANTALLA PRINCIPAL'},
            {key: '7. Ver estadisticas de su juego pulsando ESTADISTICAS'},
            {key: '8. Para desloguearse, pulsar CERRAR SESIÓN'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />

        <View style={styles.button}>
          <Button title="Volver atrás" onPress={this._handleBack} />
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
    backgroundColor: 'rgba(77,94,129, 1)',
  },
  
  button: {
    marginTop:20,
  },

  item: {
    marginTop: 15,
    padding: 10,
    fontSize: 14,
    textAlign: 'center', 
    color: "white",
  },
});
