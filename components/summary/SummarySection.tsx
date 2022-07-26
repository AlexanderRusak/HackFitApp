import React from 'react';
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { Graphs } from '../../constants/screens/screens'
import { IStore } from '../../store'
import { theme } from '../../styles/theme'
import { Fonts, Icon } from '../ui/Icon/Icon';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export interface SummarySectionProps {
  headerName: string,
  textValue: string,
  sectionName: string
}


export const SummarySection = ({ textValue, headerName, sectionName }: SummarySectionProps) => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>()

  const { color, energy } = useSelector((store: IStore) => store.settingsParameter);
  const { data } = useSelector((store: IStore) => store.bodyParameters)

  const sectionData = {
    Saturation: {
      font: 'MaterialCommunityIcons' as keyof typeof Fonts,
      name: 'lungs',
      unit: '%'
    },
    Calories: {
      font: 'MaterialCommunityIcons' as keyof typeof Fonts,
      name: 'food',
      unit: energy
    },
    Glucose: {
      font: 'Fontisto' as keyof typeof Fonts,
      name: 'blood-drop',
      unit: 'g/mmol'
    },
    Heart: {
      font: 'Fontisto' as keyof typeof Fonts,
      name: 'pulse',
      unit: 'BPM'
    },
    Weight: {
      font: 'MaterialCommunityIcons' as keyof typeof Fonts,
      name: 'scale-bathroom',
      unit: data && data.length && data[data.length - 1].weighUnits
    },
    Steps: {
      font: 'MaterialCommunityIcons' as keyof typeof Fonts,
      name: 'walk',
      unit: 'steps'
    },
  };

  const handlePress = () => {
    navigation.navigate(Graphs, {
      data: sectionName
    })
  }

  return <TouchableOpacity onPress={handlePress} style={{ ...styles.container, backgroundColor: color }}>
    <View style={styles.headerBlock} >
      <View style={styles.textContainer}>
        <Text style={styles.headerName}>{headerName}</Text>
      </View>
      <Icon size={50} iconFont={sectionData[sectionName as keyof typeof sectionData].font} iconName={sectionData[sectionName as keyof typeof sectionData].name} />
    </View>
    <View style={styles.dataBlock}>
      <Text style={styles.text}>{textValue} {sectionData[sectionName as keyof typeof sectionData].unit}</Text>
    </View>
  </TouchableOpacity>
}


const styles = StyleSheet.create({
  container: {
    width: '45%',
    height: "30%",
    display: 'flex',
    flexDirection: 'column'
  },
  headerBlock: {
    height: '30%',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textContainer: {
    width: '60%',
  },
  headerName: {
    color: theme.colors.WHITE,
    fontSize: theme.mainFontSize
  },
  dataBlock: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: theme.colors.WHITE,
    fontSize: theme.mainFontSize * 1.5
  },
})