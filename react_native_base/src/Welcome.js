import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SidebarMenu from './SidebarMenu';

const Welcome = ({navigation}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <View style={styles.container}>
         <Text style={styles.paragraph}>Hi, Welcome</Text>
      <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
        <Text style={styles.paragraph}>Menu</Text>
      </TouchableOpacity>
      <SidebarMenu isOpen={isSidebarOpen} onClose={toggleSidebar} navigation={navigation} />
    </View>
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
});

export default Welcome;
