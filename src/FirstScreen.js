import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const FirstScreen = ({navigation}) => {

    useEffect( () => {
        AsyncStorage.getAllKeys().then(data=>console.log({'Data from first screen':data}))
        AsyncStorage.getItem('currentUser').then(loggedIn=>{
            console.log(loggedIn)
            setTimeout(() => {
                if(loggedIn) navigation.replace('Home');
            }, 500);
        }).catch(error=>console.log(error))
      }, [])
    
  return (
    <View style={styles.FirstScreen}>
      <Text>Loading</Text>
    </View>
  )
}

export default FirstScreen

const styles = StyleSheet.create({
    FirstScreen:{
        backgroundColor:'#4f4'
    }
})