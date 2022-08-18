export interface BodyParameters {
  age: number,
  sex: 'Male' | 'Female' | string,
  weight: number,
  height: number,
  dateTime: number,
  heightUnits: string,
  weighUnits: string
}

export interface SettingsParameters {
  language: string,
  color: string,
  energy: string,
}