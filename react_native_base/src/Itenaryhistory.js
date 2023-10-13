import { Text, StyleSheet, View } from 'react-native'
import React, { useState} from 'react'

export default function Itenaryhistory () {
    const data = {
      username: '',
      departureCountry: '',
      departureCity: '',
      arrivalCountry: '',
      arrivalCity: '',
      fromDate: '',
      toDate: '',
      selectedOption: '',
      chatgptresponse: '',

      };
      
  //[data, setData] = useState(null);

 /* useEffect(() => {
    fetch('http://192.168.107.191:8081/userTravelInputByUsername?username=${username}') // Replace with your API endpoint
      .then(response => response.json())
      .then(jsonData => {
        setData(jsonData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);*/

    return (
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
    )
}

const styles = StyleSheet.create({})