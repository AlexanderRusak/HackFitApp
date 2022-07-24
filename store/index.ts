import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { bodyParametersReducer } from './reducers/bodyParameters';
import { settingsParameterReducer } from './reducers/settingsParameter';
import { BodyParameters, SettingsParameters } from './types/settingsParameters';

export interface IStore {
  settingsParameter: SettingsParameters,
  bodyParameters: { data: BodyParameters[] }
}

const rootReducer = combineReducers({
  settingsParameter: settingsParameterReducer,
  bodyParameters: bodyParametersReducer
})

export default configureStore({
  reducer: rootReducer,
  middleware: [thunk],
})