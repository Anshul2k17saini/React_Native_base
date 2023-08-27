import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Btn from './Btn';


const SidebarMenu = ({ navigation, isOpen, onClose, }) => {
  if (!isOpen) {
    return null;
  }


  return ( 
    <View style={styles.sidebar}>
      <TouchableOpacity style={styles.menuItem} onPress={onClose}>
      <Btn bgColor='orange' textColor='white' btnLabel="My Profile" Press={()=>navigation.navigate("UserProfile")}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={onClose}>
      <Btn bgColor='orange' textColor='white' btnLabel="Generate Itenary" Press={()=>navigation.navigate("ItenaryInput")}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={onClose}>
      <Btn bgColor='orange' textColor='white' btnLabel="Itenary history" Press={()=>navigation.navigate("Itenaryhistory")}/>
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
