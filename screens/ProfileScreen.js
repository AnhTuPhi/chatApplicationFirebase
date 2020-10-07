import React from 'react';
import {SafeAreaView,Text, TextInput,TouchableOpacity,Alert} from 'react-native';
import User from '../User';
import styles from '../constant/style';
import firebase from 'firebase';
export default class ProfileScreen extends React.Component{
    static navigationOptions = {
      headerTitle :'Profile'
    }
    state = {
        name :User.name
    }
    handleChange = key => val=>{
        this.setState({[key]:val})
    }
    changeName  = async()=>{
        if(this.state.name.length <5){
            Alert.alert('Error','Please insert another name!!!');
        }
        else if(User.name !=this.state.name){
            firebase.database().ref('users').child(User.phone).set({name:this.state.name});
            User.name =this.state.name;
            Alert.alert('Success','Name change successful');
        }
    }
    render(){
        return(
            <SafeAreaView style={styles.container}>
                <Text style={{fontSize:20}}>{User.phone}</Text>
                <Text style={{fontSize:20}}>{User.name}</Text>
                <TextInput style={styles.input}
                    value ={this.state.name}
                    onChangeText={this.handleChange('name')}
                />
                <TouchableOpacity onPress={this.changeName}>
                    <Text style={styles.btnText}>Change username!!!</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}