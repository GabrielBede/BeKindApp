import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Feather } from '@expo/vector-icons';


export default function BotaoMais({ size, color, focused }) {
  return (
    <View style={styles.container}>
      <Feather name="plus" size={size} color={'#fff'} focused={focused} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#007CE0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:35,
  },
});
