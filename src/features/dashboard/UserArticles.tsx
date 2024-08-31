import { useState, useEffect } from "react";
import { ArticleEntity } from "./DashboardSlice";
import ErrorMessage from "../../components/widgets/ErrorMessage";
import { get, mace_url } from "../../adapters";
import { CarouselLoader } from "../../components/widgets/SkeletonScreens";
import ArticleCarousel from "../news/ArticleCarousel";
import { SearchCircleIcon, DocumentTextIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

export const UserArticles = () => {
	const [articles, setArticles] = useState<ArticleEntity[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<any>();

	useEffect(() => {
		setIsLoading(true);
		getArticles();
	}, []);

	const getArticles = () => {
		get(`${mace_url}api/app/Articles/promoted`)
			.then((response) => {
				setArticles(response.data.results);
			})
			.then(() => {
				setIsLoading(false);
			})
			.catch((e: Error) => setError(e));
	};

	if (error) {
		return <ErrorMessage message={error.message} />;
	}

	return (
		<>
			<div className="absolute top-4 right-4 flex items-end align-center">
				<Link to={`/articles`} data-place="left" data-tip="Manage Articles">
					<DocumentTextIcon className="h-5 w-5 text-primary hover:opacity-80 cursor-pointer focus:outline-none focus:ring-0" />
				</Link>
			</div>
			{isLoading && (
				<div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
					<CarouselLoader />
				</div>
			)}
			{!isLoading && articles.length > 0 && (
				<div className="py-8 sm:py-0">
					<ArticleCarousel cards={articles} offset={5} showArrows={false} showControls={true} />
				</div>
			)}
			{!isLoading && articles.length <= 0 && (
				<div className="flex justify-center h-24">
					<div className="flex flex-col justify-center items-center">
						<SearchCircleIcon className="h-8 w-8 text-secondary text-opacity-20" />
						<p className="text-sm text-secondary text-opacity-50">No Articles Found</p>
					</div>
				</div>
			)}
		</>
	);
};
