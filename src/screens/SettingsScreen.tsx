import React, { useCallback, useContext, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {Dispatch} from 'redux';
import { SelectSection } from '../../components/settings/SelectSection';
import { Button } from '../../components/ui/Button/Button';
import { BodyConfiguration } from '../../constants/screens/screens';
import { ThemeContext } from '../../context/ThemeContext';
import { ColorSchema, EnergyUnits, Languages } from '../../settings/constants';
import { IStore } from '../../store';
import { saveSettingsParameters } from '../../store/actions/settingsParameter';
import { SettingsParameters } from '../../store/types/settingsParameters';
import { theme } from '../../styles/theme';







export const SettingsScreen = ({ navigation }: any) => {

  const dispatch = useDispatch<Dispatch<any>>();
  const { setThemeColor } = useContext(ThemeContext)
  const settingsData = useSelector(({ settingsParameter }: IStore) => settingsParameter);
  const [settingsState, setSettingsState] = useState(settingsData);



  const paramsArray = [
    { array: Languages, title: "Language", type: 'language' },
    { array: EnergyUnits, title: "Energy Unit", type: 'energy' },
    { array: ColorSchema, title: "Color Schema", type: 'color' }
  ];

  const handleSection = useCallback((data: string, type: string) => {
    setSettingsState({ ...settingsState, [type.split(' ')[0].toLowerCase()]: data })
    dispatch(saveSettingsParameters({ ...settingsState, [type.split(' ')[0].toLowerCase()]: data }));
    type.split(' ')[0].toLowerCase() === 'color' ? setThemeColor(data) : null
  }, []);

  const selectSectionComponent = useMemo(
    () => paramsArray.map(({ array, title, type }) => {
      const downArray = array.reduce((prev, { title: name }) => [...prev, name], [] as string[]);
      const defaultValue = array.find(({ value, title }) => {
        return (type === 'color' ? value.toLowerCase() : title.toLowerCase()) === settingsData[type as keyof SettingsParameters].toLowerCase();
      });

      return defaultValue && <SelectSection
        key={title}
        dropDownArray={downArray}
        title={title}
        handleSelect={handleSection}
        defaultValue={defaultValue.title}
      />
    }), [settingsState]
  );



  const handlePress = () => {
    navigation.navigate(BodyConfiguration)
  }

  return (
    <View style={styles.container}>
      {selectSectionComponent}
      <View style={styles.buttonContainer}>
      <Button
        handlePress={handlePress}
        title={'Configure body Parameters'}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.WHITE,
  },
  buttonContainer:{
    marginTop:50,
    width:'90%',
    alignSelf:'center'
  },
  button: {
    color: theme.colors.WHITE,
    fontSize: theme.mainFontSize
  }
});
