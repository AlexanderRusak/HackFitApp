import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';


export const GraphsScreen = () => {


  const { params } = useRoute()

  console.log(params);


  return (
    <View style={styles.container}>
      <Text>Graphs Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
