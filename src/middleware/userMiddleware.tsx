import { SILENT_RENEW_ERROR, USER_EXPIRED, USER_EXPIRING, USER_FOUND, USER_SIGNED_OUT } from "redux-oidc";
import { fetchMemberData } from "../features/user/userSlice";
import { userCore } from "../features/user/selectors";
import { Middleware } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import axios from "axios";

export const userMiddleware: Middleware = (store) => (next) => (action) => {
	if (action.type === USER_FOUND) {
		let user = action.payload;
		if (user) {
			// console.log('USER MIDDLEWARE --->', JSON.stringify(user))
			let userCore: userCore = {
				profile: user.profile,
				token: user.access_token,
			};
			axios.defaults.headers.common["Authorization"] = "Bearer " + user.access_token;
			store.dispatch<any>(fetchMemberData(userCore));
		}
	} else if (action.type === SILENT_RENEW_ERROR || action.type === USER_EXPIRING || action.type === USER_EXPIRED || action.type === USER_SIGNED_OUT) {
		console.log(action.type);
		console.log(action.payload);
		console.log(dayjs().format("dddd, MMMM D, YYYY h:mm A"));
	}

	return next(action);
};
