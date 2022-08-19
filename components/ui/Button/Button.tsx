import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemeContext } from '../../../context/ThemeContext';
import { theme } from '../../../styles/theme';



interface ButtonProps {
  title: string,
  isDisabled?: boolean,
  handlePress: () => void,
}


export const Button = ({ title, handlePress, isDisabled = false}: ButtonProps) => {

  const { themeColor } = useContext(ThemeContext)

  return <TouchableOpacity
    disabled={isDisabled}
    style={{ ...styles.buttonContainer,backgroundColor:isDisabled? '#ccc': themeColor, }}
    onPress={handlePress}
  >
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    alignSelf: 'center',
  },
  button: {
    color: theme.colors.WHITE,
    fontSize: theme.mainFontSize
  }
});
