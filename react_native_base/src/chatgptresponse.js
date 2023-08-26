// DetailsScreen.js
import React from 'react';
import { View, Text } from 'react-native';

const chatgptresponse = ({ route }) => {
  const { data } = route.params;

  return (
    <View>
      <Text>Your itenary</Text>
      <Text>{data}</Text>
    </View>
  );
};

export default chatgptresponse;
