import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Pressable } from 'react-native';
import SidebarMenu from './SidebarMenu';
import Btn from './Btn';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Welcome = ({ navigation }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("username")
    await AsyncStorage.removeItem("password")
    navigation.navigate("Home")
  } 

  /*<TouchableOpacity style={styles.menuItem}>
          <Btn bgColor='#a75bfe' textColor='white' btnLabel="My Profile" Press={() => navigation.navigate("UserProfile")} />
        </TouchableOpacity> */ 

  return (
    <ImageBackground source={require('./assets/purple.png')} resizeMode="cover" style={styles.bgImage}>
      <Pressable onPress={logout} style={{ paddingTop: 50, alignItems: "flex-end", width: "100%", paddingRight: 20 }}>
          <AntDesign name="logout" size={24} color="black" />
      </Pressable>
      <View style={styles.container}>
        <Text style={styles.paragraph}>Explore new places with personalized plans. Welcome</Text>
        <TouchableOpacity style={styles.menuItem} >
          <Btn bgColor='#a75bfe' textColor='white' btnLabel="Generate Itenary" Press={() => navigation.navigate("ItenaryInput")} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} >
        </TouchableOpacity>
        <SidebarMenu isOpen={isSidebarOpen} onClose={toggleSidebar} navigation={navigation} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    padding: 10,
  },
  paragraph: {
    color: 'black', // Change the text color to white
    fontSize: 30,
    textAlign: 'center', // Center the text horizontally
    lineHeight: 60, 
  },
  bgImage: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
  }
});

export default Welcome;
