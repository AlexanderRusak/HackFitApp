import React, { useCallback, useContext } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { theme } from '../../styles/theme';
import AntDesign from "react-native-vector-icons/AntDesign";
import { ThemeContext } from '../../context/ThemeContext';
import { Icon } from '../ui/Icon/Icon';


interface IButtonSection {
  defaultValue: number,
  title: string,
  handleScreen: (name: string, data: number) => void,
}

export const ButtonSection = ({ defaultValue, title, handleScreen }: IButtonSection) => {

  const { themeColor } = useContext(ThemeContext);

  const handleSelectHandler = useCallback(() => {   
    handleScreen(title, defaultValue);
  }, [handleScreen])

  return <View style={{ ...styles.container, borderColor: themeColor }}>
    <Text style={{ ...styles.sectionTitle, color: themeColor }}>{title}</Text>
    <TouchableOpacity style={{ ...styles.buttonContainer, backgroundColor: themeColor }} onPress={handleSelectHandler} >
      <Text
        style={styles.button}
      >{defaultValue ? defaultValue : 'Not Set'}</Text>
      <Icon iconName='right' iconFont='AntDesign' styles={styles.downIcon} />
    </TouchableOpacity>
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
  },
  sectionTitle: {
    fontSize: theme.mainFontSize,
  },
  downIcon: {
    position: "relative",
    left: '100%',
    paddingRight: '5%',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '55.5%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',


  },
  button: {
    color: theme.colors.WHITE,
    fontSize: theme.mainFontSize
  },
});