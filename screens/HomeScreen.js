import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, AsyncStorage, FlatList } from 'react-native';
import User from '../User';
import styles from '../constant/style';
import firebase from 'firebase';
export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Chats'
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
    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
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
                <Text>{User.phone}</Text>
                <Text>{User.username}</Text>
                <TouchableOpacity
                onPress={this._logOut}>
                <Text>_logOut</Text>
            </TouchableOpacity>
            </SafeAreaView>
        )
    }
}