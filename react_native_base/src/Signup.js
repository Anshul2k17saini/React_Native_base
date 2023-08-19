import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Btn from './Btn';
import { darkGreen } from './Constant';
const SignUpScreen = (props) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Perform sign-up logic here, e.g., create a new user account
    console.log('Sign-up successful');
    // Navigate to the login screen or perform other actions
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
     <Btn bgColor='orange' textColor='white' btnLabel="Signup" Press={()=>props.navigation.navigate("Login")}/>
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