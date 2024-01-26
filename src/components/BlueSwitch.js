import React, {useState} from 'react';
import {View, Switch, StyleSheet} from 'react-native';

const BlueSwitch = () => {
  const [ativado, setativado] = useState(false);
  const toggleDoSwitch = () => setativado(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{false: '#EEF0F', true: '#6ABCFF'}}
        thumbColor={ativado ? '#007CE0' : '#7E7E7E'}
        ios_backgroundColor="#EEF0F"
        onValueChange={toggleDoSwitch}
        value={ativado}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BlueSwitch;