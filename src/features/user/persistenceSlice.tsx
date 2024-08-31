import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import * as dot from "dot-object";
import {RootState, store} from "../../app/store";

const storageName = 'MH_persist';

export type Selector<S> = (state: RootState) => S;

export type prefPayload = {
    key: string, // this should be in dot notation for the whole nested structure, eg. training.tabs.active, training.calendar.view, etc
    value: any, // this can be another object, array, etc.
}

export type persistenceCategories = {
    dashboard: any;
    generalSettings: any;
    productSettings: any;
    registeredListings: any;
    training: any;
    // add additional sections as we go
}

export type persistencePrefs = {
    sessionPrefs: persistenceCategories,
}

// Define the initial state
const initialState: persistencePrefs = {
    sessionPrefs: {
        dashboard: null,
        generalSettings: null,
        productSettings: null,
        registeredListings: null,
        training: null,
    },
}

export const fetchSessionPersistence = createAsyncThunk(
    'persistence/fetchSessionPersistence',
    async () => {
        // do request to session service here
        let retrievedPrefs = sessionStorage.getItem(storageName);

        if (retrievedPrefs && retrievedPrefs !== '') {
            return JSON.parse(retrievedPrefs);
        }
    }
)

export const persistenceSlice = createSlice({
    name: 'persistence',
    initialState,
    reducers: {
        setSessionPref: (state, action: PayloadAction<prefPayload>) => {
            let currentState = {...state.sessionPrefs};
            // unset the current path or dot-object pukes
            dot.delete(action.payload.key, currentState);
            dot.str(action.payload.key, action.payload.value, currentState);
            // write back to storage
            sessionStorage.setItem(storageName, JSON.stringify(currentState));
            state.sessionPrefs = currentState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSessionPersistence.fulfilled, (state, action) => {
                state.sessionPrefs = action.payload;
            })
    }
})

export const selectPersistenceByPath = (path: string): any => {
    let state: RootState = store.getState();

    if (dot.pick(path, state.persistence.sessionPrefs)) {
        return dot.pick(path, state.persistence.sessionPrefs);
    }

    return undefined;
}

export const { setSessionPref } = persistenceSlice.actions;
const { reducer } = persistenceSlice;
export default reducer;
