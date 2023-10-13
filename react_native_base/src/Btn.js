import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Btn({bgColor,textColor,btnLabel,Press}) {
  return (
    <TouchableOpacity onPress={Press} style ={{backgroundColor:bgColor, borderRadius:100, alignItems:'center',width:190,paddingVertical:10,marginVertical:15}}>
        <Text style={{color:textColor,fontSize: 25,fontweight:"bold"}} >{btnLabel}</Text>
    </TouchableOpacity>
  )
}