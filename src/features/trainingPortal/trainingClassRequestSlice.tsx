import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {getMyTrainingClassRequests, isPendingAction, post, put, training_url} from "../../adapters";
import {ClassRequestEntity} from "./trainingTypes";

export const trainingClassRequestAdapter = createEntityAdapter<ClassRequestEntity>();
const initialState = trainingClassRequestAdapter.getInitialState({
    status: 'idle',
    error: '',
    entities: {}
});

export const fetchMyTrainingClassRequests = createAsyncThunk(
    'training/fetchMyTrainingClassRequests',
    async (id: string, thunkAPI) => {
        const response = await getMyTrainingClassRequests(id);
        return response.data.results;
    }
)

export const cancelTrainingClassRequest = createAsyncThunk(
    'training/cancelTrainingClassRequest',
    async (classObject: ClassRequestEntity, thunkAPI) => {
        let objectCopy = {...classObject};
        await post(`${training_url}api/app/ClassRequest/${classObject.id}/Cancel`, {})
            .then(() => {
                // Set object request status to 4 (cancelled)
                objectCopy.requestStatus = 4;
            })
            .catch((e) => e)

        return objectCopy;
    }
)

export const requestTrainingClass = createAsyncThunk(
    'training/requestTrainingClass',
    async (data: {requestedBy: string, topic: { id: string; name: string } | undefined, comments: string, dateTime: string}, thunkAPI) => {
        if (data.topic) {
            const payload = {
                requestedBy: data.requestedBy,
                trainingTopicId: data.topic.id,
                comments: data.comments,
                dateTime: data.dateTime
            };
            const response = await post(`${training_url}api/app/classRequest`, payload);
            const responseEntity = response.data.results[0];
            responseEntity.trainingTopic = data.topic;
            return responseEntity;
        }
    }
)

export const trainingClassRequestSlice = createSlice({
    name: 'trainingClassRequest',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyTrainingClassRequests.fulfilled, (state, action) => {
                state.status = 'idle';
                trainingClassRequestAdapter.setAll(state, action.payload);
            })
            .addCase(requestTrainingClass.fulfilled, (state, action) => {
                state.status = 'idle';
                trainingClassRequestAdapter.upsertOne(state, action.payload);
            })
            .addCase(cancelTrainingClassRequest.fulfilled, (state, action) => {
                state.status = 'idle';
                // the payload isn't as advertised, so we need to fake it
                trainingClassRequestAdapter.upsertOne(state, action.payload);
            })
            .addMatcher(isPendingAction, (state, action) => {
                state.status = 'loading';
            })
    }
})

export const {
    selectById: selectTrainingPortalEntityById,
    selectIds: selectTrainingClassRequestIds,
    selectEntities: selectTrainingClassRequestEntities,
    selectAll: selectAllTrainingClassRequests,
} = trainingClassRequestAdapter.getSelectors((state: RootState) => state.trainingClassRequests);

const { reducer } = trainingClassRequestSlice;
export default reducer;
