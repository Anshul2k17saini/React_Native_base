import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,AsyncStorage, StyleSheet,Image, ImageBackground } from 'react-native';
import Btn from './Btn';
import { darkGreen } from './Constant';
const LoginScreen = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setusernameError] = useState('');

  const handleLogin = () => {
   
    const validateUsername = () => {
      if (username === ''|| password==='') {
        setusernameError('*Required Field');
        return false;
      } else {
        setusernameError('');
        return true;
      }
    };
  
    if(validateUsername()===true)
    {
      props.navigation.navigate("Welcome");
    }
    // Perform login logic here, e.g., validate credentials
    /*fetch(`http://192.168.56.255:8081/CheckLoginDetails?username=${username}&password=${password}`)
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
            });
            props.navigation.navigate("Welcome");
        } else {
          console.log('Login failed');
        }
      })
      .catch(error => {
        console.error('Error checking login details:', error);
      });*/
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
        onChangeText={text => setPassword(text)} 
      />
      {usernameError && <Text style={styles.error}>{usernameError}</Text>}
      </View>
     <View style={{marginTop: 50, alignItems: "center"}}>
      <Btn bgColor='#a75bfe' textColor='white' btnLabel="Login" Press={handleLogin}/>
     </View>
     <View style={{marginTop: 10, alignItems: "center",}}>
      <Btn  bgColor='blue' textColor='white'  btnLabel="Signin" Press={()=>props.navigation.navigate("Signup")}/>
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
    width: '100%',
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