import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, StatusBar, SafeAreaView, Platform, TouchableOpacity, TextInput,} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Conversa from '../../components/CardsCadastroVulneraveis';
import { useNavigation } from '@react-navigation/native';

export default function VulneraveisCadastrados() {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');

  
  const [conversasVoluntarios, setConversasVoluntarios] = useState([
    {
      pessoaSource: require('../../img/Pessoa1.png'),
      nome: 'Mariana',
      msg: 'Alerta feito: 10/01 - 10:30',
    },
    {
      pessoaSource: require('../../img/Pessoa4.png'),
      nome: 'Eliana',
      msg: 'Alerta feito: 10/01 - 10:30',
    },
    {
      pessoaSource: require('../../img/Pessoa5.png'),
      nome: 'Jefferson',
      msg: 'Alerta feito: 10/01 - 10:30',
    },
    {
      pessoaSource: require('../../img/Pessoa6.png'),
      nome: 'Danilo',
      msg: 'Alerta feito: 01/09 - 11:30',
    },
    {
      pessoaSource: require('../../img/Pessoa7.png'),
      nome: 'Eventon',
      msg: 'Alerta feito: 11/01 - 10:30',
    },
    // Outras conversas de voluntários aqui
  ]);



  const filteredConversasVoluntarios = conversasVoluntarios.filter((conversa) =>
    conversa.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderConversas = (conversas) => {
    return conversas.map((conversa, index) => (
      <TouchableOpacity key={index} onPress={() => navigation.navigate('Descricao1')}>
        <Conversa
          pessoaSource={conversa.pessoaSource}
          nome={conversa.nome}
          msg={conversa.msg}
        />
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.ScrollView}>
        {/*Header do aplicativo*/}

        <Text style={styles.H3}>Cadastro de Vulneráveis</Text>

        {/*Section Voluntários*/}
        <View style={styles.IconText2}>
          <Image style={styles.Icon} source={require('../../img/MsgVoluntarios.png')} />
          <Text style={styles.PBold}>Voluntários</Text>
        </View>

        {/* Renderizar as conversas filtradas de voluntários */}
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
    borderRadius: 10,
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
    marginTop: 70,
  },

  IconText2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginTop: 10,
    marginBottom:15,
  },

  ScrollView: {
    marginBottom: 60,
  },
  
  Icon: {
    height: 14,
    width: 16,
  },
});
