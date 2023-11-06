import { Text, StyleSheet, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Btn from './Btn';
import { darkGreen } from './Constant';

export default function Itenaryinput(props) {
  const [response, setResponse] = useState('');
  const [departureCountry, setDepartureCountry] = useState('');
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCountry, setArrivalCountry] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState('select a option');
  const [openbutton, setOpenbutton] = useState(false);
  const [openbutton2, setopenbutton2] = useState(false);
  const [ErrorText, setErrorText] = useState('');
  
 // console.log(fromDate)
  //console.log(toDate)
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
   
    const rulesForValidate = () => {
      if (departureCountry === ''|| arrivalCountry===''|| fromDate === null || toDate === null || selectedOption ==='select a option') {
        setErrorText('*Required Field');
        return false;
      } else {
        setErrorText('');
        return true;
      }
    };
  

if(rulesForValidate() === true){

  try {
    const response = await fetch('http://192.168.154.191:8082/userTravelInputsave', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData), // Remove the curly braces
    });
    const data = await response.text();
    setResponse(data);
    //props.navigation.navigate("chatgptresponse", { data: response });
  } catch (error) {
    console.error('Error sending POST request:', error);
  }

  }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ItenaryInput</Text>
      <View>
      <TextInput
        style={[styles.input, ErrorText && styles.errorBorder]}
        placeholder="Departure Country"
        value={departureCountry}
        onChangeText={text => setDepartureCountry(text)}
      />
      {ErrorText && <Text style={styles.error}>{ErrorText}</Text>}
      </View>
      <View>
      <TextInput
        style={styles.input}
        placeholder="Departure City"
        value={departureCity}
        onChangeText={text => setDepartureCity(text)}
      />
      </View>
      <View>
      <TextInput
        style={[styles.input, ErrorText && styles.errorBorder]}
        placeholder="Arrival Country"
        value={arrivalCountry}
        onChangeText={text => setArrivalCountry(text)}
      />
      {ErrorText && <Text style={styles.error}>{ErrorText}</Text>}
      </View>
      <View>
      <TextInput
        style={styles.input}
        placeholder="Arrival City"
        value={arrivalCity}
        onChangeText={text => setArrivalCity(text)}
      />
      </View>
<Pressable onPress={() => setOpenbutton(true)}>
  <Text>
    {fromDate} {/* Wrap the text inside a Text component */}
  </Text>
  <TextInput
    placeholder="Select From Date"
    editable={false}
  />
</Pressable>
<Pressable onPress={() => setopenbutton2(true)}>
  <Text>
    {toDate} {/* Wrap the text inside a Text component */}
  </Text>
  <TextInput
    placeholder="Select To Date"
    editable={false}
  />
</Pressable>
{openbutton && (
  <DateTimePicker
    value={new Date()}
    mode="date"
    onChange={(event, selectedDate) => {
      setOpenbutton(false);
      if (event.type === 'set') {
        setFromDate(selectedDate.toLocaleDateString());
        console.log('From Date set successfully');
      } else {
        console.log('From Date not set');
      }
    }}
  />
)}

{openbutton2 && (
  <DateTimePicker
    value={new Date()}
    mode="date"
    onChange={(event, selectedDate) => {
      setopenbutton2(false);
      if (event.type === 'set') {
        setToDate(selectedDate.toLocaleDateString());
        console.log('To Date set successfully');
      } else {
        console.log('To Date not set');
      }
    }}
  />
)}
      <Picker
        style={styles.input}
        selectedValue={selectedOption}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
      >
        <Picker.Item label="Advantures" value="Advantures" />
        <Picker.Item label="Normal" value="Normal" />
        <Picker.Item label="select one" value="select one" />
        <Picker.Item label="Historical" value="" />
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