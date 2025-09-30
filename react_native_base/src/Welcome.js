import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
  StatusBar,
  Animated,
  Easing,
  Modal,
} from 'react-native';
import Btn from './Btn';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Welcome = ({ navigation }) => {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const slideAnim = useRef(new Animated.Value(-200)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 5000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, []);

  const confirmLogout = async () => {
    try {
      await AsyncStorage.removeItem('jwt');
      setIsLogoutModalVisible(false);
      navigation.replace('Home');
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome</Text>
        <Pressable
          onPress={() => setIsLogoutModalVisible(true)}
          style={styles.logoutButton}
        >
          <AntDesign name="logout" size={22} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        {/* Animated Icon */}
        <Animated.Image
          source={require('./assets/mainicon.png')}
          style={[styles.mainIcon, { transform: [{ translateX: slideAnim }] }]}
        />

        {/* Description */}
        <Text style={styles.paragraph}>
          Explore exciting destinations, discover hidden gems, and plan your
          perfect personalized journey—welcome aboard!
        </Text>

        {/* Generate Itinerary Button */}
        <View style={styles.menuItem}>
          <Btn
            bgColor="#a75bfe"
            textColor="white"
            btnLabel="Plan Trip"
            Press={() => navigation.navigate('ItenaryInput')}
            style={styles.generateBtn}
            textStyle={styles.generateBtnText}
          />
        </View>
      </View>

      {/* Logout Confirmation Modal */}
      <Modal visible={isLogoutModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#a75bfe' }]}
                onPress={confirmLogout}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: 'grey' }]}
                onPress={() => setIsLogoutModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#8A2BE2"
        animated={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 28, fontWeight: '700', color: '#fff' },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 6,
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 150,
  },
  mainIcon: { height: 200, width: 200, marginBottom: 50 },
  paragraph: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    lineHeight: 32,
    marginHorizontal: 30,
    marginBottom: 40,
  },
  menuItem: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  generateBtn: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 12,
  },
  generateBtnText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: { color: 'white', fontSize: 16, fontWeight: '600' },
});

export default Welcome;
