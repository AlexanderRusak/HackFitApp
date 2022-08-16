import React, { useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import Swiper from 'react-native-swiper'
import { VictoryBar } from 'victory-native';
import { ThemeContext } from '../../context/ThemeContext';
import { WeighGraph } from '../../components/graphs/WeighGraph';
import { SaturationGraph } from '../../components/graphs/SaturationGraph';
import { HeartrateGraph } from '../../components/graphs/HeartrateGraph';
import { CaloriesGraph } from '../../components/graphs/CaloriesGraph';
import { GlucoseGraph } from '../../components/graphs/Glucose';
import { StepsGraph } from '../../components/graphs/StepsGraph';


export const GraphsScreen = () => {


  const { params } = useRoute();
  const { themeColor } = useContext(ThemeContext);

  const graphs = [
    SaturationGraph,
    HeartrateGraph,
    CaloriesGraph,
    GlucoseGraph,
    StepsGraph,
    WeighGraph,
  ]

  const graphsComponent = graphs.map(graph => {
    const GraphElement=graph;
    return<View key={graph.toString()} style={styles.slide1}>
      <GraphElement color={themeColor} />
    </View>
})


return (

  <Swiper style={styles.wrapper} showsButtons={true}>
    {graphsComponent}
  </Swiper>

);
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})