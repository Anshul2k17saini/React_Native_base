import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Btn from './Btn';
import { darkGreen } from './Constant';
const LoginScreen = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here, e.g., validate credentials
    if (username === 'abc' && password === 'abc@123') {
        props.navigation.navigate("Welcome")
    } else {
      console.log('Login failed');
    }
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