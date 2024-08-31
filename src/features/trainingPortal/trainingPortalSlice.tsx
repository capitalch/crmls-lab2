import {createAsyncThunk, createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {getMyTrainingClasses, isPendingAction, isRejectedAction, post, put, training_url} from "../../adapters";
import {AttendeeEntity} from "./trainingTypes";

export const trainingPortalAdapter = createEntityAdapter<AttendeeEntity>();
const initialState = trainingPortalAdapter.getInitialState({
    status: 'idle',
    error: '',
    entities: {}
});

export const fetchMyTrainingClasses = createAsyncThunk(
    'training/fetchMyTrainingClasses',
    async (id: string, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {
        const response = await getMyTrainingClasses(id)
            .then((response) => {
                console.log(response)
                return response
            })
        return response.data.results;
    }
)

export const registerForTrainingClass = createAsyncThunk(
    'training/registerForTrainingClass',
    async (data: {memberId: string, classId: string}, thunkAPI) => {
        const {memberId, classId} = data;
        const response = await post(`${training_url}api/app/attendee/register`, {
            memberId: memberId,
            trainingClassId: classId,
        });
        if (response.data.results) {
            return response.data.results[0];
        } else {
            return response.data;
        }
    }
)

export const unRegisterFromTrainingClass = createAsyncThunk(
    'training/unRegisterFromTrainingClass',
    async (id: string, thunkAPI) => {
        const response = await put(`${training_url}api/app/attendee/unregister?id=${id}`, {});
        return response.data.results[0];
    }
)

export const trainingPortalSlice = createSlice({
    name: 'trainingPortal',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyTrainingClasses.fulfilled, (state, action) => {
                console.log(action)
                state.status = 'idle';
                trainingPortalAdapter.setAll(state, action.payload);
            })
            .addCase(registerForTrainingClass.fulfilled, (state, action) => {
                state.status = 'idle';
                // the payload isn't as advertised, so we need to fake it
                trainingPortalAdapter.upsertOne(state, action.payload);
            })
            .addCase(unRegisterFromTrainingClass.fulfilled, (state, action) => {
                state.status = 'idle';
                // the payload isn't as advertised, so we need to fake it
                trainingPortalAdapter.removeOne(state, action.payload.id);
            })
            .addMatcher(isPendingAction, (state, action) => {
                state.status = 'loading';
            })
            .addMatcher(isRejectedAction, (state, action) => {
                state.status = 'idle';
                state.error = 'Something done messed up';
                console.log(action);
            })
    }
})

export const {
    selectById: selectTrainingPortalEntityById,
    selectIds: selectTrainingPortalIds,
    selectEntities: selectTrainingPortalEntities,
    selectAll: selectAllTraining,
} = trainingPortalAdapter.getSelectors((state: RootState) => state.trainingPortal);

export const selectRegistrationByClassId= (id: string) => createSelector(
    selectAllTraining,
    (classes) => classes.find((c) => c.trainingClassId === id)
);

const { reducer } = trainingPortalSlice;
export default reducer;
