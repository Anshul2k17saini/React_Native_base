import { Text, StyleSheet, View, Pressable, ActivityIndicator, Dimensions, Keyboard, StatusBar, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useCallback } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';


// Move InputField outside component to prevent re-creation on each render
const InputField = React.memo(({ label, placeholder, value, onChangeText, required = false, editable = true }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>
      {label} {required && <Text style={styles.required}>*</Text>}
    </Text>
    <TextInput
      style={[
        styles.input,
        !editable && styles.disabledInput
      ]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
      placeholderTextColor="#999"
    />
  </View>
));

// Move DatePickerField outside component to prevent re-creation on each render
const DatePickerField = React.memo(({ label, value, onPress, placeholder, required = false }) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>
      {label} {required && <Text style={styles.required}>*</Text>}
    </Text>
    <Pressable onPress={onPress} style={[styles.input, styles.dateInput]}>
      <Text style={[styles.dateText, !value && styles.placeholderText]}>
        {value || placeholder}
      </Text>
      <Text style={styles.dateIcon}>📅</Text>
    </Pressable>
  </View>
));

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
  const [loader, setLoader] = useState(false);

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
      const errors = [];
      if (departureCountry === '') errors.push('Departure Country is required');
      if (arrivalCountry === '') errors.push('Arrival Country is required');
      if (fromDate === null) errors.push('From Date is required');
      if (toDate === null) errors.push('To Date is required');
      if (selectedOption === 'select a option') errors.push('Trip Type is required');
      
      if (errors.length > 0) {
        setErrorText(errors.join(', '));
        return false;
      } else {
        setErrorText('');
        return true;
      }
    };

    if (rulesForValidate() === true) {
      try {
        setLoader(true);
        console.log("hello befor response"); 
        const response = await fetch('http://travelitry-app-env.eba-muk2mpsw.ap-south-1.elasticbeanstalk.com/userTravelInputsave', {
          method: "POST",
        headers: {
          "Content-Type": "application/json",   
        },
        body: JSON.stringify(sendData),         
        });
        console.log("after response hello");
        const data = await response.text();
        setResponse(data);
        setLoader(false);
        props.navigation.navigate("Chatgptresponse", { data: data });
      } catch (error) {
        console.error('Error sending POST request:', error);
        setLoader(false);
      }
    }
  };

  // Use useCallback to memoize the onChangeText functions
  const handleDepartureCountryChange = useCallback((text) => setDepartureCountry(text), []);
  const handleDepartureCityChange = useCallback((text) => setDepartureCity(text), []);
  const handleArrivalCountryChange = useCallback((text) => setArrivalCountry(text), []);
  const handleArrivalCityChange = useCallback((text) => setArrivalCity(text), []);

  const handleFromDatePress = useCallback(() => setOpenbutton(true), []);
  const handleToDatePress = useCallback(() => setopenbutton2(true), []);

  return (
    
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#8A2BE2" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        nestedScrollEnabled={true}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Plan Your Journey</Text>
          <Text style={styles.subtitle}>Create your perfect itinerary</Text>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          {/* Departure Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🛫 Departure</Text>
            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <InputField
                  label="Country"
                  placeholder="Enter departure country"
                  value={departureCountry}
                  onChangeText={setDepartureCountry}
                  required={true}
                />
              </View>
              <View style={styles.halfWidth}>
                <InputField
                  label="City"
                  placeholder="Enter departure city"
                  value={departureCity}
                  onChangeText={setDepartureCity}
                />
              </View>
            </View>
          </View>

          {/* Arrival Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🛬 Arrival</Text>
            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <InputField
                  label="Country"
                  placeholder="Enter arrival country"
                  value={arrivalCountry}
                  onChangeText={setArrivalCountry}
                  required={true}
                />
              </View>
              <View style={styles.halfWidth}>
                <InputField
                  label="City"
                  placeholder="Enter arrival city"
                  value={arrivalCity}
                  onChangeText={setArrivalCity}
                />
              </View>
            </View>
          </View>

          {/* Dates Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📅 Travel Dates</Text>
            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <DatePickerField
                  label="From Date"
                  value={fromDate}
                  onPress={() => setOpenbutton(true)}
                  placeholder="Select departure date"
                  required={true}
                />
              </View>
              <View style={styles.halfWidth}>
                <DatePickerField
                  label="To Date"
                  value={toDate}
                  onPress={() => setopenbutton2(true)}
                  placeholder="Select return date"
                  required={true}
                />
              </View>
            </View>
          </View>

          {/* Trip Type Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎯 Trip Type</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Select Trip Type <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={selectedOption}
                  onValueChange={(itemValue) => setSelectedOption(itemValue)}
                  dropdownIconColor="#666"
                >
                  <Picker.Item label="Select trip type" value="select a option" color="#999" />
                  <Picker.Item label="🏔️ Adventure" value="Adventures" color="#333" />
                  <Picker.Item label="🏖️ Relaxation" value="Normal" color="#333" />
                  <Picker.Item label="🏛️ Historical" value="Historical" color="#333" />
                </Picker>
              </View>
            </View>
          </View>

          {/* Error Message - Only show errors here */}
          {ErrorText && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>⚠️ {ErrorText}</Text>
            </View>
          )}

          {/* Extra padding to ensure content is above fixed button */}
          <View style={styles.bottomPadding} />
        </View>
      </ScrollView>

      {/* Fixed Submit Button at Bottom */}
      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={Send_PostRequest_to_chatgpt}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>✈️ Generate Itinerary</Text>
        </TouchableOpacity>
      </View>

      {/* Date Pickers */}
      {openbutton && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          minimumDate={new Date()}
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
          minimumDate={fromDate ? new Date(fromDate) : new Date()}
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

      {/* Full-Screen Loading Overlay */}
      {loader && (
        <View style={styles.fullScreenLoader}>
          <View style={styles.loaderContent}>
            <ActivityIndicator size="large" color={'#8A2BE2'} />
            <Text style={styles.loaderText}>Generating Your Perfect Itinerary</Text>
            <Text style={styles.loaderSubtext}>Please wait while we create your travel plan...</Text>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8A2BE2',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Extra padding for fixed button
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#8A2BE2',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '400',
  },
  formCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 15,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#e9ecef',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  required: {
    color: '#dc3545',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#495057',
    backgroundColor: '#fff',
  },
  disabledInput: {
    backgroundColor: '#f8f9fa',
    color: '#6c757d',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 16,
    color: '#495057',
  },
  placeholderText: {
    color: '#999',
  },
  dateIcon: {
    fontSize: 18,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    color: '#495057',
  },
  errorContainer: {
    backgroundColor: '#f8d7da',
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#dc3545',
  },
  errorText: {
    color: '#721c24',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  bottomPadding: {
    height: 20,
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingBottom: Platform.OS === 'ios' ? 35 : 15,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  submitButton: {
    backgroundColor: '#8A2BE2',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#f23ff5ff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  fullScreenLoader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loaderContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    minWidth: 300,
    maxWidth: '80%',
  },
  loaderText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    textAlign: 'center',
  },
  loaderSubtext: {
    marginTop: 10,
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 20,
  },
});