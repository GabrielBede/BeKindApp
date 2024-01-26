import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Platform, StatusBar, Dimensions,TouchableOpacity, ImageBackground, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Conversa from '../../components/CardsCadastroVulneraveis';

export default function Home() {
  const navigation = useNavigation();
  const [conversasVoluntarios, setConversasVoluntarios] = useState([
    {
      pessoaSource: require('../../img/Pessoa1.png'),
      nome: 'Mariana',
      msg: 'Alerta feito: 10/01 - 10:30',
    },
    // Outras conversas de voluntários aqui
  ]);

  const [searchText, setSearchText] = useState('');

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
      
      <View style={{marginBottom:100,}}>

      <Text style={styles.H1}>Detalhes do Cadastro</Text>

          <View style={styles.IconText}>
            <Image style={styles.Icon} source={require('../../img/MsgVoluntarios.png')} />
            <Text style={styles.PBold}>Voluntário(a)</Text>
          </View>

          {renderConversas(filteredConversasVoluntarios)}

          <View style={styles.IconText2}>
            <Image style={styles.Icon} source={require('../../img/User.png')} />
            <Text style={styles.PBold}>Detalhes do Vulnerável</Text>
          </View>

          <Text style={styles.H2}>Nome:  <Text style={styles.H3}>João Paulo da Cruz Reis</Text></Text>
          <Text style={styles.H2}>Sexo:  <Text style={styles.H3}>Masculino</Text></Text>
          <Text style={styles.H2}>Localização:  <Text style={styles.H3}>Rua São Francisco, Vila São Gabriel - Guarulhos</Text></Text>
          <Text style={styles.H2}>Nome:  <Text style={styles.H3}>3</Text></Text>
          <Text style={styles.H2}>Nome:  <Text style={styles.H3}>Um homem de meia-idade, enfrenta dificuldades na vida que o levaram a viver nas ruas de um bairro empobrecido em Guarulhos. Ele costumava trabalhar como operário de construção civil, mas perdeu seu emprego devido à falta de oportunidades e, eventualmente, não conseguiu mais manter seu aluguel. João é uma pessoa gentil, apesar das dificuldades que enfrenta. Ele tenta encontrar pequenos trabalhos temporários para sobreviver, como a coleta de materiais recicláveis. Sua vida nas ruas o tornou resiliente, mas ele sonha em um dia conseguir um lar e uma oportunidade de recomeçar. João é uma vítima das complexas questões relacionadas à falta de moradia e pobreza, que afetam muitas pessoas em comunidades ao redor do mundo.</Text></Text>
      
      </View>


      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },

  Header:{
    width:'100%',
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop:-65,
    marginBottom:-20,
    alignSelf:'center',
    alignItems:'center',
  },

  Logo:{
    width:30,
    resizeMode:'contain',
    alignSelf: 'center',
  },

  Perfil:{
    width:50,
    resizeMode:'contain',
    alignSelf: 'center',
    marginRight:25,  
  },
  
  IconText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginTop: 70,
  },

  Icon: {
    height: 14,
    width: 16,
  },

  IconText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginTop: 15,
    marginBottom:20,
  },

  IconText2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    marginTop: 50,
    marginBottom:20,
  },
  
  PBold: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 17,
    marginLeft: 10,
    color: '#7E7E7E',
  },

  H1:{
    marginLeft: 30,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20, 
    fontFamily:'Montserrat-Bold',
  },
  H2:{
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    marginBottom: 15,
    fontSize: 17, 
    textAlign:'justify',
    fontFamily:'Montserrat-Bold',
  },
  
  H3:{
    marginLeft: 30,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 17, 
    fontFamily:'Montserrat-Medium',
  },
});