import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Testingusefile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = () => {
    validateEmail();
    validatePassword();

    // Additional logic for form submission, e.g., making an API call
  };

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput
        style={[styles.input, emailError && styles.errorBorder]}
        value={email}
        onChangeText={(text) => setEmail(text)}
        onBlur={validateEmail}
      />
      <Text style={styles.error}>{emailError}</Text>

      <Text>Password:</Text>
      <TextInput
        style={[styles.input, passwordError && styles.errorBorder]}
        value={password}
        onChangeText={(text) => setPassword(text)}
        onBlur={validatePassword}
        secureTextEntry
      />
      <Text style={styles.error}>{passwordError}</Text>

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  errorBorder: {
    borderColor: 'red', // Change the border color to red on validation error
  },
  error: {
    color: 'red',
  },
});

export default Testingusefile;
