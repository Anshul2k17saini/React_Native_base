import { Text, View, StyleSheet } from 'react-native';
import ChatGPT from './src/index';

export default function chtgpthome() {
  return (
    <View style={styles.container}>
      <ChatGPT />  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});
