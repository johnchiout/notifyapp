import React from 'react'
import {View, Text, TextInput,  StyleSheet } from 'react-native';

const InputRow = ({label, value, onChange}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
    
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#7777776c',
    width: '100%',
    borderRadius: 3,
    paddingLeft: 10
  },
});


export default InputRow;