const ClassifiedAssets = ({ url, password, image, isBroker }: { url: string; password: string; image: string; isBroker: boolean }) => {
	return (
		<div className="bg-primary text-primary">
			<div className="relative isolate px-6 pt-4 lg:px-8">
				<div className="mx-auto max-w-2xl">
					<div className="text-center">
						<h1 className="text-2xl font-bold tracking-tight sm:text-4xl">{`${isBroker ? "Broker" : "AOR"} Confidential Documents`}</h1>
						<p className="mt-6">
							Please click {image ? "the image" : "the button"} below to access your confidential documents. You will be prompted to enter the following password: <span className="text-header font-bold">{password}</span>
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							{image ? (
								<a href={url} rel="noreferrer" target="_blank">
									<img src={image} alt="Confidential Documents" />
								</a>
							) : (
								<a href={url} className="action-button bg-header hover:bg-opacity-80 cursor-pointer" rel="noreferrer" target="_blank">
									Click here to access your confidential documents
								</a>
							)}
						</div>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<p>
								To access the {isBroker ? "broker" : "association"} support page,	<a href={isBroker ? process.env.REACT_APP_CONFIDENTIAL_DOCS_BROKER_INFO_URL : process.env.REACT_APP_CONFIDENTIAL_DOCS_AOR_INFO_URL} target="_blank" rel="noreferrer" className="text-tertiary">please click here</a>.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ClassifiedAssets;
