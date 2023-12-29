import { Text, StyleSheet, Modal, TextInput, Button, Image, Dimensions, StatusBar, Pressable, TouchableOpacity, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import Btn from './Btn';

export default function UserProfile() {

  const [username, setUsername] = useState('');
  const [EmailId, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Phoneno, setPhoneno] = useState('');

  const datae = {
    username: username,
    emailid: EmailId,
    phoneno: Phoneno,
    password: Password,
  };

  const [data, setData] = useState(datae);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    fetch(`http://192.168.122.191:8081/updateUser/username=${username}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('User data updated:', data);
      // Handle success or update state as needed
    })
    .catch(error => {
      console.error('Error in updating user data:', error.message);
      // Handle error or show an error message
    });
    
  };

  // useEffect(() => {
  //   fetch('https://api.example.com/data') // Replace with your API endpoint
  //     .then(response => response.json())
  //     .then(jsonData => {
  //       setData(jsonData);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  const updateform = (
    <View style={styles.containerofSaveinput}>
      <View>
        <TextInput
          style={styles.field}//if condition for style
          placeholder="Username"
          placeholderTextColor={"grey"}
          onChangeText={text => setUsername(text)}
          />
      </View>
      <View>
        <TextInput
          style={styles.field}//if condition for style
          placeholderTextColor={"grey"}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          />
      </View>
      <View>
        <TextInput
          style={styles.field}//if condition for style
          placeholder="Password"
          placeholderTextColor={"grey"}
          secureTextEntry
          onChangeText={text => setPassword(text)}
          />
      </View>
      <View>
        <TextInput
          style={styles.field}//if condition for style
          placeholder="Confirm Password"
          placeholderTextColor={"grey"}
          secureTextEntry={true} 
         ///onChangeText={text => setConfPassword(text)}
          />
      </View>
      <View>
        <TextInput
          style={styles.field}//if condition for style
          placeholder="Phoneno"
          placeholderTextColor={"grey"}
          secureTextEntry
          onChangeText={text => setPhoneno(text)}
        />
      </View>
      <View style={{marginTop: 50, alignItems: "center"}}>
        <Btn bgColor='#a75bfe' textColor='white' btnLabel="Save"  Press={toggleModal} />
      </View>
      </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', paddingTop: StatusBar.currentHeight }}>
      <View style={{ borderWidth: 1, padding: 10, borderRadius: 30, alignItems: "center", justifyContent: "center" }}>
        <Image
          style={{ height: 200, width: 200 }}
          source={{
            uri: `https://robohash.org/${data?.name}`,
          }}
        />
      </View>
      <View style={{ marginBottom: 20, width: "100%", paddingHorizontal: 25 }}>
        <View style={{ backgroundColor: "rgba(210, 215, 211, .5)", padding: 5, borderRadius: 10, paddingHorizontal: 10}}>
          <Text style={{ }}>Name:</Text>
          <Text style={{ fontSize: 26 }}>{data?.name}</Text>
        </View>
        <View style={{marginTop: 20,  backgroundColor: "rgba(210, 215, 211, .5)", padding: 5, borderRadius: 10, paddingHorizontal: 10}}>
          <Text style={{ }}>Age:</Text>
          <Text style={{ fontSize: 26 }}>{data?.age}</Text>
        </View>
      </View>
      <View style={styles.container}>
       
        <Pressable onPress={toggleModal} style={{backgroundColor: "#a75bfe", padding: 15, paddingHorizontal: 30, borderRadius: 25}}>
          <Text style={{color: "white", fontSize: 18}}>Edit Profile</Text>
        </Pressable>
        <Modal visible={isModalVisible} animationType="slide">
          {updateform}
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  field:{
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
  containerofSaveinput:{
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
  }
});






































/*
import { Text, StyleSheet, View, Modal, TextInput, Button, Image, Dimensions, StatusBar, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function UserProfile() {
  const datae = {
    name: 'anshul',
    age: '24',
    email: 'anshul@gmail.com',
  };

  const [data, setData] = useState(datae);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // useEffect(() => {
  //   fetch('https://api.example.com/data') // Replace with your API endpoint
  //     .then(response => response.json())
  //     .then(jsonData => {
  //       setData(jsonData);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  const updateform = (
    <View style={styles.modalContent}>
      <Text>Enter your information:</Text>
      <TextInput placeholder="Name" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} />
      <Button title="Submit" onPress={toggleModal} />
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', paddingTop: StatusBar.currentHeight }}>
      <View style={{ borderWidth: 1, padding: 10, borderRadius: 30, alignItems: "center", justifyContent: "center" }}>
        <Image
          style={{ height: 200, width: 200 }}
          source={{
            uri: `https://robohash.org/${data?.name}`,
          }}
        />
      </View>
      <View style={{ marginBottom: 20, width: "100%", paddingHorizontal: 25 }}>
        <View style={{ backgroundColor: "rgba(210, 215, 211, .5)", padding: 5, borderRadius: 10, paddingHorizontal: 10}}>
          <Text style={{ }}>Name:</Text>
          <Text style={{ fontSize: 26 }}>{data?.name}</Text>
        </View>
        <View style={{marginTop: 20,  backgroundColor: "rgba(210, 215, 211, .5)", padding: 5, borderRadius: 10, paddingHorizontal: 10}}>
          <Text style={{ }}>Age:</Text>
          <Text style={{ fontSize: 26 }}>{data?.age}</Text>
        </View>
      </View>
      <View style={styles.container}>
        {/* <Button title="Edit Profile" onPress={toggleModal} /> }
        <Pressable onPress={toggleModal} style={{backgroundColor: "#a75bfe", padding: 15, paddingHorizontal: 30, borderRadius: 25}}>
          <Text style={{color: "white", fontSize: 18}}>Edit Profile</Text>
        </Pressable>
        <Modal visible={isModalVisible} animationType="slide">
          {updateform}
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});*/