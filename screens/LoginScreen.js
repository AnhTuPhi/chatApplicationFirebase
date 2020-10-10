import React from 'react';
import {Text, Alert, AsyncStorage, TouchableOpacity, TextInput,View, Image} from 'react-native';
import User from '../User';
import styles from '../constant/style';
import firebase from 'firebase';
export default class LoginScreen extends React.Component{
    static navigationOptions = {
      headerTitle :'Login'
    }
  state = {
    phone : '',
    username : ''
  }
  handleChange = key => val =>{
    this.setState({ [key]:val})
  }
  
  submitForm = async () =>{
    if(this.state.phone.length <10){
      Alert.alert('Error','Too Short, wrong phone number')
    }
    else if(this.state.username.length <5){
      Alert.alert('Error username','Username too short. Please register another username')
    }
    else{
      //save user date
      await AsyncStorage.setItem('userPhone', this.state.phone);
      User.phone = this.state.phone;
      await AsyncStorage.setItem('userName', this.state.username);
      User.name = this.state.username;
      firebase.database().ref('users/' + User.phone).set({username: this.state.username});
      this.props.navigation.navigate('App');
    }
  }
  render(){
    return(
      <View style={styles.container}>
        <Image source={require('../images/login.png')} style={{width:128,height:128,marginBottom:20}}/>
        <TextInput placeholder="Phone Number"
        keyboardType = "number-pad"
        style ={styles.input}
        value = {this.state.phone}
        onChangeText = {this.handleChange('phone')}
        />
        <TextInput placeholder="Username"
        style ={styles.input}
        value = {this.state.username}
        onChangeText = {this.handleChange('username')}
        />
        <TouchableOpacity onPress = {this.submitForm}>
          <Text style = {styles.btnText}>Enter</Text>
        </TouchableOpacity> 
      </View>
    );
  }
}
