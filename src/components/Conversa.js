import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const Conversa = ({ pessoaSource, nome, msg, data }) => {
  return (
    <View style={styles.Conversa}>
      <Image style={styles.Pessoa} source={pessoaSource} />

      <View style={{width:'65%',}}>
        <View style={{flexDirection:'row', justifyContent:'space-between',}}>
          <Text style={styles.Nome}>{nome}</Text>
          <Text style={styles.Msg}>{data}</Text>
        </View>
        <Text style={styles.Msg}>{msg}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Conversa: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 75,
  },

  Pessoa: {
    width: 60,
    height: 60,
    marginRight: 15,
    marginLeft: 30,
    resizeMode: 'contain',
  },

  Nome: {
    color: '#000',
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,

  },

  Msg: {
    color: '#7E7E7E',
    fontFamily: 'Montserrat-Medium'
  }
});

export default Conversa;