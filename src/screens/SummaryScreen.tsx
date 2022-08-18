
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SummarySection } from '../../components/summary/SummarySection';
import { IStore } from '../../store';


export const SummaryScreen = () => {

  const { data } = useSelector((store: IStore) => store.bodyParameters);

  const saturationSection = useMemo(() => {
    return <SummarySection
      headerName='Saturation'
      sectionName='Saturation'
      textValue={'98'}
    />
  }, []);

  const heartRateSection = useMemo(() => {
    return <SummarySection
      headerName='Heart Rate'
      sectionName='Heart'
      textValue={'180'}
    />
  }, [])

  const caloriesSection = useMemo(() => {
    return <SummarySection
      headerName='Calories'
      sectionName='Calories'
      textValue={'1000'}
    />
  }, []);

  const glucoseLevelSection = useMemo(() => {
    return <SummarySection
      headerName='Glucose Level'
      sectionName='Glucose'
      textValue={'5.8'}
    />
  }, []);

  const stepsSection = useMemo(() => {
    return <SummarySection
      headerName='Steps'
      sectionName='Steps'
      textValue={'8000'}
    />
  }, []);

  const currentWeightSection = useMemo(() => {
    return <SummarySection
      headerName='Current Weight'
      sectionName='Weight'
      textValue={data && data.length && data[data.length - 1]?.weight?.toString() || ''}
    />
  }, [data, data.length]);


  return (
    <View style={styles.container}>
      {saturationSection}
      {heartRateSection}
      {caloriesSection}
      {glucoseLevelSection}
      {stepsSection}
      {currentWeightSection}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'space-around',
    justifyContent: 'space-around'
  },
});
