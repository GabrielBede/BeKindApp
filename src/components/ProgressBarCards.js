import * as React from 'react';
import { ProgressBar, Colors } from 'react-native-paper';


const Progresso = ({ style, progress, color }) => (
  <ProgressBar style={style} progress={progress} color={color} />
);

export default Progresso;