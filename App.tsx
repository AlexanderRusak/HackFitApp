/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import { Provider as ReduxProvider } from 'react-redux'
import {
  StyleSheet,
  View,
} from 'react-native';

import { ThemeContext } from './context/ThemeContext';
import store from './store';
import { MainEntry } from './src/main/MainApp.entry';



const App = () => {

  const [themeColor, setThemeColor] = useState<string>('')
  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }} >
    <ReduxProvider store={store}>
      <View style={styles.container}>
        <MainEntry />
      </View>
    </ReduxProvider>
  </ThemeContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default App;
