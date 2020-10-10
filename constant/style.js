import React from 'react';
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    input: {
      padding:10,
      borderWidth:1,
      borderColor: '#CCC',
      width: '80%',
      marginBottom: 5,
      borderRadius: 5,
    },
    btnText:{
      color: 'darkblue',
      fontSize:20
    },
    btn:{
      fontSize:18,
      color:'white',
      backgroundColor:'black',
      padding:5,
      margin:5,
      borderRadius:5
    }
  })
export default styles;