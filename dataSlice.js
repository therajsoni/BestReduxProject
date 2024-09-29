import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from './dataAPI';

export const loadData = createAsyncThunk('data/load', async () => {
  const response = await fetchData();
  return response.data;
});
const dataSlice = createSlice({
    name: 'data',
    initialState: {
      items: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(loadData.pending, (state) => {
          state.loading = true;
        })
        .addCase(loadData.fulfilled, (state, action) => {
          state.loading = false;
          state.items = action.payload;
        })
        .addCase(loadData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export default dataSlice.reducer;