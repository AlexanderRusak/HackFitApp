
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { SummarySection } from '../../components/summary/SummarySection';
import { imageType } from '../../constants/summary/summaryData';
import { IStore } from '../../store';


export const SummaryScreen = () => {

  const { data } = useSelector((store: IStore) => store.bodyParameters);


  const saturationSection = useMemo(() => {
    return <SummarySection
      headerName='Saturation'
      type={imageType.Lungs}
      textValue={'98'}
    />
  }, []);

  const heartRateSection = useMemo(() => {
    return <SummarySection
      headerName='Heart Rate'
      type={imageType.Heart}
      textValue={'180'}
    />
  }, [])

  const caloriesSection = useMemo(() => {
    return <SummarySection
      headerName='Calories'
      type={imageType.Calories}
      textValue={'1000'}
    />
  }, []);

  const glucoseLevelSection = useMemo(() => {
    return <SummarySection
      headerName='Glucose Level'
      type={imageType.Glucose}
      textValue={'5.8'}
    />
  }, []);

  const stepsSection = useMemo(() => {
    return <SummarySection
      headerName='Steps'
      type={imageType.Steps}
      textValue={'8000'}
    />
  }, []);

  const currentWeightSection = useMemo(() => {
    return <SummarySection
      headerName='Current Weight'
      type={imageType.Scales}
      textValue={data && data.length && data[data.length - 1]?.weigh?.toString() || ''}
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
