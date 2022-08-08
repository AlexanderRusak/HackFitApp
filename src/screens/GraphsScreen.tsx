import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import { VictoryBar } from 'victory-native';


export const GraphsScreen = () => {


  const { params } = useRoute()

  return (
    <View style={styles.container}>
      <VictoryBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
