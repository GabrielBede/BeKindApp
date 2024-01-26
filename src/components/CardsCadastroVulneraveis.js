import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

const Conversa = ({ pessoaSource, nome, msg }) => {
  const [status, setStatus] = useState('Pendente'); // Estado inicial é "Pendente"

  const handleStatusChange = () => {
    setStatus(status === 'Pendente' ? 'Concluído' : 'Pendente'); // Alterna entre "Concluído" e "Pendente"
  };

  return (
    <View style={styles.Conversa}>
      <Image style={styles.Pessoa} source={pessoaSource} />

      <View style={styles.InfoContainer}>
        <Text style={styles.Nome}>{nome}</Text>
        <Text style={styles.Msg}>{msg}</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.StatusButton,
          { backgroundColor: status === 'Pendente' ? '#7E7E7E' : '#007CE0' },
        ]}
        onPress={handleStatusChange}
      >
        <Text style={styles.StatusButtonText}>{status}</Text>
      </TouchableOpacity>
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

  StatusButton: {
    borderRadius: 25, // Borda arredondada
    paddingVertical: 5, // Espaçamento vertical dentro do botão
    paddingHorizontal: 10, // Espaçamento horizontal dentro do botão
    marginRight: 30, // Espaçamento entre o botão e a InfoContainer
  },

  StatusButtonText: {
    color: 'white', // Cor do texto do botão (pode personalizar)
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
  },

  InfoContainer: {
    flex: 1,
    marginLeft: 10, // Espaço à esquerda das informações (ajustável)
  },

  Pessoa: {
    width: 60,
    height: 60,
    marginLeft:30,
    resizeMode: 'contain',
  },

  Nome: {
    color: '#000',
    fontFamily: 'Montserrat-Bold',
    fontSize: 15,
  },

  Msg: {
    color: 'grey',
    fontFamily: 'Montserrat-Medium',
  },
});

export default Conversa;
