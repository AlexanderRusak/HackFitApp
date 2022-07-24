import { BodyConfiguration } from '../../constants/screens/screens';
import { BodyParameters } from '../../store/types/settingsParameters';

export const isPushToSetting = ({ age, height, sex, weigh }: BodyParameters,
  navigation: (route: string) => void) => {
  if (!(Boolean(age) && Boolean(height) && Boolean(weigh) && Boolean(sex))) {
    navigation(BodyConfiguration);
  }
}

export const isFullBodyParameters = ({ age, height, weigh, sex }: BodyParameters) => {
  return Boolean(age) && Boolean(height) && Boolean(weigh) && Boolean(sex)
}