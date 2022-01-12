import {Action, combineReducers} from 'redux';
import {ThunkAction} from '@reduxjs/toolkit';

import userReducer from './user';

import rolodexReducer from './rolodex';

const rootReducer = combineReducers({user: userReducer, rolodex: rolodexReducer});

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk = ThunkAction<void, RootState, undefined, Action<string>>;

export default rootReducer;
