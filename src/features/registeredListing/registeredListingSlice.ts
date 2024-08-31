import {createSlice, PayloadAction, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';
import {
    base_url,
    crmlsPayload,
    getPaginatedRegisteredListings,
    getRegisteredListingById, getRegisteredListings, isPendingAction,
    isRejectedAction, post, put
} from "../../adapters";
import dayjs from "dayjs";
import {RootState} from "../../app/store";

export const registeredListingsAdapter = createEntityAdapter();

const initialState = registeredListingsAdapter.getInitialState({
    status: 'idle',
    error: '',
});

export const changeRegisteredListingStatus = createAsyncThunk(
    'registeredListing/changeRegisteredListingStatus',
    async ({listing, new_status}: {listing: any, new_status: string}, thunkAPI) => {
        if (listing) {
            let temp = {...listing};
            temp.standardStatus = new_status;
            try {
                const response = await put(base_url + `api/app/Registration/${listing.id}`, temp);
                return temp;
            } catch (err) {
                return thunkAPI.rejectWithValue(err.response.data);
            }
        }
    }
)

export const changeRegisteredListingCancellation = createAsyncThunk(
    'registeredListing/changeRegisteredListingExpiration',
    async ({listing, date}: {listing: any, date: Date}, thunkAPI) => {
        if (listing) {
            let temp = {...listing};
            temp.standardStatus = 'K'; // immediately cancel
            temp.cancellationDate = dayjs(date).toISOString();
            try {
                const response = await put(base_url + `api/app/Registration/${listing.id}`, temp);
                return temp;
            } catch (err) {
                return thunkAPI.rejectWithValue(err.response.data);
            }
        }
    }
)

export const fetchAllRegisteredListings = createAsyncThunk(
    'registeredListing/fetchAllRegisteredListings',
    async (id, thunkAPI) => {
        const response = await getRegisteredListings();
        return response.data.results;
    }
)

export const searchRegisteredListings = createAsyncThunk(
    'registeredListing/searchRegisteredListings',
    async (payload: any, thunkAPI) => {
        try {
            const response = await getPaginatedRegisteredListings(payload);
            return response.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const createRegisteredListing = createAsyncThunk(
    'registeredListing/createRegisteredListing',
    async (payload: any, thunkAPI) => {
        try {
            const response = await post(base_url + 'api/app/Registration', payload);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const promoteRegisteredListing = createAsyncThunk(
    'registeredListing/promoteRegisteredListing',
    async (id: string, thunkAPI) => {
        try {
            const response = await post(base_url + `api/app/Registration/promote/${id}`, {});
            return response.data.results[0];
        } catch (err) {
            return thunkAPI.rejectWithValue(null);
        }
    }
)

export const updateRegisteredListing = createAsyncThunk(
    'registeredListing/updateRegisteredListing',
    async (payload: any, thunkAPI) => {
        try {
            const response = await put(base_url + 'api/app/Registration/' + payload.id, payload);
            // our put service returns an empty array, so we can't upsert the results as we'd expect to
            return payload;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const fetchRegisteredListingById = createAsyncThunk(
    'registeredListing/fetchRegisteredListingById',
    async (id: string, thunkAPI) => {
        const response = await getRegisteredListingById(id);
        return response.data.results[0];
    }
)

export const registeredListingSlice = createSlice({
    name: 'registeredListing',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegisteredListingById.fulfilled, (state, action) => {
                state.status = 'idle';
                registeredListingsAdapter.upsertOne(state, action.payload);
            })
            .addCase(fetchAllRegisteredListings.fulfilled, (state, action: PayloadAction<crmlsPayload>) => {
                state.status = 'idle';
                registeredListingsAdapter.upsertMany(state, action.payload);
            })
            .addCase(searchRegisteredListings.fulfilled, (state, action) => {
                state.status = 'idle';
                registeredListingsAdapter.upsertMany(state, action.payload.results);
            })
            .addCase(promoteRegisteredListing.fulfilled, (state, action: PayloadAction<crmlsPayload>) => {
                state.status = 'idle';
                registeredListingsAdapter.upsertOne(state, action.payload);
            })
            .addCase(changeRegisteredListingStatus.fulfilled, (state, action) => {
                state.status = 'idle';
                registeredListingsAdapter.upsertOne(state, action.payload);
            })
            .addCase(changeRegisteredListingCancellation.fulfilled, (state, action) => {
                state.status = 'idle';
                registeredListingsAdapter.upsertOne(state, action.payload);
            })
            .addCase(createRegisteredListing.fulfilled, (state, action) => {
                state.status = 'idle';
                console.log('fulfilled fired')
                registeredListingsAdapter.addOne(state, action.payload);
            })
            .addCase(updateRegisteredListing.fulfilled, (state, action) => {
                state.status = 'idle';
                registeredListingsAdapter.upsertOne(state, action.payload);
            })
            // hopefully this will apply to any failed / pending request
            .addMatcher(isRejectedAction, (state, action) => {
                state.error = action.error.message;
                state.status = 'idle';
            })
            .addMatcher(isPendingAction, (state, action) => {
                state.status = 'loading';
            })
    }
});

export const {
    selectById: selectRegisteredListingById,
    selectIds: selectRegisteredListingIds,
    selectEntities: selectRegisteredListingEntities,
    selectAll: selectAllRegisteredListings,
    selectTotal: selectTotalRegisteredListings
} = registeredListingsAdapter.getSelectors((state: RootState) => state.registeredListing);
const { reducer } = registeredListingSlice;
export default reducer;
