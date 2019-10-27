import React from 'react';
import {API_HOST} from 'react-native-dotenv';
import {
  AsyncStorage,
  View,
  Alert,
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

  constructor(props){
    super(props);
    this.state = {question: "",
    option1:"",option2:"",option3:"",option4:"",
    };
  }


 _handleBack = async () => {
    this.props.navigation.navigate('Home');
  };

  _handlePlay = async () => {
    axios.post(API_HOST+"/stats",{
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

  componentWillMount = async () =>  {
    const { navigation } = this.props;
    const cat = navigation.getParam('category', 'NO-Category');
    axios.post(API_HOST+"/getquestions", {
      category: cat
      }, {
        headers: { 'Authorization' : await AsyncStorage.getItem('userToken')}
    })
    .then(response => JSON.parse(JSON.stringify(response)))
    .then(response => {
      var q = JSON.parse(JSON.stringify(response.data.Question));
      var op1 = JSON.parse(JSON.stringify(response.data.Opcion1));
      var op2 = JSON.parse(JSON.stringify(response.data.Opcion2));
      var op3 = JSON.parse(JSON.stringify(response.data.Opcion3));
      var op4 = JSON.parse(JSON.stringify(response.data.Opcion4));
      this.setState({question: q, option1: op1, option2: op2, option3: op3, option4: op4});
    })
    .catch((error) => {
      if(error.toString().match(/401/)) {
        alert("Username o Password incorrecto");
        return;
      }
      Alert.alert(
    'Ha contestado todas las preg. de la categoria',
    'Seleccione una opcion: ',
    [
      {
        text: 'Volver al menu',
        onPress: async () => this._handleBack() ,
        style: 'cancel',
      },
      {text: 'Elegir Cat.', onPress: async () => this._handlePlay() },
    ]
  );
    });
  }

  async componentWillReceiveProps () {
    const { navigation } = this.props;
    const cat = navigation.getParam('category', 'NO-Category');
    axios.post(API_HOST+"/getquestions", {
      category: cat,
    }, {
      headers: {'Authorization' : await AsyncStorage.getItem('userToken')}
    })
      .then(response => JSON.parse(JSON.stringify(response)))
      .then(response => {
        var q = JSON.parse(JSON.stringify(response.data.Question));
        var op1 = JSON.parse(JSON.stringify(response.data.Opcion1));
        var op2 = JSON.parse(JSON.stringify(response.data.Opcion2));
        var op3 = JSON.parse(JSON.stringify(response.data.Opcion3));
        var op4 = JSON.parse(JSON.stringify(response.data.Opcion4));
        console.log(q);
      this.setState({question: q, option1: op1, option2: op2, option3: op3, option4: op4});
    })
      .catch((error) => {
      if(error.toString().match(/401/)) {
        alert("Username o Password incorrecto");
        return;
      }

      alert("Networking Error");
    });
  }


  render() {

    const {navigate} = this.props.navigation;
    const q=this.state.question.description;
    const opcion1=this.state.option1.description;
    const opcion2=this.state.option2.description;
    const opcion3=this.state.option3.description;
    const opcion4=this.state.option4.description;

    var a = String(opcion1);
    var b = String(opcion2);
    var c = String(opcion3);
    var d = String(opcion4);

    return (

      <View style={styles.container}>

        <Text style={styles.question}>
          {q}
        </Text>

        <View style={styles.button}>
         <Button color = '#F2B558' title= {a} onPress = {() => navigate('Answer', {'desc': opcion1})}
          />
        </View>

        <View style={styles.button}>
          <Button color = '#F2B558' title= {b} onPress = {() => navigate('Answer', {'desc': opcion2})}
          />
        </View>

        <View style={styles.button}>
          <Button color = '#F2B558' title= {c} onPress = {() => navigate('Answer', {'desc': opcion3})}
          />
        </View>

        <View style={styles.button}>
          <Button color = '#F2B558' title= {d} onPress = {() => navigate('Answer', {'desc': opcion4})}
          />
        </View>

      </View>
    );
  }

  _handleAnswer = async (respu) => {
    console.log(respu);
    axios.post(API_HOST+"/getresp", {
      description: respu,
    }, {
      headers: {'Authorization' : await AsyncStorage.getItem('userToken')}
    })
      .then(response => JSON.parse(JSON.stringify(response)))
      .then(response => {
        var q = JSON.parse(JSON.stringify(response.data.description.description));
        console.log(q);
        this.props.navigation.navigate('Answer',{'description': q});
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
    color: 'rgba(255,255,255, 1)',
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
    marginTop:15,
    color: 'rgba(0,0,0, 1)',
    paddingRight: 40,
    paddingLeft: 40,
  },
  opcionStyle: {
      fontSize: 17,
      color: 'rgba(255,255,255, 1)',
      lineHeight: 24,
      paddingRight: 40,
    paddingLeft: 40,
    },
  ButtonStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F2B558',
      borderWidth: 0.5,
      height: 40,
      width: 300,
      borderRadius: 5,
      margin: 5,
      },
      SeparatorLine :{

      backgroundColor : '#fff',
      width: 0,
      height: 40

      },
})
