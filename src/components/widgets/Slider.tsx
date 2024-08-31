import React, { useState, useEffect, useRef } from "react";
import { ArrowSmRightIcon, ArrowSmLeftIcon } from "@heroicons/react/outline";

let count = 0;
let slideInterval: any;
export default function Slider({ contentSections, wrapperClassName, changeDelay = 10000 }: { contentSections: any[]; wrapperClassName: string; changeDelay: number | null }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const slideRef = useRef<any>();

	const removeAnimation = () => {
		slideRef.current.classList.remove("fade-anim");
	};

	useEffect(() => {
		slideRef.current.addEventListener("animationend", removeAnimation);
		slideRef.current.addEventListener("mouseenter", pauseSlider);
		slideRef.current.addEventListener("mouseleave", startSlider);

		startSlider();
		return () => {
			pauseSlider();
		};
		// eslint-disable-next-line
	}, []);

	const startSlider = () => {
		if (changeDelay && contentSections.length > 1) {
			slideInterval = setInterval(() => {
				handleOnNextClick();
			}, changeDelay);
		}
	};

	const pauseSlider = () => {
		clearInterval(slideInterval);
	};

	const handleOnNextClick = () => {
		count = (count + 1) % contentSections.length;
		setCurrentIndex(count);
		slideRef.current.classList.add("fade-anim");
	};
	const handleOnPrevClick = () => {
		const contentLength = contentSections.length;
		count = (currentIndex + contentLength - 1) % contentLength;
		setCurrentIndex(count);
		slideRef.current.classList.add("fade-anim");
	};

	return (
		<div ref={slideRef} className="w-full select-none relative">
			<div className={wrapperClassName}>
				{contentSections && contentSections[currentIndex]}
				<button className={`absolute top-1/2 transform -translate-y-1/2 left-3 bg-crmls-blue text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition ${currentIndex === 0 ? "opacity-0" : ""}`} onClick={handleOnPrevClick}>
					<ArrowSmLeftIcon className="h-6 w-6" />
				</button>
				<button className={`absolute top-1/2 transform -translate-y-1/2 right-3 bg-crmls-blue text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition ${currentIndex >= contentSections.length - 1 ? "opacity-0" : ""}`} onClick={handleOnNextClick}>
					<ArrowSmRightIcon className="h-6 w-6" />
				</button>
			</div>
		</div>
	);
}
