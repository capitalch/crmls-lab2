import {createAsyncThunk} from '@reduxjs/toolkit';
import {
    fetchAllMembershipData,
    getPaginatedMembershipResource,
    updateMembershipResourse
} from "../../adapters";


export const searchStateAssosciations = createAsyncThunk(
    'aors/searchStateAssosciations',
    async (payload: any, thunkAPI) => {
        try {
            const response = await getPaginatedMembershipResource("aors",payload);
            return response.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)
export const searchAors = createAsyncThunk(
    'aors/searchAors',
    async (payload: any, thunkAPI) => {
        try {
            const response = await getPaginatedMembershipResource("aors", payload);
            return response.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const updateAor = createAsyncThunk(
    'aors/updateAor',
    async (payload: any, thunkAPI) => {
        try {
            const response = await updateMembershipResourse("aors",payload);
            return response.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const fetchPrimaryContactData = createAsyncThunk(
    'aors/fetchPrimaryContactData',
    async (payload: {resource:string, criteria:any}, thunkAPI) => {
        try {
            const response = await fetchAllMembershipData(payload);
            return response;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)

export const fetchStateAssociationtData = createAsyncThunk(
    'aors/fetchStateAssociationtData',
    async (payload: {resource:string, criteria:any}, thunkAPI) => {
        try {
            const response = await fetchAllMembershipData(payload);
            return response;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)