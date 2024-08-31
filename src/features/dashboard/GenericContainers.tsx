import { useEffect, useState } from "react";
import { CardLoader } from "../../components/widgets/SkeletonScreens";
import ErrorMessage from "../../components/widgets/ErrorMessage";
import { getGenericContainers } from "../../adapters";

export const GenericContainers = () => {
	const [containers, setContainers] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<any>();

	useEffect(() => {
		getGenericContainers()
			.then((response) => {
				setContainers(response.data.results);
			})
			.then(() => {
				setIsLoading(false);
			})
			.catch((e: Error) => setError(e));
	}, []);

	if (error) {
		return <ErrorMessage message={error.message} />;
	}

	return (
		<>
			<div>
				{isLoading && (
					<div className="relative mt-12 mx-auto max-w-md px-4 grid gap-8 sm:max-w-3xl sm:px-6 md:grid-cols-2 lg:px-8 lg:grid-cols-3 lg:max-w-7xl xl:grid-cols-4">
						{[...Array(4)].map((i, v) => {
							return <CardLoader key={v} />;
						})}
					</div>
				)}
				{!isLoading && containers.length > 0 && (
					<div className="relative mx-auto px-4 sm:px-6 lg:px-12 lg:pr-20 max-w-md sm:max-w-3xl lg:max-w-full mt-8 sm:mt-0">
						<div className="block sm:flex sm:gap-4">
							{containers.map((container) => (
								<div key={container.id} className="bg-primary text-primary border border-default shadow overflow-hidden rounded-lg sm:w-full mb-6 sm:mb-0">
									<div className="px-3 py-2 sm:px-4 bg-secondary text-secondary text-center">
										<h3 className="text-lg leading-6 font-medium">{container.name}</h3>
									</div>
									<div className="border-t border-default p-4">
										<div dangerouslySetInnerHTML={{ __html: container.content }} />
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</>
	);
};
