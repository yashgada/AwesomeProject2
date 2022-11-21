import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const data = require('../utils/data').data;

const Login = ({navigation}) => {
  const onPress = async () => {
    if (!username.length) {
      ToastAndroid.show('Please enter a username', ToastAndroid.SHORT);
    }
    if (!password.length) {
      ToastAndroid.show('Please enter a password', ToastAndroid.SHORT);
    }
    const user = data.filter(user => {
      return user.username === username.toLowerCase();
    });
    if (user.length) {
      const data = user[0];
      if (data.password !== password) {
        ToastAndroid.show('Password incorrect', ToastAndroid.SHORT);
      }
      // User is authenticated and signed in
      // async storage
      try {
        await AsyncStorage.setItem('currentUser', username);
        navigation.navigate('Home')
      } catch (error) {
        console.log({error});
      }
    } else {
      ToastAndroid.show('Username not found', ToastAndroid.SHORT);
    }
  };
  const getSavedData = async ()=>{

  }
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect( () => {
    AsyncStorage.getItem('currentUser').then(loggedIn=>{
      if(loggedIn) navigation.replace('Home');
    })
  }, [])
  
  return (
    <View style={styles.body}>
      <Text style={styles.text}>Login screen</Text>
      <View>
        <Text style={styles.text}>Username: </Text>
        <TextInput
          autoFocus
          style={styles.textInput}
          onChangeText={text => setUsername(text.trim())}></TextInput>
      </View>
      <View>
        <Text style={styles.text}>Password: </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setPassword(text)}></TextInput>
      </View>
      <Pressable
        onPress={onPress}
        style={({pressed}) => ({backgroundColor: pressed ? '#ddd' : '#0f0'})}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 25,
    fontStyle: 'italic',
    margin: 10,
  },
  textInput: {
    borderWidth: 1,
    // borderColor:'#000',
    marginBottom: 10,
  },
});
export default Login;
