import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from '../../src/slices';

interface State {
  error: boolean;
  loading: boolean;
}

const initialState: State = {
  error: false,
  loading: false,
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
    fetchUserStart: fetchStart,

    fetchUserSuccess(state: State /*{ payload }: PayloadAction<User>*/) {
      state.error = false;
      state.loading = false;
    },

    fetchUserFailure: fetchFailure,
  },
});

export const {fetchUserFailure, fetchUserSuccess, fetchUserStart} =
  user.actions;

export default user.reducer;

/****** Thunks ******/
export const fetchUser =
  (userData: Record<'userId' | 'userRole', string>): AppThunk =>
  async dispatch => {
    try {
      dispatch(fetchUserStart());
    } catch (error) {
      dispatch(fetchUserFailure());
    }
  };
