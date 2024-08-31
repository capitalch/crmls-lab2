import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { isRejectedAction } from "../../adapters";

export interface SliderState {
	showSlider: boolean;
	view: string;
}

const initialState: SliderState = {
	showSlider: false,
	view: "",
};

export const sideSliderSlice = createSlice({
	name: "sideSlider",
	initialState,
	reducers: {
		showSliderView: (state, action: PayloadAction<SliderState>) => {
			state.showSlider = true;
			state.view = action.payload.view;
		},
		showSlider: (state) => {
			state.showSlider = true;
		},
		hideSlider: (state) => {
			state.showSlider = false;
		},
		toggleSlider: (state) => {
			state.showSlider = !state.showSlider;
		},
	},
	extraReducers: (builder) => {
		builder
			// hopefully this will apply to any failed request
			.addMatcher(isRejectedAction, (state, action) => {
				state.showSlider = false;
			});
	},
});

const { actions, reducer } = sideSliderSlice;
export const { showSliderView, showSlider, hideSlider, toggleSlider } = actions;
export const selectSlider = (state: RootState) => state.sideSlider;
export default reducer;
