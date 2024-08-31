import React, { Component } from "react";
import PropTypes from "prop-types";

const Tab = (props: any) => {
	const onClick = () => {
		const { label, onClick } = props;
		onClick(label);
	};

	let className = "crmls-tab";

	if (props.activeTab === props.label) {
		className += " active";
	}

	if (props.labelClassName) {
		className = `${className} ${props.labelClassName}`;
	}

	return (
		<li className={className} onClick={onClick}>
			{props.label}
		</li>
	);
};

export default Tab;
