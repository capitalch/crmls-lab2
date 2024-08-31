<<<<<<< HEAD
import React, { Component } from "react";
import PropTypes from "prop-types";

=======
>>>>>>> dev-1
const Tab = (props: any) => {
	const onClick = () => {
		const { label, onClick } = props;
		onClick(label);
	};

	let className = "crmls-tab";

	if (props.activeTab === props.label) {
		className += " active";
	}

<<<<<<< HEAD
	if (props.labelClassName) {
		className = `${className} ${props.labelClassName}`;
	}

	return (
		<li className={className} onClick={onClick}>
=======
	return (
		<li className={className} onClick={onClick}>
			{props.badge ? props.badge.badge : ""}
>>>>>>> dev-1
			{props.label}
		</li>
	);
};

export default Tab;
