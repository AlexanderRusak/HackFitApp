import { PayloadAction } from '@reduxjs/toolkit'
import { LOAD_BODY_PARAMETERS, SAVE_BODY_PARAMETERS } from '../type';
import { BodyParameters, } from '../types/settingsParameters'

interface BodyParametersState {
  data: BodyParameters[]
}

const initialState: BodyParametersState = {
  data: [] as BodyParameters[]
}

export const bodyParametersReducer = (state = initialState, { payload, type }: PayloadAction<BodyParameters[]>): BodyParametersState => {
  switch (type) {
    case SAVE_BODY_PARAMETERS: {
      return {
        ...state,
        data: payload
      }
    }
    case LOAD_BODY_PARAMETERS: {


      return {
        ...state,
        data: payload
      }
    }
    default: return state;
  }
}
