import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const Chatgptresponse = ({ route }) => {
  const { data } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.responseContainer}>
        <Text style={styles.title}>Your Itinerary</Text>
        <Text style={styles.responseText}>{data}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#6a5acd', // Purple background color
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff', // White text color
  },
  responseContainer: {
    backgroundColor: '#000', // Black background color
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginTop: 30, 
    marginBottom: 5, 
  },
  responseText: {
    fontSize: 16,
    color: '#fff', // White text color
  },
});

export default Chatgptresponse;