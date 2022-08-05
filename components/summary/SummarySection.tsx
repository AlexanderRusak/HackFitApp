import React from 'react';
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { Graphs } from '../../constants/screens/screens'
import  { IStore } from '../../store'
import { theme } from '../../styles/theme'
export interface SummarySectionProps {
  headerName: string,
  textValue: string,
  type: string
}


export const SummarySection = ({ textValue, headerName, type }: SummarySectionProps) => {

  const navigation = useNavigation()

  const { color, energy } = useSelector((store: IStore) => store.settingsParameter);
  const { data } = useSelector((store: IStore) => store.bodyParameters)

  const sectionData = {
    Lungs: {
      src: require('../../static/images/lungs.png'),
      unit: '%'
    },
    Calories: {
      src: require('../../static/images/calories.png'),
      unit: energy
    },
    Glucose: {
      src: require('../../static/images/glucose.png'),
      unit: 'g/mmol'
    },
    Heart: {
      src: require('../../static/images/heart.png'),
      unit: 'BPM'
    },
    Scales: {
      src: require('../../static/images/scales.png'),
      unit: data && data.length && data[data.length - 1].weighUnits
    },
    Steps: {
      src: require('../../static/images/steps.png'),
      unit: 'steps'
    },
  };

  const handlePress = () => {
    navigation.navigate(Graphs as never, {
      data: type
    } as never)
  }



  return <TouchableOpacity onPress={handlePress} style={{ ...styles.container, backgroundColor: color }}>
    <View style={styles.headerBlock} >
      <View style={styles.textContainer}>
        <Text style={styles.headerName}>{headerName}</Text>
      </View>
      <Image
        style={styles.image}
        source={sectionData[type as keyof typeof sectionData].src}
      />
    </View>
    <View style={styles.dataBlock}>
      <Text style={styles.text}>{textValue} {sectionData[type as keyof typeof sectionData].unit}</Text>
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
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textContainer: {
    width: '50%',
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
  image: {
    width: 50,
    height: 50,
  }
})