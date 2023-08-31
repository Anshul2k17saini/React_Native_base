import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,AsyncStorage, StyleSheet } from 'react-native';
import Btn from './Btn';
import { darkGreen } from './Constant';
const LoginScreen = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here, e.g., validate credentials
    fetch(`http://192.168.240.191:8081/CheckLoginDetails?username=${username}&password=${password}`)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        if (result=="true") {
          // Store the username in AsyncStorage
         /* AsyncStorage.setItem('username', username)
            .then(() => {
              console.log('Username stored successfully');
            })
            .catch(error => {
              console.error('Error storing username:', error);
            });*/
            props.navigation.navigate("Welcome");
        } else {
          console.log('Login failed');
        }
      })
      .catch(error => {
        console.error('Error checking login details:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
     <Btn bgColor={darkGreen} textColor='white' btnLabel="Login" Press={handleLogin}/>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize:60,
      marginHorizontal:40,
      marginVertical:50
    },
    input: {
      width: '100%',
      height: 60,
      borderColor: 'black',
      borderWidth: 5,
      borderRadius: 8,
      marginBottom: 15,
      paddingLeft: 10,
    },
  
  });

export default LoginScreen;