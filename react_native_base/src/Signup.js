import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Btn from './Btn';
import { darkGreen, green } from './Constant';
const SignUpScreen = (props) => {
  const [username, setUsername] = useState('');
  const [EmailId, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Phoneno, setPhoneno] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phonenoError,setphonenoError]=useState('');

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(EmailId)) {
      setEmailError('*already present email Id,use different');
      return false;
    } else {
      setEmailError('');
      return true
    }
  };

  const validatePassword = () => {
    if (Password.length < 8) {
      setPasswordError('*Password must be at least 8 characters');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const validatePhoneno = () => {
    if (Phoneno.length<10) {
      setphonenoError('*Phone no must contain 10 digit');
      return false;
    } else {
      setphonenoError('');
      return true;
    }
  };


  const sendData = async () => {
    if(validateEmail()&&
    validatePassword()&&
    validatePhoneno()){
      const dataToSend = {
        username:username,                           
        emailid: EmailId,
        phoneno: Phoneno,
        password: Password,
      };
      try {
        const response = await fetch('http://192.168.34.191:8081/addUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });
    
        const responseData = await response.json();
        console.log('Post response:', responseData);
      } catch (error) {
        console.error('Error posting data:', error);
      }}
      props.navigation.navigate("Login");
    }
    
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
         style={[styles.input, emailError && styles.errorBorder]}//if condition for style
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        onBlur={validateEmail}
      />
       <Text style={styles.error}>{emailError}</Text>
      <TextInput
         style={[styles.input, passwordError && styles.errorBorder]}//if condition for style
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        onBlur={validatePassword}
      />
       <Text style={styles.error}>{passwordError}</Text>
      <TextInput
         style={[styles.input, phonenoError && styles.errorBorder]}//if condition for style
        placeholder="Phoneno"
        secureTextEntry
        onChangeText={text => setPhoneno(text)}
        onBlur={validatePhoneno}
      />
       <Text style={styles.error}>{phonenoError}</Text>
     <Btn bgColor='purple' textColor='white' btnLabel="Signup" Press={sendData}/>
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
    fontSize:40,
    marginHorizontal:30,
    marginVertical:50
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  errorBorder: {
    borderColor: 'red', // Change the border color to red on validation error
  },
  error: {
    color: 'red',
  },

});

export default SignUpScreen;