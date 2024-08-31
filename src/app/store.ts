<<<<<<< HEAD
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import createRootReducer from './reducers'
import { userMiddleware } from '../middleware/userMiddleware'
import { useDispatch } from 'react-redux'

export const history = createBrowserHistory()

export const store = configureStore({
  reducer: createRootReducer(history),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // this is to eliminate a problem with warnings: https://github.com/maxmantz/redux-oidc/issues/169
        ignoredActions: ['redux-oidc/USER_FOUND'],
        ignoredPaths: ['oidc.user']
      }
    }).concat(routerMiddleware(history), userMiddleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
=======
import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";
import createRootReducer from "./reducers";
import {userMiddleware} from "../middleware/userMiddleware";

export const history = createBrowserHistory({ basename: "/" });

export const store = configureStore({
  reducer: createRootReducer(history),
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // this is to eliminate a problem with warnings: https://github.com/maxmantz/redux-oidc/issues/169
          ignoredActions: ['redux-oidc/USER_FOUND'],
          ignoredPaths: ['oidc.user']
        }
      })
          .concat(routerMiddleware(history), userMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
>>>>>>> dev-1
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
<<<<<<< HEAD
>

export function getToken () {
  let state = store.getState()
  if (state.oidc && state.oidc.user) {
    return state.oidc.user.access_token
  }

  return null
}

export const useAppDispatch: () => AppDispatch = useDispatch
=======
>;

export function getToken() {
  let state = store.getState();
  if (state.oidc && state.oidc.user) {
    return state.oidc.user.access_token;
  }

  return null;
}
>>>>>>> dev-1
