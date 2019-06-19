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

export default class QuestionScreen extends React.Component {
  static navigationOptions ={ 
    title: 'La pregunta es...',
     headerStyle: {
      backgroundColor: '#37435D',
     },
     headerTintColor: '#fff',

  };

  constructor(props) {
    super(props);
    this.state = {
      ret: ''
    }
  }


  render() {
    const { navigation } = this.props;
    const question = navigation.getParam('description','nada');
    const option1 = navigation.getParam('opcion1','nada');
    const option2 = navigation.getParam('opcion2','nada');
    const option3 = navigation.getParam('opcion3','nada');
    const option4 = navigation.getParam('opcion4','nada');
    console.log(navigation.getParam('description'));
    return (
      <View style={styles.container}>
        <Text style={styles.question}>
          {question} 
        </Text>
        
        <Text style={styles.welcome}>
          {option1} 
        </Text>

        <Text style={styles.welcome}>
          {option2} 
        </Text>

        <Text style={styles.welcome}>
          {option3} 
        </Text>

        <Text style={styles.welcome}>
         {option4} 
        </Text>
        <View style={styles.welcome2}>
          <TextInput
            placeholder="Respuesta"
            style={styles.input}
            onChangeText={(value) => this.setState({ ret: value })}
            value={this.state.description}
          />

           <View style={styles.button}>
            <Button color='#F2B558' title="Responder" onPress={this._handleAnswer} />
          </View>
        </View>
      </View>
    );
  }

  _handleAnswer = async () => {
    const { ret } = this.state;
    axios.post("http://192.168.0.17:4567/getanswer", {
      description: ret,
    }, {
      headers: {'Authorization' : await AsyncStorage.getItem('userToken')}
    })
      .then(response => JSON.parse(JSON.stringify(response)))
      .then(response => {
        var p = JSON.parse(JSON.stringify(response.data.Point.point));
        var c = JSON.parse(JSON.stringify(response.data.Correctas.description));
        console.log(p);
        console.log(c);
        this.props.navigation.navigate('Answer',{'puntos': p,'correcta': c});
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
    justifyContent: 'center',
    backgroundColor: '#6b7a8f',
  },
  question: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginTop: -200,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginTop:20,
  },
  welcome2: {
    marginTop: 50,
  },
  input: {
    margin: 15,
    marginTop: 8,
    marginLeft: 110,
    marginRight: 110,
    height: 30,
    padding: 5,
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',  
  },
  getStartedText: {
    marginTop: -150,
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  button: {
    marginTop:10,
    paddingRight: 110,
    paddingLeft: 110,
  },
})
