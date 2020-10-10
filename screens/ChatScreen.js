import React from 'react';
import { SafeAreaView, View, TouchableOpacity, TextInput, Text, Dimensions, Image} from 'react-native';
import styles from '../constant/style';
import User from '../User';
import firebase from 'firebase';
import { FlatList } from 'react-native-gesture-handler';

export default class ChatScreen extends React.Component{
    static navigationOptions = ({ navigation }) =>{
        return {
            headerTitle : navigation.getParam('username', null)
        }
    }
    state = {
        textMessage: ''
    }
    constructor(props) {
        super(props);
        this.state = {
            person: {
                username : props.navigation.getParam('username'),
                phone : props.navigation.getParam('phone')
            },
            textMessage: '',
            messageList: []
        }
    }
    componentWillMount(){
        
        firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).on('child_added',
         (value) =>
            this.setState((prevState) =>{
                return{
                    messageList: [...prevState.messageList, value.val()]
                }
            })
         )
    }
    handleChange = key => val => {
        this.setState({ [key]: val })
    }
    convertTime = (time) =>{
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result+= (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        if(c.getDay() != d.getDay()){
            result = d.getDay() + '' + d.getMonth() + '' + result;
        }
        return result;
    }
    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {
            let msgId = firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).push().key;
            let updates = {

            };
            let messages = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.phone
            }
            updates['messages/' + User.phone + '/' + this.state.person.phone + '/' + msgId] = messages;
            updates['messages/' + this.state.person.phone + '/' + User.phone + '/' + msgId] = messages;
            firebase.database().ref().update(updates);
            this.setState({ textMessage: '' });
        }
    }
    renderRow = ({ item }) => {
        return (
            <View
                style={{
                    flexDirection: 'row', width: '60%',
                    alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start',
                    backgroundColor: item.from === User.phone ? '#f4a460' : '#ffb6c1',
                    borderRadius: 5,
                    marginBottom: 8
                }}>
                <Text style={{ padding: 8, color: '#fff', fontSize: 16 }}>
                    {item.message}
                </Text>
                <Text style={{ padding: 3, color: '#eee', fontSize: 12 }}>
                    {this.convertTime(item.time)}
                </Text>
            </View>
        )
    }
    render() {
        let {height, width} = Dimensions.get('window');
        return (
            <SafeAreaView>
                <FlatList
                style={{ padding: 10 , height:height * 0.8}}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' , marginHorizontal:10}}>
                    <TextInput
                        placeholder="Type Messages ....."
                        style={styles.input}
                        value={this.state.textMessage}
                        onChangeText={this.handleChange('textMessage')}
                    />
                    <TouchableOpacity onPress={this.sendMessage} style={{alignItems:'center', marginBottom:10,marginLeft:10, height:40, width:40, paddingTop:10, paddingLeft:5, backgroundColor:'#2196F3', borderRadius:20}}>
                        <Image source={require('../images/paper-plane.png')} style={{tintColor:'white',height:25, resizeMode:'contain',marginRight:10}}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}