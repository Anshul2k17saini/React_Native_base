import { Text, StyleSheet, View } from 'react-native'
import React, { useState,useEffect,Modal, TextInput, Button} from 'react'

export default function UserProfile (){

    const datae = {
        name: '',
        age: '',
        email: '',
      };
      
  const [data, setData] = useState(datae);
  const [isModalVisible, setIsModalVisible] = useState(false);

  
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    fetch('https://api.example.com/data') // Replace with your API endpoint
      .then(response => response.json())
      .then(jsonData => {
        setData(jsonData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const updateform = (
    <View style={styles.modalContent}>
      <Text>Enter your information:</Text>
      <TextInput placeholder="Name" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} />
      <Button title="Submit" onPress={toggleModal} />
    </View>
  );

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {data.map((data, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text>Name: {data.name}</Text>
            <Text>Age: {data.age}</Text>
          </View>
        ))}
        <View style={styles.container}>
        <Button title="Edit Profile" onPress={toggleModal} />
        <Modal visible={isModalVisible} animationType="slide">
          {updateform}
        </Modal>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});