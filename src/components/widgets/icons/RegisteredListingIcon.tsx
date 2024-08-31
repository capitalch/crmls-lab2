import React from "react";

type iconProps = {
	className: string;
};

const RegisteredListingIcon = ({ className }: iconProps) => {
	return (
		<svg viewBox="0 0 260 260" fill="currentColor" className={className}>
			<path className="cls-1" d="M33.94,200.15V7.72H176.78v122H108.54v70.44H33.94Z" />
			<path className="cls-1" d="M207.33,230.77V60.43h22.75V252.86H87.24v-22.09h120.09Z" />
			<path className="cls-1" d="M202.45,33.57V226.01H59.57c0-39.55,0,21.09,0-21.25h56.34l66.13-68.21V33.57c26.06,0-4.35,0,20.4,0Z" />
			<polygon className="cls-1" points="113.57 134.66 176.86 134.64 113.57 200.05 113.57 134.66" />
			<path className="cls-1" d="M183.94,207.87H116.02c21.04-21.58,45.59-46.76,67.92-69.65v69.65Z" />
		</svg>
	);
};

export default RegisteredListingIcon;
