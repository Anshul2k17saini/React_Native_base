import { Text, StyleSheet, View } from 'react-native'
import React, { useState,useEffect} from 'react'

export default function UserProfile (){

    const data = {
        name: '',
        age: '',
        email: '',
      };
      
  [data, setData] = useState(null);

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


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {Data.map((data, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text>Name: {data.name}</Text>
            <Text>Age: {data.age}</Text>
          </View>
        ))}
      </View>
    )
}

const styles = StyleSheet.create({})