type iconProps = {
	className: string;
};

const SyndicationIcon = ({ className }: iconProps) => {
	return (
		<svg viewBox="0 0 260 260" fill="currentColor" className={className}>
			<path
				className="cls-1"
				d="M230.51,242.51H29.49c-6.6,0-12-5.4-12-12V29.49c0-6.6,5.4-12,12-12H230.51c6.6,0,12,5.4,12,12V230.51c0,6.6-5.4,12-12,12Zm-91.65-51.2V61.12l35.39,30.5,10.9-12.99-55.16-47.34-55.15,47.34,11.45,12.99,35.56-30.34V191.32h17.01Zm-79.08-31.89h-22.51s.27,29.45-.13,49.82c-.23,11.72,5.07,19.52,16.33,19.47,51.07-.25,102.14-.3,153.2,.03,12.52,.08,16.34-5.55,16.34-17.34,0-20.08,.01-51.97,.01-51.97h-22.69s0,28.29,0,45.79H59.79c0-18.68,0-45.79,0-45.79Z"
			/>
		</svg>
	);
};

export default SyndicationIcon;
