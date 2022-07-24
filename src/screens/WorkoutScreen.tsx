import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


export const WorkoutScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Workout Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
