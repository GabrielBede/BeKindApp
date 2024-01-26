import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, SafeAreaView, Platform, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Conversa from '../../components/Conversa';
import { useNavigation } from '@react-navigation/native';

export default function Chat() {
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        {/* Conteúdo da tela */}
        <View style={styles.InputArea}>
          <Feather style={styles.InputIcon1} name='paperclip' size={22} color={'#7E7E7E'} />
          <TextInput
            style={styles.Input}
            placeholder="Escreva uma mensagem"
            placeholderTextColor='#7E7E7E'
            onChangeText={(text) => setSearchText(text)}
            underlineColorAndroid="transparent"
          />
        <View style={{backgroundColor:'#007CE0', borderRadius:25, width:38, height:38, left:5,}}>
          <Feather style={styles.InputIcon2} name='send' size={22} color={'white'} />
        </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  content: {
    flex: 1,
    justifyContent: 'flex-end', // Alinhar o conteúdo na parte inferior
  },

  InputArea: {
    marginBottom: 20,
    marginHorizontal: 20,
    padding: 3,
    borderColor: '#7E7E7E',
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#444444',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 2,
  },

  InputIcon1: {
    alignSelf:'center',
    marginLeft:10,
    marginRight:15,
  },
  InputIcon2: {
    alignSelf:'center',
    marginTop:9,
    marginRight:3,
  },

  Input: {
    flex: 0.9,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
    fontFamily: 'Montserrat-Regular',
  },
});
