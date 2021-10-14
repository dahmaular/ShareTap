import {Action, combineReducers} from 'redux';
import {ThunkAction} from '@reduxjs/toolkit';

import userReducer from './user';

const rootReducer = combineReducers({user: userReducer});

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk = ThunkAction<void, RootState, undefined, Action<string>>;

export default rootReducer;
