import React from 'react';
import {SafeAreaView,Text, TextInput,TouchableOpacity,Alert, Image, AsyncStorage,Button} from 'react-native';
import User from '../User';
import styles from '../constant/style';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import Permissions  from 'expo-permissions';
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
    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }
    
    onChooseImagePress = async() =>{
        let result = await ImagePicker.launchCameraAsync();
        if(!result.cancelled){
            this.upLoadImage(result.uri, "test")
            this.getDownloadURL(result.uri, "test")
            .then((url) =>{
                this.setState({profileImageUrl: url});
            })
            }
    }
    upLoadImage = async(uri, imageName) =>{
        const respon = await fetch(uri);
        const blob = await respon.blob();
        var ref = firebase.storage().ref().child("images/" + imageName);
        return ref.put(blob);
    }
    render(){
        return(
            <SafeAreaView style={styles.container}>
                <Image source={require('../images/personal-card.png')} style={{width:126,height:126}}/>
                <Button title="Choose Image" onPress={this.onChooseImagePress}/>
                <Image source={this.state.profileImageUrl} style={{width:128,height:128}} />
                <Text style={{fontSize:20}}>Userphone : {User.phone}</Text>
                <Text style={{fontSize:20}}>Username : {User.name}</Text>
                <TextInput style={styles.input}
                    value ={this.state.name}
                    onChangeText={this.handleChange('name')}
                />
                <TouchableOpacity onPress={this.changeName}>
                    <Text style={styles.btn}>Change username</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={this._logOut}>
                <Text style={styles.btn}>Log Out</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}