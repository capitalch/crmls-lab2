import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {emptyUserState, userCore} from './selectors';
import {getMemberData} from "../../adapters";

export const fetchMemberData = createAsyncThunk('user/fetchMemberData', async (user: userCore, thunkAPI) => {
    // do additional lookups here
    const response = await getMemberData();
    if (response.status < 200 || response.status > 299) {
        const message = `An error has occurred: ${response.statusText}`;
        throw new Error(message);
    }
    return response.data;
})

const initialState = {
    status: 'idle',
    profile: emptyUserState(),
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMemberData.fulfilled, (state, action) => {
                state.status = 'idle';
                state.profile = action.payload;
            })
            .addCase(fetchMemberData.pending, (state, action) => {
                state.status = 'loading';
            })
    }
});

export default userSlice.reducer;
