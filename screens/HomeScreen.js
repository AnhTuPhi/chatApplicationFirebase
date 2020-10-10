import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, AsyncStorage, FlatList , Image} from 'react-native';
import User from '../User';
import firebase from 'firebase';
export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation}) => {
        return{
            title : 'Chats',
            headerRight:(
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image source={require('../images/profile.png')} style={{width:32,height:32}}/>
                </TouchableOpacity>
            )
        }
    }
    state = {
        users: []
    }
    componentWillMount() {
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val) => {
            let person = val.val();
            person.phone = val.key;
            if (person.phone === User.phone) {
                User.username = person.name
            }
            else {
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }
        })
    }
    renderRow = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Chat', item)}
                style={{ padding: 10, borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                <Text style={{ fontSize: 20 }}>{item.username}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <SafeAreaView>
                <FlatList
                    data={this.state.users}
                    renderItem={this.renderRow}
                    keyExtractor={(item) => item.phone}
                />
            </SafeAreaView>
        )
    }
}