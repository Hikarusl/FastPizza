import {
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from "@reduxjs/toolkit";
import type {FetchAddressResult, UserState} from "./storeTypes.ts";
import {GeolocationService} from "../../services/GeolocationService.ts";

export const fetchAddress = createAsyncThunk<
  FetchAddressResult,
  void,
  { rejectValue: string }
>(
  "user/fetchAddress",
  async (_, { rejectWithValue }) => {
    try {
      return await GeolocationService.fetchAddress();
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : "Failed to fetch address");
    }
  }
);


const initialState: UserState = {
  username: '',
  status: 'idle',
  position: null,
  address: '',
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state, _) => {
        state.status = 'loading'
    })
      .addCase(fetchAddress.fulfilled, (state,action ) => {
        state.status = 'idle';
        state.position = action.payload.position;
        state.address = action.payload.address;
    })
      .addCase(fetchAddress.rejected, (state,action) => {
        state.status = 'error';
        state.error = action.payload ?? 'Unknown error';
      })

  },
})

export const { updateName } = userSlice.actions;
export default userSlice.reducer;