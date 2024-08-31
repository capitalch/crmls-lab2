type iconProps = {
	className: string;
};

const RegisteredListingIcon = ({ className }: iconProps) => {
	return (
		<svg viewBox="0 0 260 260" fill="currentColor" className={className}>
			<path
				className="cls-1"
				d="M103.21,178.74V103.22c14.45,0,28.26,.18,42.06-.05,16.74-.27,27.74-10.49,27.3-24.95-.42-13.95-11.1-23.31-27.37-23.51-17.46-.21-34.92-.05-51.2-.05,8.53-13.87,7.8-22.97,.11-37.91h52.18l9.86-10.57,9.18,10.7,74.6-.21q13.66,.08,13.92,13.8l-.26,134.75q0,13.53-8.29,13.52c-47.07-.06-94.14,0-142.1,0Z"
			/>
			<path
				className="cls-1"
				d="M26.99,104.87c0,6.32,0,12.63,0,18.95-.02,14.37,.75,28.82-.54,43.08-.38,4.17-1.9,11.85-10.14,11.69-7.8,.16-10.16-6.62-10.26-10.08-.8-26.02-1.54-52.17,.5-78.06,.6-7.65,8.84-16.54,15.94-21.43,11.22-7.72,17.52-4.58,23.81,7.95,3.93,7.83,7.92,15.64,13.09,25.83,5.86-11.41,9.91-20.8,15.39-29.26,2.39-3.68,7.65-7.56,11.76-7.73,19.73-.8,39.51-.33,59.27-.36,8.85-.01,15.41,3.71,15.7,12.91,.31,10-6.43,14.06-15.88,14.06-17.43,0-34.86,0-53.88,0,0,9.8,0,18.64,0,27.48,0,38.63-.03,77.26,.02,115.89,.01,9.24-1.39,18.21-12.87,18.16-11.66-.05-14.22-7.01-14.15-17.07,.13-19.63,.08-41.83,.08-61.45l-5.46-.07s-.03,44.02,0,61.54c.02,9.88-3.74,17.28-14.47,17.09-10.56-.19-12.54-8.27-12.53-17.17,.04-39.08,.02-78.16,.01-117.24,0-4.83,0-9.66,0-14.48-1.8-.07-3.6-.15-5.4-.22Z"
			/>
			<path className="cls-1" d="M59.46,6.18c14.35,.05,26.47,11.96,26.78,26.31,.32,14.85-12.13,27.51-26.99,27.45-14.87-.06-27.2-12.81-26.76-27.67,.42-14.35,12.62-26.15,26.98-26.1Z" />
			<polygon className="cls-1" points="119.4 241.04 131.18 241.04 151.48 190.52 141.87 190.52 119.4 241.04" />
			<polygon className="cls-1" points="193.98 241.04 182.2 241.04 161.89 190.52 171.51 190.52 193.98 241.04" />
		</svg>
	);
};

export default RegisteredListingIcon;
