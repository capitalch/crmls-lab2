import { useEffect, useState, useRef } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState<{ width: number | undefined; height: number | undefined }>({
		width: undefined,
		height: undefined,
	});

	useEffect(() => {
		// Handler to call on window resize
		function handleResize() {
			// Set window width/height to state
			setWindowSize({
				width: window?.innerWidth ?? "",
				height: window.innerHeight,
			});
		}
		// Add event listener
		window.addEventListener("resize", handleResize);
		// Call handler right away so state gets updated with initial window size
		handleResize();
		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, []); // Empty array ensures that effect is only run on mount
	return windowSize;
};

export const useAutoFocus = () => {
	const inputRef = useRef<any>(null);

	useEffect(() => {
		const autoFocusTimeout = setTimeout(() => {
			if (inputRef.current) {
				inputRef.current.focus();
			}
			clearTimeout(autoFocusTimeout);
		}, 1000);
	}, []);

	return inputRef;
};
