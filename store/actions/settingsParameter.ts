import { STORAGE_KEYS } from '../../storage/constants';
import { getDataFromStorage, setDataToStorage } from '../../storage/storageHelpers';
import { SAVE_SETTINGS_PARAMETERS } from '../type'
import { SettingsParameters } from '../types/settingsParameters';



export const saveSettingsParameters = (data: SettingsParameters) => {
  return async (dispatch: (arg0: { type: string; payload: SettingsParameters }) => void) => {
    await setDataToStorage(STORAGE_KEYS.SetingsParameters, data);
    dispatch({
      type: SAVE_SETTINGS_PARAMETERS,
      payload: data
    })
  }
}

export const loadSettingsParameters = () => {
  return async (dispatch: (arg0: { type: string; payload: SettingsParameters }) => void) => {
    const data = await getDataFromStorage(STORAGE_KEYS.SetingsParameters);
    dispatch({
      type: SAVE_SETTINGS_PARAMETERS,
      payload: data as SettingsParameters
    })
  }
}



