import { ArticleEntity } from "../../../features/dashboard/DashboardSlice";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { DocumentTextIcon, UserIcon, EyeIcon } from "@heroicons/react/outline";
import { setUserPrefs } from "../../../features/user/userPrefsSlice";
import { useAppDispatch } from "../../../app/hooks";
import { useSelector } from "react-redux";
import { selectReadArticles, selectFavoriteArticles } from "../../../features/user/selectors";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/solid";

const ArticleCard = ({ article, className, showOverlay, callback, imageClass }: { article: ArticleEntity; className?: string; showOverlay?: boolean; callback?: () => void; imageClass?: string }) => {
	const dispatch = useAppDispatch();
	const readArticles = useSelector(selectReadArticles);
	const favoriteArticles = useSelector(selectFavoriteArticles);
	const [hasBeenRead, setHasBeenRead] = useState(false);
	const articleImageClass = imageClass ?? 'h-36';

	const markAsUnRead = () => {
		const newReadArticles = readArticles.filter((id: string | number) => id !== article.id);
		dispatch(
			setUserPrefs({
				key: "articles.read",
				value: newReadArticles,
			})
		);
	};

	const toggleFavorite = (article: ArticleEntity) => {
		let newFavorites;
		if (favoriteArticles.includes(article.id)) {
			newFavorites = [...favoriteArticles].filter((fav) => fav !== article.id);
		} else {
			newFavorites = [...favoriteArticles, article.id];
		}
		dispatch(
			setUserPrefs({
				key: "articles.favorites",
				value: newFavorites,
			})
		);
	};

	useEffect(() => {
		setHasBeenRead(readArticles.includes(article.id));
	}, [readArticles]);

	return (
		<div className={className ?? "flex flex-col rounded-lg shadow-lg overflow-hidden relative"} onClick={callback}>
			{showOverlay && <div className="absolute top-0 left-0 w-full h-full z-10"></div>}
			<Link to={`/article/${article.id}`}>
				{article.imageUrl && (
					<div className="flex-shrink-0">
						<img className={`${articleImageClass} w-full object-cover`} src={article.imageUrl} alt={article.title ?? "Article Image"} style={{ objectFit: "cover" }} />
					</div>
				)}
				{!article.imageUrl && (
					<div className={`${articleImageClass} flex flex-shrink-0 bg-tertiary justify-center items-center`}>
						<DocumentTextIcon className="w-8 h-8 text-secondary" />
					</div>
				)}
			</Link>
			<div className="relative flex-1 bg-secondary p-4 flex flex-col justify-between">
				<div className="flex justify-between">
					{article.articleCategory && (
						<p className="text-sm font-medium text-tertiary">
							<Link to={`/articles?cat=${article.articleCategory.id}`} className="hover:underline">
								{article.articleCategory.name}
							</Link>
						</p>
					)}
					<div className="action-icons flex">
						{hasBeenRead && <EyeIcon className="w-5 h-5 text-secondary text-opacity-50 cursor-pointer mx-1" onClick={markAsUnRead} />}
						<StarIcon className={`w-5 h-5 cursor-pointer mx-1 ${favoriteArticles.includes(article.id) ? "text-yellow-500" : "text-primary"}`} onClick={() => toggleFavorite(article)} />
					</div>
				</div>
				<div className="flex-1">
					{article.title && (
						<Link to={`/article/${article.id}`} className="block">
							<p className="text-lg font-semibold text-header truncate" title={article.title}>{article.title}</p>
						</Link>
					)}
					{article.summary && <p className="mt-2 text-sm text-secondary line-clamp-3">{article.summary}</p>}
				</div>
				<div className="flex justify-between items-center mt-3">
					<div className="relative flex items-center">
						{article.author && article.authorPhotoUrl && (
							<div className="flex-shrink-0">
								<img className="h-10 w-10 rounded-full" src={article.authorPhotoUrl} alt={article.author.displayName ?? "Author Image"} />
							</div>
						)}
						{!article.authorPhotoUrl && (
							<div className="bg-primary rounded-full p-2">
								<UserIcon className="h-4 w-4 text-header" />
							</div>
						)}
						<div className="ml-3 text-xs">
							{article.byline && <p className="font-medium text-primary">{article.byline}</p>}
							{article.publishOn && (
								<p className="text-secondary">
									<time dateTime={article.publishOn}>{dayjs(article.publishOn).format("MMM D, YYYY")}</time>
								</p>
							)}
						</div>
					</div>
					<Link to={`/article/${article.id}`} className="">
						<button type="button" className="px-3 py-2 border border-default shadow-sm text-sm leading-4 font-medium rounded-md text-inverse bg-header">
							More..
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ArticleCard;
