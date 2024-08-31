import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { profile_url } from "../../adapters";
import axios from "axios";
import _ from 'lodash'

const initialState = {

}

const defaultPayload = {
    pageId: 0,
    pageSize: 1000
}

export const fetchSelectData = createAsyncThunk('basicSelect/fetchSelectData', async (args: FetchDataArgsType, thunkApi: any): Promise<FetchDataReturnType> => {
    try {
        const name: string = args.name
        const resource: string = args.resource
        const payload: any = defaultPayload
        const apiUrl = `${profile_url}api/app/${resource}/q`
        const res = await axios.post(apiUrl, payload)
        return ({
            name: name,
            data: res?.data
        })
    } catch (err: any) {
        return thunkApi.rejectWithValue(err.response.data);
    }
})

export const basicSelectSlice = createSlice({
    name: 'basicSelect',
    initialState: initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchSelectData.pending, (state: any, action: any) => {
                const name = action?.meta?.arg?.name;
                if (_.isEmpty(state?.[name])) {
                    state[name] = {}
                }
                state[name].isLoading = true;
            })

            .addCase(fetchSelectData.fulfilled, (state: any, action: any) => {
                const responseData: any = action.payload.data
                const name = action.payload.name
                if (_.isEmpty(state[name])) {
                    state[name] = {};
                }
                state[name].isLoading = false;
                state[name].contents = responseData.results;
            })

            .addCase(fetchSelectData.rejected, (state: any, action: any) => {
                const name = action?.meta?.arg?.name;
                if (_.isEmpty(state[name])) {
                    state[name] = {};
                }
                state[name].isLoading = false;
                state[name].error = action.error;
            })
    }
})

const { reducer } = basicSelectSlice;

export { reducer as BasicSelectReducer }

type FetchDataArgsType = {
    resource: string
    name: string
}

type FetchDataReturnType = {
    name: string
    data: any
}

