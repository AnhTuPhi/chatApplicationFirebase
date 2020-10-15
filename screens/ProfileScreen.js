import React from 'react';
import {SafeAreaView,Text, TextInput,TouchableOpacity,Alert, Image, AsyncStorage,Button, View} from 'react-native';
import User from '../User';
import styles from '../constant/style';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import firebase from 'firebase';
export default class ProfileScreen extends React.Component{
    static navigationOptions = {
      headerTitle :'Profile'
    }
    state = {
        name :User.name,
        image: null,
        imageSource: ''
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
    componentDidMount() {
        this.getPermissionAsync();
        console.log('hi');
    }
    
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
    }
    
      _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
          this.upLoadImage(result.uri, "test")
            this.getDownloadURL(result.uri, "test")
            .then((url) =>{
                this.setState({imageSource: url});
            })
        }}
        upLoadImage = async(uri, imageName) =>{
            const respon = await fetch(uri);
            const blob = await respon.blob();
            var ref = firebase.storage().ref().child("images/" + imageName);
            return ref.put(blob);
        }
    render(){
        let { image } = this.state;
        return(
            <SafeAreaView style={styles.container}>
                <View style={{  alignItems: 'center', justifyContent: 'center' }}>
                    {image &&
                    <Image source={{ uri: image }} style={{ width: 200, height: 200, borderRadius:100 }} />}
                    <TouchableOpacity onPress={this._pickImage}>
                    <Text
                        style={styles.btn}
                    >Update avatar</Text>
                    </TouchableOpacity>
                </View>
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