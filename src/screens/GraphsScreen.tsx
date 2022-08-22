import React, { useContext, useEffect, useState } from 'react';
import { ParamListBase, RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, Route } from 'react-native';
import Swiper from 'react-native-swiper'
import { ThemeContext } from '../../context/ThemeContext';
import { WeightGraph } from '../../components/graphs/WeighGraph';
import { SaturationGraph } from '../../components/graphs/SaturationGraph';
import { HeartrateGraph } from '../../components/graphs/HeartrateGraph';
import { CaloriesGraph } from '../../components/graphs/CaloriesGraph';
import { GlucoseGraph } from '../../components/graphs/Glucose';
import { StepsGraph } from '../../components/graphs/StepsGraph';


type Param = {
  ParamData: {
    data: string
  }
}

export const GraphsScreen = () => {

  const graphs = [
    SaturationGraph,
    CaloriesGraph,
    GlucoseGraph,
    HeartrateGraph,
    StepsGraph,
    WeightGraph,
  ];

  const { params } = useRoute<RouteProp<Param, "ParamData">>();
  const { themeColor } = useContext(ThemeContext);
  const isFocused = useIsFocused();

  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const grpaphIndex = graphs.findIndex((graph) => graph.name.includes(params?.data));
    setIndex(grpaphIndex !== -1 ? grpaphIndex : 0);
  }, [isFocused, params]);

  const graphsComponent = graphs.map(graph => {
    const GraphElement = graph;
    return <View key={graph.toString()} style={styles.slide1}>
      <GraphElement color={themeColor} />
    </View>
  });

  return (
    isFocused ? <Swiper showsPagination={false} index={index} style={styles.wrapper} showsButtons={true}>
      {graphsComponent}
    </Swiper> : null

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