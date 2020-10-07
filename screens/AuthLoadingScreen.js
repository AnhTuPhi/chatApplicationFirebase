import * as React from 'react';
import {ActivityIndicator, AsyncStorage , StatusBar, StyleSheet, View} from 'react-native';
import User from '../User';
import firebase from 'firebase';
export default class AuthLoadingScreen extends React.Component {
    constructor(props){
        super(props);
        this._bootstrapAsync();
    }
    componentWillMount(){
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        var firebaseConfig = {
            apiKey: "AIzaSyD0oLTf2m8m1pGk9ZJmRyIB1Muu0NpFZg0",
            authDomain: "fir-chatapplication-e0a1d.firebaseapp.com",
            databaseURL: "https://fir-chatapplication-e0a1d.firebaseio.com",
            projectId: "fir-chatapplication-e0a1d",
            storageBucket: "fir-chatapplication-e0a1d.appspot.com",
            messagingSenderId: "372169930006",
            appId: "1:372169930006:web:91e08065a1b94788730c37",
            measurementId: "G-9MT7Z85D9J"
        };
        // Initialize Firebase
        //firebase.initializeApp(firebaseConfig);
    }
    _bootstrapAsync = async () =>{
        User.phone = await AsyncStorage.getItem('userPhone');
        User.username = await AsyncStorage.getItem('userName');
        this.props.navigation.navigate(User.phone ?'App':'Auth');
    };
    render(){
        return(
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default"/>
            </View>
        );
    }
}