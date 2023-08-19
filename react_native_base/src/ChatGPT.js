import { Text, View, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

const ChatGPT = () => {
  const [data, setData] = useState([]);
  const apiKey = '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';
  const apiurl =
    'https://api.openai.com/v1/engines/text-davinci-002/completions';
  const [textInput, setTextInput] = useState('');
  const handleSend = async () => {
    const prompt = textInput;
    const response = await axios.post(
      apiurl,
      {
        prompt: prompt,
        max_tokens: 1024,
        temperature: 0.5,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const text = response.data.choices[0].text;
    setData([
      ...data,
      { type: 'user', text: textInput },
      { type: 'bot', text: text },
    ]);
    setTextInput('');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}> AI ChatBot</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        style={styles.body}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', padding: 10 }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: item.type == 'user' ? 'green' : 'red',
              }}>
              {item.type == 'user' ? 'chatboat' : 'Bot'}
            </Text>
            <Text style={styles.bot}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ChatGPT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '',
    alignItems: 'center',
  },
  title: {
    fontWeight: 900,
    marginBottom: 20,
    marginTop: 70,
  },
});