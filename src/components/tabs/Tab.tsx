const Tab = (props: any) => {
	const onClick = () => {
		const { label, onClick } = props;
		onClick(label);
	};

	let className = "crmls-tab";

	if (props.activeTab === props.label) {
		className += " active";
	}

	return (
		<li className={className} onClick={onClick}>
			{props.badge ? props.badge.badge : ""}
			{props.label}
		</li>
	);
};

export default Tab;
