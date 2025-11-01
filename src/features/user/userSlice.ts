import {
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from "@reduxjs/toolkit";
import {getAddress} from "../../services/apiGeocoding.ts";
import type {FetchAddressResult, UserState} from "./storeTypes.ts";

export function getPosition(): Promise<GeolocationPosition> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export const fetchAddress = createAsyncThunk<
  FetchAddressResult,      //тип данных, возвращаемых из thunk
  void,                    //аргументы (в нашем случае — ничего)
  { rejectValue: string }
>(
  'user/fetchAddress',
  async (_, { rejectWithValue }) => {
    try {
      const positionObj = await getPosition();
      const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
      };
      const addressObj = await getAddress(position);
      const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
      return { position, address };
    } catch (err) {
      return rejectWithValue('Failed to fetch address');
    }
  }
  )


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