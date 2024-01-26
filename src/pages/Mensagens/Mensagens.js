import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, StatusBar, SafeAreaView, Platform, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Conversa from '../../components/Conversa';
import { useNavigation } from '@react-navigation/native';

export default function Mensagens() {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');

  const [conversasAdmin, setConversasAdmin] = useState([
    {
      pessoaSource: require('../../img/BeKindAdmin.png'),
      nome: 'BeKind',
      msg: 'Olá',
      link:'Chat',
      data:'08:10 PM',
    },
    // Outras conversas de voluntários aqui
  ]);

  const [conversasONG, setConversasONG] = useState([
    {
      pessoaSource: require('../../img/PerfilAnjosdaRua.png'),
      nome: 'Anjos da Rua',
      msg: 'Olá',
      link:'Chat',
      data:'12:12 PM',
    },
    {
      pessoaSource: require('../../img/PerfilSPInvisivel.png'),
      nome: 'SP Invisível',
      msg: 'Olá',
      link:'Chat',
      data:'09:12 AM',
    },
    {
      pessoaSource: require('../../img/PerfilOlhardeBia.png'),
      nome: 'Olhar de Bia',
      msg: 'Olá',
      link:'Chat',
      data:'05:12 PM',
    },
    {
      pessoaSource: require('../../img/PerfilONGAmamos.png'),
      nome: 'ONG Amamos',
      msg: 'Olá',
      link:'Chat',
      data:'07:30 AM',
    },
    // Outras conversas de ONGs aqui
  ]);

  const [conversasVoluntarios, setConversasVoluntarios] = useState([
    {
      pessoaSource: require('../../img/Pessoa1.png'),
      nome: 'Mariana',
      msg: 'Olá',
      link:'Chat',
      data:'08:10 PM',
    },
    {
      pessoaSource: require('../../img/Pessoa2.png'),
      nome: 'Pedro',
      msg: 'Olá',
      link:'Chat',
      data:'12:44 PM',
    },
    {
      pessoaSource: require('../../img/Pessoa3.png'),
      nome: 'João',
      msg: 'Olá',
      link:'Chat',
      data:'13:11 PM',
    },
    // Outras conversas de voluntários aqui
  ]);

  const filteredConversasAdmin = conversasAdmin.filter((conversa) =>
    conversa.nome.toLowerCase().includes(searchText.toLowerCase())
  );
  const filteredConversasONG = conversasONG.filter((conversa) =>
    conversa.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredConversasVoluntarios = conversasVoluntarios.filter((conversa) =>
    conversa.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderConversas = (conversas) => {
    return conversas.map((conversa, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => navigation.navigate(conversa.link)} // Adicionado link de navegação
      >
        <Conversa
          pessoaSource={conversa.pessoaSource}
          nome={conversa.nome}
          msg={conversa.msg}
          data={conversa.data}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.ScrollView}>
        <Text style={styles.H3}>Chat</Text>
        <View style={styles.InputArea}>
          <Feather style={styles.InputIcon} name='search' size={22} color={'#7E7E7E'} />
          <TextInput
            style={styles.Input}
            placeholder="Pesquisar ONG/Voluntário"
            placeholderTextColor='#7E7E7E'
            onChangeText={(text) => setSearchText(text)}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={styles.IconText}>
          <Image style={styles.Icon} source={require('../../img/Manager.png')} />
          <Text style={styles.PBold}>Admin</Text>
        </View>
        {renderConversas(filteredConversasAdmin)}
        <View style={styles.IconText}>
          <Image style={styles.Icon} source={require('../../img/MsgONGs.png')} />
          <Text style={styles.PBold}>ONG's</Text>
        </View>
        {renderConversas(filteredConversasONG)}
        <View style={styles.IconText2}>
          <Image style={styles.Icon} source={require('../../img/MsgVoluntarios.png')} />
          <Text style={styles.PBold}>Voluntários</Text>
        </View>
        {renderConversas(filteredConversasVoluntarios)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: Platform.OS === 'android' ? statusBarHeight : 25,
  },

  Header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -65,
    marginBottom: -60,
    alignSelf: 'center',
    alignItems: 'center',
  },

  Logo: {
    width: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  Perfil: {
    width: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginRight: 25,
  },

  H3: {
    marginTop: 15,
    marginLeft: 30,
    marginBottom: 20,
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },

  PBold: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
    marginLeft: 10,
    color: '#7E7E7E',
  },

  InputArea: {
    flex: 1,
    marginHorizontal: 30,
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
    elevation: 4,
  },

  InputIcon: {
    padding: 10,
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

  IconText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginTop: 30,
  },

  IconText2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginTop: 30,
  },

  ScrollView: {
    marginBottom: 60,
  },
  
  Icon: {
    height: 14,
    width: 16,
  },
});
