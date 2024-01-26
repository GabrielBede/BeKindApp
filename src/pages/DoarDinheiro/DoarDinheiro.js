import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Platform, StatusBar, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text'; // Importação da biblioteca para máscara de input

import BlueSwitch from '../../components/BlueSwitch';

// const statusBarHeight = StatusBar.currentHeight;
const { width } = Dimensions.get('window');

export default function DoarDinheiro() {
  const navigation = useNavigation();

  const [Valor, setValor] = useState('');  

  function Pagamento (){
        alert ('Pagamento efetuado com sucesso!');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.ScrollView}>

        <View style={styles.Margin}>

          {/* Textos */}
          <Text style={styles.H3}>Doe agora</Text>
          <Text style={styles.PBoldBlack}>Selecione a quantia</Text>
            
          {/* Input de valor da doação */}
          <View style={styles.InputContainer}>
            <Text style={styles.PInput}>R$</Text>
            <TextInputMask
              style={styles.Input}
              type={'money'} // Tipo da máscara da biblioteca "TextInputMask"
              options={{
                precision: 2, // Número de casas decimais
                separator: ',', // Separador de decimais
                delimiter: '.', // Separador de milhar
                unit: '', // Unidade (por exemplo, 'R$ ')
              }}
              placeholder="0,00"
              placeholderTextColor="#7E7E7E"
              keyboardType='numeric'
              value={Valor}
              onChangeText={(text) => setValor(text)}
            />
          </View>


          {/* Valores preestabelecidos para doação */}
          <View style={styles.BotoesValores}>
            <View style={styles.Row}>
              <TouchableOpacity onPress={() => setValor('50,00')}>
                <Text style = {styles.Botao}> R$50,00 </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setValor('100,00')}>
                <Text style = {styles.Botao}> R$100,00 </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setValor('200,00')}>
                <Text style = {styles.Botao}> R$200,00 </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setValor('500,00')}>
                <Text style = {styles.Botao}> R$500,00 </Text>
              </TouchableOpacity>
              </View>
          </View>

          {/* Doaçoes anonimas */}
              <Text style={styles.H3}>Perfil</Text>

            <View style={styles.Anonimo}>
                <Text style={styles.PBoldBlack}>Efetuar de forma anônima</Text>
                <BlueSwitch/>
            </View>

            <View style={styles.Row}>
                <Feather name='alert-circle' size={23} color={"#007CE0"} />
              <View style={styles.Aviso}>
                <Text style={styles.PBlack}>Com o modo anônimo ativado, você ficará oculto do publico e das pessoas que talvez conheça.</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Mensagens')}>
              <View style={styles.Mensagem}>
                <Feather name='message-square' size={23} color={"#007CE0"} />
                <Text style={styles.PBoldBlue}>Adicionar mensagem</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress = {Pagamento}>
              <Text style = {styles.Pagar} value={''}>Concluir pagamento</Text>
            </TouchableOpacity>
        </View>

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

  H3: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    marginTop: 15
  },

  PBlack: {
    marginRight:20,
    color: '#000',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
  
  PBoldBlack: {
    marginRight:30,
    fontFamily:'Montserrat-Bold',
    fontSize: 14,
    color: '#000',
  },

  PBoldBlue: {
    marginLeft: 15,
    fontFamily:'Montserrat-Bold',
    fontSize: 14,
    color: '#007CE0',
  },

  Row:{
    flexDirection: 'row',
    marginBottom: 10,
  },

  Margin:{
    marginHorizontal: 30
  },

  Anonimo:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-around',
    width:'130%',
  },

  Aviso:{
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 170
  },

  Mensagem:{
    flexDirection: 'row',
    alignSelf: 'center'
  },

  InputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    borderBottomWidth: 1,
    borderColor: '#7E7E7E',
    paddingBottom: 10,
    marginBottom: 40
  },

  PInput: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#7E7E7E',
    marginRight: 5,
  },

  Input: {
    flex: 1,
    padding: 0,
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#000',
  },

  BotoesValores:{
    marginBottom: 60,
    marginLeft:-5,
  },

  Botao:{
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#7E7E7E',
    padding: 6,
    width: 80,
    marginRight: 10,
    fontSize: 13,
    fontFamily: 'Montserrat-Regular',
    color: '#007CE0',
    textAlign: 'center'
  },

  Pagar:{
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 13,
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    marginTop: 15,
    textAlign: 'center',
    marginVertical: 45,
  },
});
