import React, { ReactElement, useState } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import "./SlidingPane.css";
const useSlidePane = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [paneTitle, setPaneTitle] = useState("");

	const handlePanelOpen = (paneTitle: string) => {
		setIsOpen(true);
		setPaneTitle(paneTitle);
	};

	const handlePanelClose = () => {
		setIsOpen(false);
	};

	const SlidePane = ({ children }: { children?: ReactElement<any, any> }) => {
		return (
			<div>
				<SlidingPane
					isOpen={isOpen}
					title={paneTitle}
					onRequestClose={handlePanelClose}
				>
					{children}
				</SlidingPane>
			</div>
		);
	};

	return { SlidePane, handlePanelOpen, handlePanelClose };
};

export default useSlidePane;
