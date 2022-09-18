import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {ThemeContext} from '../../../context/ThemeContext';

interface PeriodTextComponentProps {
  start: number | string;
  finish: number | string;
}

export const PeriodTextComponent = ({
  finish,
  start,
}: PeriodTextComponentProps) => {
  const {themeColor} = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text>Selected period:</Text>
      <Text style={{...styles.text, color:themeColor}}>
        {start}-{finish}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  text: {
    color: 'red',
  },
});
