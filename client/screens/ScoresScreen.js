import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Col,
  Row,
  Button,
} from 'react-native'
import Table from 'react-native-simple-table'

const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    width: 200
  },
  {
    title: 'Puntaje',
    dataIndex: 'points',
    width: 200
  }
 ];
 
 export default class ScoresScreen extends React.Component {
 	static navigationOptions ={ 
    title: 'Volver',
     headerStyle: {
      backgroundColor: '#37435D',
     },headerTintColor: '#fff',

  };
	render() {
		const { navigation } = this.props;
    const p1 = navigation.getParam('puntos1','nada');
    const u1 = navigation.getParam('user1','nada');
    const p2 = navigation.getParam('puntos2','nada');
    const u2 = navigation.getParam('user2','nada');
    const p3 = navigation.getParam('puntos3','nada');
    const u3 = navigation.getParam('user3','nada');
    const p4 = navigation.getParam('puntos4','nada');
    const u4 = navigation.getParam('user4','nada');
    const p5 = navigation.getParam('puntos5','nada');
    const u5 = navigation.getParam('user5','nada');
    const p6 = navigation.getParam('puntos6','nada');
    const u6 = navigation.getParam('user6','nada');
    const p7 = navigation.getParam('puntos7','nada');
    const u7 = navigation.getParam('user7','nada');
    const p8 = navigation.getParam('puntos8','nada');
    const u8 = navigation.getParam('user8','nada');
    const p9 = navigation.getParam('puntos9','nada');
    const u9 = navigation.getParam('user9','nada');
    const p10 = navigation.getParam('puntos10','nada');
    const u10 = navigation.getParam('user10','nada');
    let a = [{'username':u1, 'points':p1},{'username':u2, 'points':p2},{'username':u3, 'points':p3},{'username':u4, 'points':p4},{'username':u5, 'points':p5},{'username':u6, 'points':p6},{'username':u7, 'points':p7},{'username':u8, 'points':p8},{'username':u9, 'points':p9},{'username':u10, 'points':p10}];

    return (
      <View style={styles.container}>
       	<Text style={styles.head}>Top 10 Puntuaciones</Text>
      	<Text style={styles.head}></Text>
      	<Table height={320} columnWidth={60} columns={columns} dataSource= {a}/>
        <View style={styles.button}>
          <Button color="#F2B558" title="Volver atrás" onPress={this._handleBack} />
        </View>
      </View>
    )
  	
  }

  _handleBack =  () => {
    this.props.navigation.navigate('Home')
  };
} 

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor:'#6b7a8f'},

  head: { 
    backgroundColor: '#6b7a8f', 
    textAlign: 'center',
    color:'white',
    fontSize: 28,
    margin: 10},
});