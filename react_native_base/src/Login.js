import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ImageBackground, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Btn from './Btn';
const LoginScreen = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setusernameError] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const handleLogin = () => {

    const validateUsername = async () => {
      if (username === '' || password === '') {
        setusernameError('*Required Field');
        return false;
      } else {
        setusernameError('');
        await AsyncStorage.setItem("username", username)
        await AsyncStorage.setItem("password", password)
        props.navigation.navigate("Welcome");
        return true;
      }
    };

    if (validateUsername() === true) {

      props.navigation.navigate("Welcome");
    
    // Perform login logic here, e.g., validate credentials
    /*fetch(`http://192.168.122.191:8082/CheckLoginDetails?username=${username}&password=${password}`)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      if (result === "true") {
        props.navigation.navigate("Welcome");
      } else {
        console.log('Login failed');
      }
    })
    .catch(error => {
      console.error('Error checking login details:', error);
    });*/
  }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View>
        <TextInput
          style={[styles.input, usernameError && styles.errorBorder]}//if condition for style
          placeholder="Username"
          onChangeText={text => setUsername(text)}
        />
        {usernameError && <Text style={styles.error}>{usernameError}</Text>}
      </View>
      <View>
        <TextInput
          style={[styles.input, usernameError && styles.errorBorder]}//if condition for style
          placeholder="Password"
          secureTextEntry={showPassword}
          onChangeText={text => setPassword(text)}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Text style={{ textAlign: "right", marginTop: 10 }}>{showPassword ? "Show password" : "Hide password "}</Text>
        </Pressable>
        {usernameError && <Text style={styles.error}>{usernameError}</Text>}
      </View>
      <View style={{ marginTop: 50, alignItems: "center" }}>
        <Btn bgColor='#a75bfe' textColor='white' btnLabel="Login" Press={handleLogin} />
      </View>
      <View style={{ marginTop: 10, alignItems: "center"}}>
        {/* <Btn bgColor='blue' textColor='white' btnLabel="Signin" Press={() => props.navigation.navigate("Signup")} /> */}
        <View style={{flexDirection: "row"}}>
          <Text style={{paddingRight: 5}}>Create new account !</Text>
          <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
          <Text style={{color: "#a75bfe", borderBottomWidth: 1, borderBottomColor: "#a75bfe", paddingBottom: 2}} o>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    // marginHorizontal: 30,
    marginVertical: 40,
    // borderWidth: 1,
    // textAlign: "center",
    fontWeight: "600"
  },
  input: {
    // width: '100%',
    height: 50,
    borderColor: '#ccc',
    // borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderBottomWidth: 1,
    // marginBottom: 5,
    // marginBottom: 10,
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  errorBorder: {
    borderColor: 'red', // Change the border color to red on validation error
  },
  error: {
    color: 'red',
    paddingTop: 5,
    paddingBottom: 5
  },
})
export default LoginScreen;