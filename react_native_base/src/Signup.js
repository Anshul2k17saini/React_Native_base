import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Btn from './Btn';
import { darkGreen } from './Constant';
const SignUpScreen = (props) => {
  const [username, setUsername] = useState('');
  const [EmailId, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Phoneno, setPhoneno] = useState('');

  const sendData = () => {
    const dataToSend = {
      username: username,
      EmailId: EmailId,
      Phoneno: Phoneno,
      Password: Password,
    };

    fetch('http://localhost:4200/Userdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Post response:', data);
      })
      .catch(error => {
        console.error('Error posting data:', error);
      });
  };
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phoneno"
        secureTextEntry
        onChangeText={text => setPhoneno(text)}
      />
     <Btn bgColor='orange' textColor='white' btnLabel="Signup" Press={sendData}/>
     <Btn bgColor='orange' textColor='white' btnLabel="Login" Press={()=>props.navigation.navigate("Login")}/>
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

export default SignUpScreen;