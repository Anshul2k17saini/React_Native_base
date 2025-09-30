// 

import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import Btn from './Btn';

export default function Home(props) {

  const getstartedbtn = () => {
    props.navigation.navigate("UserProfile");
  }

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TravelITR</Text>
      </View>

      <View style={styles.content}>
        {/* Logo and Image */}
        <View style={styles.logoContainer}>
          <Image style={styles.logoImage} source={require('./assets/travel.png')} />
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Feeling lost in trip planning? Let's turn confusion into excitement! 🌍✨ Plan your adventure effortlessly with us.
        </Text>

        {/* Get Started Button */}
        <View style={styles.buttonContainer}>
          <Btn 
            bgColor={'#a75bfe'} 
            textColor='white' 
            style={{ marginBottom: 20 }} 
            btnLabel="Let's get started" 
            Press={getstartedbtn} 
          />
        </View>
      </View>

      {/* StatusBar */}
      <StatusBar barStyle="light-content" backgroundColor="#8A2BE2" animated={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Purple background
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#8A2BE2',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 150, // To account for fixed header
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImage: {
    height: 150,
    width: 150,
  },
  description: {
    fontSize: 20,
    marginHorizontal: 30,
    textAlign: "center",
    color: "#8A2BE2'",
    lineHeight: 30,
    marginBottom: 40,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
});
