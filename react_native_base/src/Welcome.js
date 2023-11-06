import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import SidebarMenu from './SidebarMenu';
import Btn from './Btn';

const Welcome = ({navigation}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ImageBackground source={require('./assets/purple.png')} resizeMode="cover" style={styles.bgImage}>  
    <View style={styles.container}>
         <Text style={styles.paragraph}>Hi, Welcome</Text>
         <TouchableOpacity style={styles.menuItem}>
      <Btn  bgColor='#a75bfe' textColor='white' btnLabel="My Profile" Press={()=>navigation.navigate("UserProfile")}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} >
      <Btn bgColor='#a75bfe' textColor='white' btnLabel="Generate Itenary" Press={()=>navigation.navigate("ItenaryInput")}/>
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
    color:'black',
    fontSize: 50
  },
  bgImage: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
  }
});

export default Welcome;
