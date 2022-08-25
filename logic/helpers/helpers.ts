import { BodyConfiguration } from '../../constants/screens/screens';
import { BodyParameters } from '../../store/types/settingsParameters';

export const isPushToSetting = ({ age, height, sex, weight, heightUnits, weighUnits }: BodyParameters,
  navigation: (route: string) => void) => {
  console.log(age, height, sex, weight, heightUnits, weighUnits );

  if (!(Boolean(age) && Boolean(height) && Boolean(weight) && Boolean(sex) && Boolean(weighUnits) && Boolean(heightUnits))) {
    navigation(BodyConfiguration);
  }
}

export const isFullBodyParameters = (bodyParameters: BodyParameters | undefined) => {
  if (!bodyParameters) {
    return false;
  }
  const { age, height, weight, sex, heightUnits, weighUnits } = bodyParameters
  return Boolean(age) && Boolean(height) && Boolean(weight) && Boolean(sex) && Boolean(heightUnits) && Boolean(weighUnits)
}