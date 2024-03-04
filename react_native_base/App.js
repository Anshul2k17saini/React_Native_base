// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/Home';
import Login from './src/Login';
import Signup from './src/Signup';
import Welcome from './src/Welcome';
import UserProfile from './src/UserProfile';
import ItenaryInput from './src/ItenaryInput';
import Itenaryhistory from './src/Itenaryhistory';
import SidebarMenu from './src/SidebarMenu';
import Chatgptresponse from './src/chatgptresponse'


function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Welcome" component={Welcome}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="SidebarMenu" component={SidebarMenu}/>
        <Stack.Screen name="UserProfile" component={UserProfile}/>
        <Stack.Screen name="ItenaryInput" component={ItenaryInput}/>
        <Stack.Screen name="Itenaryhistory" component={Itenaryhistory}/>
        <Stack.Screen name="Chatgptresponse" component={Chatgptresponse}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;