import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { ParameterParams } from './BodyParameterScreen';
import { useIsFocused } from '@react-navigation/native';
import { IStore } from '../../store';
import { BodyParameters } from '../../store/types/settingsParameters';
import { loadBodyParameters, saveBodyParameters } from '../../store/actions/bodyParameters';
import { theme } from '../../styles/theme';
import { isFullBodyParameters } from '../../logic/helpers/helpers';
import { ButtonSection } from '../../components/settings/ButtonSection';
import { SelectSection } from '../../components/settings/SelectSection';


export const BodyConfigurationScreen = ({ navigation }: any) => {

  const isFocused = useIsFocused();
  const { data: bodyParameters } = useSelector((store: IStore) => store.bodyParameters)
  const dispatch = useDispatch<Dispatch<any>>()
  const [bodyParametersState, setBodyParametersState] = useState<BodyParameters>(bodyParameters[bodyParameters.length - 1]);

  useEffect(() => {
    const getBodyParameters = async () => {
      if (bodyParameters.length) {
        setBodyParametersState(bodyParameters[bodyParameters.length - 1])
      } else {
        dispatch(loadBodyParameters());
      }
    }
    getBodyParameters();
  }, [bodyParameters]);

  useEffect(() => {
    dispatch(loadBodyParameters());
  }, [isFocused])


  const handleSection = useCallback((data: string) => {
    const lastBodyDataParameter = bodyParameters[bodyParameters.length - 1];

    isFullBodyParameters(lastBodyDataParameter) ? dispatch(saveBodyParameters([...bodyParameters, { ...bodyParametersState, 'sex': data }])) :
      dispatch(saveBodyParameters([
        {
          ...lastBodyDataParameter,
          'sex': data
        }
      ]))

    setBodyParametersState({ ...bodyParametersState, 'sex': data });

  }, [bodyParametersState, navigation]);

  console.log(bodyParameters);




  const handleScreen = useCallback((nameScreen: string, data: number) => {
    bodyParametersState && navigation.navigate(nameScreen, {
      isMeasuring: !!["Weight", "Height"].find((name) => name === nameScreen),
      type: nameScreen.toLowerCase(),
      data,
      bodyData: bodyParameters
    } as unknown as ParameterParams);
  }, [bodyParameters])



  return (
    <View style={styles.container}>
      <ButtonSection title='Age' defaultValue={bodyParametersState ? bodyParametersState.age : 0} handleScreen={handleScreen} />
      <SelectSection title='Sex' defaultValue={bodyParametersState?.sex || 'Not Set'} dropDownArray={['Male', 'Female']} handleSelect={handleSection} />
      <ButtonSection title='Weight' defaultValue={bodyParametersState ? bodyParametersState.weight : 0} handleScreen={handleScreen} />
      <ButtonSection title='Height' defaultValue={bodyParametersState ? bodyParametersState.height : 0} handleScreen={handleScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.WHITE,
  },
});


