import { Text, StyleSheet, View} from 'react-native'
import React, { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Picker } from '@react-native-picker/picker';
import Btn from './Btn';
import { darkGreen } from './Constant';

export default function Itenaryinput (){
  const [response, setResponse] = useState('');
  const [departureCountry, setDepartureCountry] = useState('');
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCountry, setArrivalCountry] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedOption, setSelectedOption] = useState('Option 1');
  
 /* const getUsernameFromStorage = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      if (username !== null) {
        // Data was found
        console.log('Username from storage:', username);
        // You can use the retrieved username in your component's logic
      } else {
        console.log('Username not found in storage');
      }
    } catch (error) {
      console.error('Error retrieving username:', error);
    }
  };*/

  const sendData = {
   // username:{getUsernameFromStorage},
    departureCountry: departureCountry,
    departureCity: departureCity,
    arrivalCountry: arrivalCountry,
    arrivalCity: arrivalCity,
    fromDate: fromDate,
    toDate:toDate,
    selectedOption: selectedOption,
  };

    const Send_PostRequest_to_chatgpt = async () => {
        try {
          const response = await fetch('http://192.168.240.191:8081/userTravelInputsave', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sendData }), // Replace with your data
          });
          const data = await response.text(); // Receive response as a string
          setResponse(data);          
          props.navigation.navigate("chatgptresponse",{ data: response })

        } catch (error) {
          console.error('Error sending POST request:', error);
        }
      };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ItenaryInput</Text>
      <TextInput
       style={styles.input}
        placeholder="Departure Country"
        value={departureCountry}
        onChangeText={text => setDepartureCountry(text)}
      />
      <TextInput
       style={styles.input}
        placeholder="Departure City"
        value={departureCity}
        onChangeText={text => setDepartureCity(text)}
      />
      <TextInput
       style={styles.input}
        placeholder="Arrival Country"
        value={arrivalCountry}
        onChangeText={text => setArrivalCountry(text)}
      />
      <TextInput
       style={styles.input}
        placeholder="Arrival City"
        value={arrivalCity}
        onChangeText={text => setArrivalCity(text)}
      />
      <DatePicker
        style={styles.input}
        date={fromDate}
        mode="date"
        placeholder="Select From Date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={date => setFromDate(date)}
      />
      <DatePicker
        style={styles.input}
        date={toDate}
        mode="date"
       // placeholder="Select To Date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={date => setToDate(date)}
      />
      <Picker
       style={styles.input}
        selectedValue={setSelectedOption}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
      >
        <Picker.Item label="Option 1" value="option1" />
        <Picker.Item label="Option 2" value="option2" />
        <Picker.Item label="Option 3" value="option3" />
      </Picker>
      <TouchableOpacity>
      <Btn bgColor={darkGreen} textColor='white' btnLabel="get itenary" Press={Send_PostRequest_to_chatgpt}/>
      </TouchableOpacity>
    </View>
  );
}
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