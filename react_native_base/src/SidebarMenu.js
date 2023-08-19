import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Btn from './Btn';



const SidebarMenu = ({ isOpen, onClose },props) => {
  if (!isOpen) {
    return null;
  }

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity style={styles.menuItem} onPress={onClose}>
      <Btn bgColor='black' textColor='white' btnLabel="Ask Me" Press={()=>props.navigation.navigate("chtgpthome")}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={onClose}>
      <Btn bgColor='black' textColor='white' btnLabel="My Profile" Press={()=>props.navigation.navigate("Login")}/>
      </TouchableOpacity>
      {/* Add more menu items here */}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    top: 30,
    left: 0,
    width: 200,
    height: '100%',
    backgroundColor: 'black',
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  
});

export default SidebarMenu;
