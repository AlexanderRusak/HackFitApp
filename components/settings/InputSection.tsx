import React, { useCallback, useContext } from 'react'
import { Text, StyleSheet, View, TextInput } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import { theme } from '../../styles/theme';

interface InputSectionProps {
  title?: string,
  handleInput?: (name: string) => void,
  maxLength?: number,
  placeholder?: string,
  defaultValue?: number
}

export const InputSection = ({ title, handleInput, maxLength, placeholder, defaultValue }: InputSectionProps) => {

  const { themeColor } = useContext(ThemeContext)

  const handleInputHandler = useCallback((text: string) => {
    handleInput && handleInput(text)
  }, [])

  return <View style={{ ...styles.container, borderColor: themeColor }}>
    <Text style={{ ...styles.sectionTitle, borderColor: themeColor, color: themeColor }}>{title}</Text>
    <TextInput
      value={defaultValue ? defaultValue?.toString() : ''}
      keyboardType={maxLength ? 'number-pad' : 'default'}
      maxLength={maxLength}
      style={{
        ...styles.input,
        borderColor: themeColor,
        color: themeColor
      }}
      placeholder={placeholder}
      onChangeText={handleInputHandler} />
  </View>
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
    marginHorizontal: '5%',
    borderBottomWidth: 1,

    height: 50
  },
  sectionTitle: {
    fontSize: theme.mainFontSize,
  },
  input: {
    width: '55.5%',
    borderWidth: 1,
    borderBottomWidth: 0,
    fontSize: theme.mainFontSize,
    padding: "5%",
    fontWeight: '600'
  }
});