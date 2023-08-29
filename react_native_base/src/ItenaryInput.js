import { Text, StyleSheet, View } from 'react-native'
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Picker } from 'react-native';
import DatePicker from 'react-native-datepicker';

export default function Itenaryinput (){
  const [response, setResponse] = useState('');
  const [departureCountry, setDepartureCountry] = useState('');
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCountry, setArrivalCountry] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedOption, setSelectedOption] = useState('Option 1');


  const sendData = {
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
          const response = await fetch('http://192.168.34.191:8081/userTravelInputsave', {
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
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Departure Country"
        value={departureCountry}
        onChangeText={text => setDepartureCountry(text)}
      />
      <TextInput
        placeholder="Departure City"
        value={departureCity}
        onChangeText={text => setDepartureCity(text)}
      />
      <TextInput
        placeholder="Arrival Country"
        value={arrivalCountry}
        onChangeText={text => setArrivalCountry(text)}
      />
      <TextInput
        placeholder="Arrival City"
        value={arrivalCity}
        onChangeText={text => setArrivalCity(text)}
      />
      <DatePicker
        style={{ width: 200 }}
        date={fromDate}
        mode="date"
        placeholder="Select From Date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={date => setFromDate(date)}
      />
      <DatePicker
        style={{ width: 200 }}
        date={toDate}
        mode="date"
        placeholder="Select To Date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onDateChange={date => setToDate(date)}
      />
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue, itemIndex) => setSelectedOption(itemValue)}
      >
        <Picker.Item label="Option 1" value="Option 1" />
        <Picker.Item label="Option 2" value="Option 2" />
        <Picker.Item label="Option 3" value="Option 3" />
      </Picker>
      <TouchableOpacity>
      <Btn bgColor={darkGreen} textColor='white' btnLabel="get itenary" Press={Send_PostRequest_to_chatgpt}/>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({})