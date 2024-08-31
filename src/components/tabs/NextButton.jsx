import React, { useState, useEffect } from "react";
import { ArrowCircleRightIcon, ArrowCircleLeftIcon } from "@heroicons/react/outline";
import _ from "lodash";
import { useAppDispatch } from "../../app/hooks";
import { show } from "../../features/notification/notificationSlice";

const NextButton = ({ handleClick, currentStep, steps, isValid, validateForm, setTouched, isNew, isDirty, isSubmitting }) => {
	const [showSave, setShowSave] = useState(false);
	const [showNext, setShowNext] = useState(false);
	const [showPrev, setShowPrev] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	const dispatch = useAppDispatch();

	const doValidation = () => {
		validateForm().then((errors) => {
			if (!_.isEmpty(errors)) {
				let message = [];
				let touched = {};

				for (var e in errors) {
					if (errors.hasOwnProperty(e)) {
						message.push(errors[e]);
						touched[e] = true;
					}
				}

				dispatch(
					show({
						show: true,
						title: "There are problems with your form submission. Please check the values provided and re-submit.",
						message: message,
						status: "error",
						position: "popover",
						autoHide: 6000,
						confirm: false,
						notificationId: null,
					})
				);
				setTouched(touched, false);
			} else {
				handleClick("next");
			}
		});
	};

	useEffect(() => {
		setShowNext(true);
		setShowPrev(true);
		setShowConfirm(false);
		if (currentStep === steps.length) {
			if (!isNew) {
				if (isDirty) {
					setShowSave(true);
				} else {
					setShowSave(false);
				}
			} else {
				setShowSave(true);
			}
			setShowNext(false);
		} else {
			setShowSave(false);
		}

		if (currentStep === steps.length - 1) {
			setShowNext(false);
			setShowConfirm(true);
		} else {
			setShowConfirm(false);
		}

		if (currentStep === 1) {
			setShowPrev(false);
		}
	}, [currentStep, isNew, isDirty, isValid]);

	return (
		<div className="flex px-4 justify-end space-x-2">
			{showPrev && (
				<button
					type="button"
					className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-header hover:bg-opacity-80 focus:outline-none"
					onClick={(e) => {
						e.preventDefault();
						handleClick();
					}}
				>
					<ArrowCircleLeftIcon className="h-6 w-6 text-yellow-100 pr-2" aria-hidden="false" />
					Previous
				</button>
			)}
			{showNext && (
				<button
					type="button"
					className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-header hover:bg-opacity-80 focus:outline-none"
					onClick={(e) => {
						e.preventDefault();
						handleClick("next");
					}}
				>
					Next
					<ArrowCircleRightIcon className="h-6 w-6 text-yellow-100 pl-2" aria-hidden="false" />
				</button>
			)}
			{showConfirm && (
				<button
					type="button"
					className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none disabled:bg-tertiary disabled:pointer-events-none disabled:cursor-not-allowed"
					onClick={(e) => {
						e.preventDefault();
						doValidation();
					}}
				>
					Confirm
					<ArrowCircleRightIcon className="h-6 w-6 text-yellow-100 pl-2" aria-hidden="false" />
				</button>
			)}
			{showSave && (
				<button
					type="submit"
					className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none disabled:bg-tertiary disabled:pointer-events-none disabled:cursor-not-allowed"
<<<<<<< HEAD
					disabled={!isValid}
=======
					disabled={!isValid || isSubmitting}
>>>>>>> dev-1
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 pr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					Save
				</button>
			)}
		</div>
	);
};

export default NextButton;
