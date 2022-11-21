import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const [currentUser, setCurrentUser] = useState('');
  const [timeStamps, setTimeStamps] = useState([]);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString(),
  );
  const logout = () => {
    AsyncStorage.removeItem(currentUser);
    navigation.navigate('Login');
    // navigation.replace('FirstScreen');
    // AsyncStorage.getAllKeys().then(data=>console.log(data))
  };
  const getCurrentUser = async () => {
    try {
      AsyncStorage.getItem('currentUser').then(value => {
        if (value !== null) {
          setCurrentUser(value);
          AsyncStorage.getItem(`${value}TimeStamps`).then(timeStamps => {
            if (timeStamps !== null) {
              setTimeStamps(JSON.parse(timeStamps));
            }
          });
        }
      });
    } catch (error) {
      console.log(value);
    }
  };
  const logTimeStamp = () => {
    setTimeStamps(list => [...list, {title: currentTime}]);
    AsyncStorage.setItem(`${currentUser}TimeStamps`, JSON.stringify(timeStamps));
  };
  const clearTimeStamps = () => {
    setTimeStamps([]);
    AsyncStorage.removeItem(`${currentUser}TimeStamps`);
  };

  useEffect(() => {
    getCurrentUser();
    const currentTimeUpdater = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      clearInterval(currentTimeUpdater);
    };
  }, []);

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Home screen</Text>
      <Text style={styles.text}>You are logged in {currentUser}</Text>
      <Pressable
        onPress={logout}
        style={({pressed}) => ({backgroundColor: pressed ? '#ddd' : '#0f0'})}>
        <Text style={styles.text}>Logout</Text>
      </Pressable>
      <View>
        <Text>{currentTime}</Text>
      </View>
      <Pressable
        style={({pressed}) => ({backgroundColor: pressed ? '#ddd' : '#0f0'})}
        onPress={logTimeStamp}>
        <Text style={styles.text}>Log time</Text>
      </Pressable>
      <Pressable
        style={({pressed}) => ({backgroundColor: pressed ? '#ddd' : '#0f0'})}
        onPress={clearTimeStamps}>
        <Text style={styles.text}>Clear list</Text>
      </Pressable>
      <FlatList
        data={timeStamps}
        keyExtractor={(_, key) => key}
        renderItem={({item}) => (
          <View style={styles.timeStamp}>
            <Text>{item.title}</Text>
          </View>
        )}
        style={styles.flatList}></FlatList>
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
  flatList: {
    borderColor: '#ff0000',
    borderWidth: 3,
    width: 300,
    height: 500,
  },
  timeStamp: {
    backgroundColor: '#999',
  },
});

export default Home;
