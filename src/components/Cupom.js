import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

const Cupom = ({ cupom, desc}) => {
  return (
      <View>
         {/*Cupom*/}
         <TouchableOpacity>
          <View style={styles.Cupom}>
            <Image style={styles.CupomImg} source={require('../img/Cupom.png')} />

              <View style={styles.CupomText}>
                <Text style={styles.PBoldBlack}>{cupom}</Text>
                <Text style={styles.Text}>{desc}</Text>
              </View>   
          </View>
          </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  PBoldBlack: {
    fontFamily:'Montserrat-Bold',
    fontSize: 14,
    color: '#000',
  },
  
   Cupom: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginHorizontal: 30,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#7E7E7E',
    padding: 15
  },
  
  CupomImg:{
    width: 55,
    height: 55,
    marginVertical: 5
  },

  CupomText:{
    justifyContent: 'center',
    marginLeft: 25
  },

  Text:{
    fontSize: 13,
    fontFamily: 'Montserrat-Regular', 
  },
  
});

export default Cupom;