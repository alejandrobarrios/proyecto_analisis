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
  static navigationOptions = {
    title: 'Escriba una de las opciones',
  };

  constructor(props) {
    super(props);
    this.state = {
      description: ''
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
    //const otherParam = navigation.getParam('otherParam', 'some default value');
    return (
      <View style={styles.container}>
        <Text style={styles.question}>
          Pregunta : {question} 
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

        <TextInput
          placeholder="Answer"
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(value) => this.setState({ description: value })}
          value={this.state.description}
        />

         <View style={styles.button}>
          <Button title="Send Answer" onPress={this._handleAnswer} />
        </View>

      </View>
    );
  }

  _handleAnswer = async () => {
    const { description } = this.state;

    axios.post("http://192.168.0.17:4567/getanswer", {
      description: description,
    }, {
      headers: {'Authorization' : await AsyncStorage.getItem('userToken')}
    })
      .then(response => JSON.parse(JSON.stringify(response)))
      .then(response => {
        var p = JSON.parse(JSON.stringify(response.data.Point.point));
        console.log(p);
        this.props.navigation.navigate('Answer',{'resp': p});
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
    backgroundColor: '#F5FCFF',
  },
  question: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: -150,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 7,
  },
  input: {
    margin: 10,
    height: 40,
    padding: 5,
    fontSize: 16,
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
  }
})
