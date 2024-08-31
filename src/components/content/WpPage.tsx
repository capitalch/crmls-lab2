import axios from "axios";
import { useEffect, useState } from "react";

function WpPage({ url, password }: { url: string; password: string }) {
	const [renderedContent, setRenderedContent] = useState<any>();

	useEffect(() => {
		let firstRender = true;
		let wpUrl = url;
		if (password) {
			wpUrl = `${url}?password=${password}`;
		}

		if (firstRender && url) {
			axios.get(wpUrl).then((response) => {
				setRenderedContent(response.data.content.rendered);
			});
		}
		return () => {
			firstRender = false;
		};
	}, []);

	return <div dangerouslySetInnerHTML={{ __html: renderedContent }}></div>;
}

export default WpPage;
