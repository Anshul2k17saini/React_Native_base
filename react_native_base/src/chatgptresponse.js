import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';

const Chatgptresponse = ({ route }) => {
  const { data } = route.params;

  return (
    <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="black" animated={true} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Itinerary</Text>
        <Text style={styles.subtitle}>Here’s the travel plan we created for you ✈️</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Card */}
        <View style={styles.responseCard}>
          <Text style={styles.responseText}>{data}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8A2BE2',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#8A2BE2',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'yellow',
    fontWeight: '400',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  responseCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: 'yellow',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  responseText: {
    fontSize: 16,
    color: 'black',
    lineHeight: 22,
  },
});

export default Chatgptresponse;
