import React from "react";
import { connect } from "react-redux";
import { CallbackComponent } from "redux-oidc";
import { push } from "connected-react-router";
import userManager from "../util/userManager";
import {useAppDispatch} from "../app/hooks";
import {AppDispatch, RootState} from "../app/store";

const CallbackPage = () => {
    const dispatch = useAppDispatch();

    // just redirect to '/' in both cases
    return (
        <CallbackComponent
            userManager={userManager}
            successCallback={(user:any) => {
                dispatch(push("/"))
            }}
            errorCallback={error => {
                dispatch(push("/login"));
                console.error(error);
            }}
        >
            <div>Redirecting...</div>
        </CallbackComponent>
    );
}

function mapStateToProps(state: RootState) {
    return {
        user: state.oidc.user
    };
}

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CallbackPage);