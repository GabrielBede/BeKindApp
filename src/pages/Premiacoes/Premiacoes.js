import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Platform, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';

import Cupom from '../../components/Cupom';

export default function Perfil() {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.ScrollView}>

          <Text style={styles.H3}>Meus cupons</Text>

         {/*Componentes cupom*/}
            <Cupom
                cupom="BeKind: R$15 na loja do site"
                desc="Para pedidos acima de R$45,00"
            />
            
            <Cupom
                cupom="BeKind: R$15 na loja do site"
                desc="Para pedidos acima de R$45,00"
            />
            
            <Cupom
                cupom="BeKind: R$15 na loja do site"
                desc="Para pedidos acima de R$45,00"
            />
            
            <Cupom
                cupom="BeKind: R$15 na loja do site"
                desc="Para pedidos acima de R$45,00"
            />
            
            <Cupom
                cupom="BeKind: R$15 na loja do site"
                desc="Para pedidos acima de R$45,00"
            />
            
            <Cupom
                cupom="BeKind: R$15 na loja do site"
                desc="Para pedidos acima de R$45,00"
            />
            
            <Cupom
                cupom="BeKind: R$15 na loja do site"
                desc="Para pedidos acima de R$45,00"
            />
            
            <Cupom
                cupom="BeKind: R$15 na loja do site"
                desc="Para pedidos acima de R$45,00"
            />
            
            <Cupom
                cupom="BeKind: R$15 na loja do site"
                desc="Para pedidos acima de R$45,00"
            />

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
    marginLeft: 30,
    marginTop: 15,
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },

  
});
