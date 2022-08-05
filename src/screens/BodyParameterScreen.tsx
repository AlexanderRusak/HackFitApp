import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { InputSection } from '../../components/settings/InputSection';
import { SelectSection } from '../../components/settings/SelectSection';
import { Button } from '../../components/ui/Button/Button';
import { BodyConfiguration } from '../../constants/screens/screens';
import { isFullBodyParameters } from '../../logic/helpers/helpers';
import { HEIGHT, WEIGH } from '../../logic/measure/constants';
import { saveBodyParameters } from '../../store/actions/bodyParameters';
import { BodyParameters } from '../../store/types/settingsParameters';
import { theme } from '../../styles/theme';


export interface ParameterParams {
  isMeasuring: boolean,
  type: UnitTypes,
  data: number,
  bodyData: BodyParameters[]
}

export type UnitTypes = 'weigh' | 'height' | 'age';

export const BodyParameter = ({ route, navigation }: any) => {

  const dispatch = useDispatch<Dispatch<any>>();
  const { params } = route;
  const { isMeasuring, type, bodyData }: ParameterParams = params;

  const [bodyState, setBodyDataState] = useState<BodyParameters>(bodyData[bodyData.length - 1] || []);



  const handleSave = () => {
    const lastBodyDataParameter = bodyData[bodyData.length - 1]
    isFullBodyParameters(lastBodyDataParameter) ?
      dispatch(saveBodyParameters([...bodyData, bodyState])) :
      dispatch(saveBodyParameters([{ ...lastBodyDataParameter, ...bodyState }]))
    navigation.navigate(BodyConfiguration)
  }

  const handleSectionMeasuring = (data: string) => {
    const unitData = type === 'height' ? { heightUnits: data.trim() } : { weighUnits: data.trim() };
    setBodyDataState({ ...bodyState, dateTime: new Date().getTime(), ...unitData })
  }

  const handleInput = (name: string) => {
    setBodyDataState({ ...bodyState, [type.toLowerCase()]: +name, dateTime: new Date().getTime() })
  }

  const dropArray = type === 'height' ? HEIGHT : WEIGH;

  const defaultDropArrayValue = type === 'height' ? bodyState.heightUnits || 'cm' : bodyState.weighUnits || 'kg';

  const bodyParameterComponent = useMemo(
    () => {
      return isMeasuring ? <>
        <SelectSection title='Measuring' dropDownArray={dropArray} handleSelect={handleSectionMeasuring} defaultValue={defaultDropArrayValue} />
        <InputSection handleInput={handleInput} defaultValue={bodyState[type]} title={type.charAt(0).toUpperCase() + type.slice(1)} maxLength={type === 'height' ? 3 : 2} placeholder={`Enter your ${type}`} />
      </> :
        <InputSection handleInput={handleInput} defaultValue={bodyState[type]} title="Age" maxLength={3} placeholder={`Enter your ${type.toLocaleLowerCase()}`} />
    }

    , [bodyState])

  return (
    <View style={styles.container}>
      {bodyParameterComponent}
      <Button
        title='Save'
        handlePress={handleSave}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.WHITE,
  },
});
