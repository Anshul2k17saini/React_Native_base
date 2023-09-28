import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

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
      chatgptresponse: ''

      };
      
  [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://192.168.107.191:8081/userTravelInputByUsername?username=${username}') // Replace with your API endpoint
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
        {data.map((data, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text>DepartureCountry: {data.departureCountry}</Text>
            <Text>DepartureCity: {data.departureCity}</Text>
            <Text>ArrivalCountry: {data.arrivalCountry}</Text>
            <Text>ArrivalCity: {data.arrivalCity}</Text>
            <Text>From: {data.fromDate}</Text>
            <Text>To: {data.toDate}</Text>
            <Text>TripType: {data.selectedOption}</Text>
            <Text>Itenairy: {data.chatgptresponse}</Text>
          </View>
        ))}
      </View>
    )
}

const styles = StyleSheet.create({})