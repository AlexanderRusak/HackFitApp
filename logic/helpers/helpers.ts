import { BodyConfiguration } from '../../constants/screens/screens';
import { BodyParameters } from '../../store/types/settingsParameters';

export const isPushToSetting = ({ age, height, sex, weigh, heightUnits, weighUnits }: BodyParameters,
  navigation: (route: string) => void) => {
  if (!(Boolean(age) && Boolean(height) && Boolean(weigh) && Boolean(sex) && Boolean(weighUnits) && Boolean(heightUnits))) {
    navigation(BodyConfiguration);
  }
}

export const isFullBodyParameters = (bodyParameters: BodyParameters | undefined) => {
  if (!bodyParameters) {
    return false;
  }
  const { age, height, weigh, sex, heightUnits, weighUnits } = bodyParameters
  return Boolean(age) && Boolean(height) && Boolean(weigh) && Boolean(sex) && Boolean(heightUnits) && Boolean(weighUnits)
}