import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Btn from './Btn';
import { darkGreen, green } from './Constant';
const SignUpScreen = (props) => {
  const [username, setUsername] = useState('');
  const [EmailId, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfPassword, setConfPassword] = useState('');
  const [Phoneno, setPhoneno] = useState('');
  const [usernameError, setusernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phonenoError, setphonenoError] = useState('');

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (EmailId === '') {
      setEmailError('*Required Field');
      return false;
    } else if (!emailRegex.test(EmailId)) {
      setEmailError('*Invalid email format');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validateUsername = () => {
    if (username === '') {
      setusernameError('*Required Field');
      return false;
    } else {
      setusernameError('');
      return true;
    }
  };

  const validatePassword = () => {
    if (Password === '') {
      setPasswordError('*Required Field');
      return false;
    } else if(ConfPassword != Password){
      setPasswordError('*password should match confirm password');
           return false;
    }
    else if (Password.length < 8) {
      setPasswordError('*Password must be at least 8 characters');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const validatePhoneno = () => {
    if (Phoneno === '') {
      setphonenoError('*Required Field');
      return false;
    } else if (Phoneno.length !== 10) {
      setphonenoError('*Phone no must contain 10 digits');
      return false;
    } else {
      setphonenoError('');
      return true;
    }
  };


  const sendData = async () => {

    const a = validateEmail();
    const b = validatePassword();
    const c = validatePhoneno();
    const d = validateUsername();
    if (a&&b&&c&&d) {
      const dataToSend = {
        username: username,
        emailid: EmailId,
        phoneno: Phoneno,
        password: Password,
      };
      try {
        const response = await fetch('http://192.168.154.191:8082/addUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        const responseData = await response.json();
        console.log('Post response:', responseData);
        props.navigation.navigate("Login");
      } catch (error) {
        console.error('Error posting data:', error);
      }
      console.log('data to send ', dataToSend);
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create new account</Text>
      <View>
        <TextInput
          style={[styles.input, usernameError && styles.errorBorder]}//if condition for style
          placeholder="Username"
          placeholderTextColor={"grey"}
          onChangeText={text => setUsername(text)}
          onBlur={validateUsername}
          />
          {usernameError && <Text style={styles.error}>{usernameError}</Text>}
      </View>
      <View>
        <TextInput
          style={[styles.input, emailError && styles.errorBorder]}//if condition for style
          placeholderTextColor={"grey"}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          onBlur={validateEmail}
          />
        {emailError && <Text style={styles.error}>{emailError}</Text>}
      </View>
      <View>
        <TextInput
          style={[styles.input, passwordError && styles.errorBorder]}//if condition for style
          placeholder="Password"
          placeholderTextColor={"grey"}
          secureTextEntry
          onChangeText={text => setPassword(text)}
          onBlur={validatePassword}
          />
        {passwordError && <Text style={styles.error}>{passwordError}</Text>}
      </View>
      <View>
        <TextInput
          style={[styles.input, passwordError && styles.errorBorder]}//if condition for style
          placeholder="Confirm Password"
          placeholderTextColor={"grey"}
          secureTextEntry
          onChangeText={text => setConfPassword(text)}
          onBlur={validatePassword}
          />
        {passwordError && <Text style={styles.error}>{passwordError}</Text>}
      </View>
      <View>
        <TextInput
          style={[styles.input, phonenoError && styles.errorBorder]}//if condition for style
          placeholder="Phoneno"
          placeholderTextColor={"grey"}
          secureTextEntry
          onChangeText={text => setPhoneno(text)}
          onBlur={validatePhoneno}
        />
        {phonenoError && <Text style={styles.error}>{phonenoError}</Text>}
      </View>
      <View style={{marginTop: 50, alignItems: "center"}}>
        <Btn bgColor='purple' textColor='white' btnLabel="Signup" Press={sendData} />
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

});

export default SignUpScreen;