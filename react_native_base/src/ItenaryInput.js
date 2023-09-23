import { Text, StyleSheet, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Btn from './Btn';
import { darkGreen } from './Constant';

export default function Itenaryinput() {
  const [response, setResponse] = useState('');
  const [departureCountry, setDepartureCountry] = useState('');
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCountry, setArrivalCountry] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Option 1');
  const [openbutton, setOpenbutton] = useState(false);
  const [closebutton, setClosebutton] = useState(false);
  

  const sendData = {
    departureCountry: departureCountry,
    departureCity: departureCity,
    arrivalCountry: arrivalCountry,
    arrivalCity: arrivalCity,
    fromDate: fromDate,
    toDate: toDate,
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
      const data = await response.text();
      setResponse(data);
      props.navigation.navigate("chatgptresponse", { data: response });

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
      <Pressable onPress={(
        setOpenbutton(true)
      )}>
        <TextInput
        style={styles.input}
        value={fromDate || new Date()}
        mode="date" // Set to "date" for the From Date picker
        placeholder="Select From Date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || fromDate;
          setFromDate(currentDate);
        }}/>
        </Pressable>
      <DateTimePicker
        style={styles.input}
        value={toDate || new Date()}
        mode="date" // Set to "date" for the To Date picker
        placeholder="Select To Date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"

        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || toDate;
          setToDate(currentDate);
        }}
      />
      <Picker
        style={styles.input}
        selectedValue={selectedOption}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
      >
        <Picker.Item label="Option 1" value="option1" />
        <Picker.Item label="Option 2" value="option2" />
        <Picker.Item label="Option 3" value="option3" />
      </Picker>
      <TouchableOpacity>
        <Btn bgColor={darkGreen} textColor='white' btnLabel="get itinerary" Press={Send_PostRequest_to_chatgpt} />
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
    fontSize: 60,
    marginHorizontal: 40,
    marginVertical: 50
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
