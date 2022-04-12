import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from '../../src/slices';
import {ListReceivedCardsResponse} from '../services/rolodexService';

import {listReceivedCardsService} from '../services/rolodexService';

type ReceivedCards = ListReceivedCardsResponse['listReceivedCards']['cards'];

interface State {
  error: boolean;
  loading: boolean;
  receivedCards: ReceivedCards;
}

const initialState: State = {
  error: false,
  loading: false,
  receivedCards: [],
};

const fetchStart = (state: State) => {
  state.loading = true;
  state.error = false;
};

const fetchFailure = (state: State) => {
  state.loading = false;
  state.error = true;
};

const rolodex = createSlice({
  name: 'rolodex',
  initialState,
  reducers: {
    fetchReceivedCardsStart: fetchStart,

    fetchReceivedCardsSuccess(
      state: State,
      {payload}: PayloadAction<ReceivedCards>,
    ) {
      state.receivedCards = payload;
      state.error = false;
      state.loading = false;
    },

    fetchReceivedCardsFailure: fetchFailure,
  },
});

export const {
  fetchReceivedCardsFailure,
  fetchReceivedCardsSuccess,
  fetchReceivedCardsStart,
} = rolodex.actions;

export default rolodex.reducer;

/****** Thunks ******/

export const fetchReceivedCards =
  (userId: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchReceivedCardsStart());

      const {data} = await listReceivedCardsService(userId);
      dispatch(fetchReceivedCardsSuccess(data));
    } catch (error) {
      dispatch(fetchReceivedCardsFailure());
    }
  };
