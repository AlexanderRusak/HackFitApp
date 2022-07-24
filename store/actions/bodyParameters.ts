import { STORAGE_KEYS } from '../../storage/constants';
import { getDataFromStorage, setDataToStorage } from '../../storage/storageHelpers';
import { LOAD_BODY_PARAMETERS, SAVE_BODY_PARAMETERS } from '../type';
import { BodyParameters } from '../types/settingsParameters';

export const saveBodyParameters = (data: BodyParameters[]) => {
  return async (dispatch: (arg0: { type: string; payload: BodyParameters[] }) => void) => {
    await setDataToStorage(STORAGE_KEYS.BodyParameters, data);
    dispatch({
      type: SAVE_BODY_PARAMETERS,
      payload: data
    })
  }
}

export const loadBodyParameters = () => {
  return async (dispatch: (arg0: { type: string; payload: BodyParameters[] }) => void) => {
    const data = await getDataFromStorage(STORAGE_KEYS.BodyParameters) as BodyParameters[];
    dispatch({
      type: LOAD_BODY_PARAMETERS,
      payload: [...data] as BodyParameters[]
    })
  }
}