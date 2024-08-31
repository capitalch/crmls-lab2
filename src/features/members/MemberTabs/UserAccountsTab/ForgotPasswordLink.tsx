import React from "react";
import { Link } from "react-router-dom";
import { getForgotPasswordUri } from "../../../../util/helpers";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ForgotPasswordLink = ({ loginId }: { loginId: string }) => {
	const forgotPasswordRoot = getForgotPasswordUri();
	const forgotPasswordUri = `https://${forgotPasswordRoot}/forgot-password?loginId=${loginId}`;
	return (
		<a href={forgotPasswordUri}>
			<FontAwesomeIcon
				icon={faEdit}
				size={"1x"}
				style={{ color: "blue" }}
				// className="cursor-pointer text"
				// className="password-change-icon"
			/>
		</a>
	);
};

export default ForgotPasswordLink;
