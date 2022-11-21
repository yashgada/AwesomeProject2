import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';

const Screen4 = ({navigation}) => {
    const onPress = () => {
      navigation.navigate('Login');
    };
    return (
      <View style={styles.body}>
        <Text style={styles.text}>Screen 4</Text>
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
  });
  
export default Screen4