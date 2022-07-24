import { PayloadAction } from '@reduxjs/toolkit'
import { LOAD_SETTINGS_PARAMETERS, SAVE_SETTINGS_PARAMETERS } from '../type';
import { SettingsParameters } from '../types/settingsParameters'

const initialState: SettingsParameters = {
  language: '',
  color: '',
  energy: ''
}

export const settingsParameterReducer = (state = initialState, { payload, type }: PayloadAction<SettingsParameters>): SettingsParameters => {

  switch (type) {
    case LOAD_SETTINGS_PARAMETERS: {
      return {
        ...state,
        color: payload.color,
        energy: payload.energy,
        language: payload.language
      }
    }
    case SAVE_SETTINGS_PARAMETERS: {
      return {
        ...state,
        color: payload.color,
        energy: payload.energy,
        language: payload.language
      }
    }
    default: return state;
  }
}
