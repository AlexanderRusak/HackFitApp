import { BodyParameters, SettingsParameters } from '../store/types/settingsParameters';

export const initialSettings: SettingsParameters = {
  color: '#800020',
  energy: 'calories',
  language: 'english'
}

export const initialBodyParameters: BodyParameters = {
  age: 0,
  dateTime: 0,
  height: 0,
  heightUnits: 'CM',
  sex: '',
  weigh: 0,
  weighUnits: 'KG'

}