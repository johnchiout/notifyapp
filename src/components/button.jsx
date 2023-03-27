import React from 'react'
import {TouchableOpacity, Text } from 'react-native';


const Button = ({text, onPress, style, styleText}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={styleText}>{text}</Text>
    </TouchableOpacity>
  )
}

export default Button