import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from '../../src/slices';

import {
  ListUserCardsResponse,
  listUserCardsService,
} from '../services/userService';

type Card = ListUserCardsResponse['listUserCards']['cards'];

interface State {
  error: boolean;
  loading: boolean;
  profile: {};
  cards: Card;
}

const initialState: State = {
  error: false,
  loading: false,
  profile: {},
  cards: [],
};

const fetchStart = (state: State) => {
  state.loading = true;
  state.error = false;
};

const fetchFailure = (state: State) => {
  state.loading = false;
  state.error = true;
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserCardsStart: fetchStart,

    fetchUserCardsSuccess(state: State, {payload}: PayloadAction<Card>) {
      state.cards = payload;
      state.error = false;
      state.loading = false;
    },

    fetchUserCardsFailure: fetchFailure,
  },
});

export const {
  fetchUserCardsFailure,
  fetchUserCardsSuccess,
  fetchUserCardsStart,
} = user.actions;

export default user.reducer;

/****** Thunks ******/
export const fetchUser =
  (userId: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchUserCardsStart());
    } catch (error) {
      dispatch(fetchUserCardsFailure());
    }
  };

export const fetchUserCards =
  (userId: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchUserCardsStart());

      const {data} = await listUserCardsService(userId);

      dispatch(fetchUserCardsSuccess(data));
    } catch (error) {
      dispatch(fetchUserCardsFailure());
    }
  };
