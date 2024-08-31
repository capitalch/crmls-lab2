import { useState, useEffect, useCallback } from "react";
import ArticleCard from "../../components/widgets/cards/ArticleCard";
import { ArticleEntity, ArticleCategoryEntity } from "../dashboard/DashboardSlice";
import ErrorMessage from "../../components/widgets/ErrorMessage";
import { get, mace_url } from "../../adapters";
import ContentContainer from "../../components/content/ContentContainer";
import { useHistory } from "react-router-dom";
import { CardLoader } from "../../components/widgets/SkeletonScreens";
import { ChevronLeftIcon, SearchCircleIcon, SearchIcon, StarIcon } from "@heroicons/react/solid";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFavoriteArticles } from "../../features/user/selectors";
import axios from "axios";
import { debounce } from "lodash";
import { rebuildTooltips } from "../../components/settings/theme/ThemeTooltip";

const NewsArticles = () => {
	const history = useHistory();
	const [articleFilters, setArticleFilters] = useState({
		category: "",
		favorites: false,
		// add additional filters here
	});
	const favoriteArticles = useSelector(selectFavoriteArticles);
	const [articles, setArticles] = useState<ArticleEntity[]>([]);
	const [searchText, setSearchText] = useState("");
	const [articleQueryText, setArticleQueryText] = useState("");
	const [displayArticles, setDisplayArticles] = useState<ArticleEntity[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<any>();
	const [articleCategories, setArticleCategories] = useState<ArticleCategoryEntity[]>([]);
	const delayedQuery = useCallback(
		debounce((q: string) => setArticleQueryText(q), 1000),
		[]
	);
	const handle = useParams();

	useEffect(() => {
		getArticleCategories();
		checkCategoryParam();
	}, []);

	useEffect(() => {
		checkCategoryParam();
	}, [handle]);

	useEffect(() => {
		setIsLoading(true);
		const request = axios.CancelToken.source();

		const fetchArticles = async () => {
			try {
				const response = await axios.get(`${mace_url}api/app/Articles/Search?q=${articleQueryText}`, {
					cancelToken: request.token, // (*)
				});
				setArticles(response.data.results);
				setIsLoading(false);
				rebuildTooltips();
			} catch (err) {
				setIsLoading(false);
				console.error("There was a problem or request was cancelled.");
			}
		};
		fetchArticles();

		return () => request.cancel();
	}, [articleQueryText]);

	const checkCategoryParam = () => {
		const query = new URLSearchParams(window.location.search);
		const queryCategory = query.get("cat");

		// If category is in url params, set the filter default
		if (queryCategory) {
			const newFilters = { ...articleFilters };
			newFilters.category = queryCategory;
			setArticleFilters(newFilters);
		}
	};

	useEffect(() => {
		let tmpArticles = [...articles];

		// Filter results by any applied criteria
		if (articleFilters.category) {
			tmpArticles = tmpArticles.filter((article: ArticleEntity) => (article.articleCategoryId ? article.articleCategoryId === parseInt(articleFilters.category, 10) : ""));
		}
		if (articleFilters.favorites) {
			tmpArticles = tmpArticles.filter((article: ArticleEntity) => favoriteArticles.includes(article.id));
		}
		setDisplayArticles(tmpArticles);
	}, [articles, articleFilters, favoriteArticles]);

	const getArticleCategories = () => {
		get(`${mace_url}api/app/ArticlesCategory/`)
			.then((response) => {
				setArticleCategories(response.data.results);
			})
			.catch((e: Error) => setError(e));
	};

	const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if (event.target.value) {
			history.push("?cat=" + event.target.value);
		} else {
			history.push("articles");
		}
		const newFilters = { ...articleFilters };
		newFilters.category = event.target.value;
		setArticleFilters(newFilters);
	};

	const handleTextSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(event.target.value);
		delayedQuery(event.target.value);
	};

	const handleFavoritesSearch = () => {
		const newFilters = { ...articleFilters };
		newFilters.favorites = !articleFilters.favorites;
		setArticleFilters(newFilters);
	};

	if (error) {
		return <ErrorMessage message={error.message} />;
	}

	return (
		<ContentContainer title="Article Center" subTitle="" actions={null} cssClass="crmls-articles">
			<div className="fixed sticky inset-x-0 -top-1 lg:top-16 z-10 mx-auto max-w-full bg-primary shadow-sm">
				<button className="bg-header text-inverse text-xs font-medium py-2 px-4 pl-0 rounded relative xl:absolute top-4 sm:top-6 left-4 sm:left-6 mb-2 inline-flex items-center z-10" onClick={() => history.goBack()}>
					<ChevronLeftIcon className="h-6 w-6" /> Go Back
				</button>
				<div className="flex justify-center">
					<div className="flex items-center flex-col sm:flex-row gap-3 px-4 sm:px-6 py-6 pb-4 w-full lg:max-w-3xl">
						<div className="relative w-full lg:w-72">
							<input type="text" value={searchText} className="input-registered" onChange={handleTextSearch} placeholder="Search title, summary or content" />
							<div className="absolute top-2 right-3">
								<SearchIcon className="h-5 w-5 text-secondary" />
							</div>
						</div>
						<div className="relative w-full lg:w-72">
							<select id="article-category" name="article-category" className="input-registered-required w-full lg:w-72" onChange={handleCategoryChange} value={articleFilters.category ?? ""}>
								<option value="">Select Category</option>
								{articleCategories.map((cat) => (
									<option key={cat.id} value={cat.id}>
										{cat.name}
									</option>
								))}
							</select>
						</div>
						<div className="p-2 pr-3 bg-secondary flex justify-between items-center cursor-pointer rounded-md border border-default" onClick={() => handleFavoritesSearch()} data-tip="Filter by Favorites">
							<StarIcon className={`w-5 h-5 before:border-none after:border-none mr-1 ring-0 ${articleFilters.favorites ? "text-yellow-500" : "text-primary"}`} />
							<span>Favorites</span>
						</div>
					</div>
				</div>
			</div>
			{!isLoading ? (
				displayArticles.length <= 0 ? (
					<div className="flex justify-center mt-6">
						<div className="flex flex-col justify-center items-center">
							<SearchCircleIcon className="h-16 w-16 text-secondary" />
							<p className="text-lg text-secondary">{`No ${articleFilters.favorites ? "Favorite" : ""} Articles Found`}</p>
						</div>
					</div>
				) : (
					<div className="relative mt-6 mb-24 lg:mb-16 mx-auto px-6 grid gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
						{displayArticles.map((article) => (
							<ArticleCard article={article} key={article.id} />
						))}
					</div>
				)
			) : (
				<div className="relative mt-6 mb-24 lg:mb-16 mx-auto px-6 grid gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
					{[...Array(8)].map((i, v) => {
						return <CardLoader key={v} />;
					})}
				</div>
			)}
		</ContentContainer>
	);
};

export default NewsArticles;
