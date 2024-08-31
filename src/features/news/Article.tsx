import ContentContainer from "../../components/content/ContentContainer";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { ArticleEntity } from "../dashboard/DashboardSlice";
import ErrorMessage from "../../components/widgets/ErrorMessage";
import { get, mace_url } from "../../adapters";
import dayjs from "dayjs";
import { ArticleLoader } from "../../components/widgets/SkeletonScreens";
import { Link, useHistory } from "react-router-dom";
import { ChevronLeftIcon, StarIcon, UserIcon } from "@heroicons/react/solid";
import { setUserPrefs } from "../user/userPrefsSlice";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { selectFavoriteArticles, selectReadArticles } from "../user/selectors";
import { AdDisplay } from "../ads/AdContainer";
import { selectAllAds } from "../ads/adsSlice";

type ArticleParams = {
	articleId: string;
};

const NewsArticle = () => {
	const allAds = useSelector(selectAllAds);
	const dispatch = useAppDispatch();
	const [article, setArticle] = useState<ArticleEntity>();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<any>();
	const history = useHistory();
	const { articleId } = useParams<ArticleParams>();
	const readArticles = useSelector(selectReadArticles);
	const favoriteArticles = useSelector(selectFavoriteArticles);
	const [articleAd, setArticleAd] = useState<any>();

	useEffect(() => {
		if (articleId) {
			get(`${mace_url}api/app/Article/${articleId}/expanded/`)
				.then((response) => {
					setArticle(response.data.results[0]);
					if (!readArticles.includes(articleId)) {
						dispatch(
							setUserPrefs({
								key: "articles.read",
								value: [...readArticles, articleId],
							})
						);
					}
				})
				.then(() => {
					setIsLoading(false);
					document.getElementById("re-content-container")?.scroll({
						top: 0,
						behavior: "smooth"
					});
				})
				.catch((e: Error) => setError(e));
		}
	}, [articleId]);

	useEffect(() => {
		if (allAds.length > 0) {
			const adsResponse = allAds[0];
			const articleAd = adsResponse.impressions.find((impression: any) => impression.tagName === "article-ad");

			if ((adsResponse?.isEnabled && articleAd?.isEnabled)) {
				setArticleAd(<AdDisplay type="article-ad" wrapperClass="p-4" isScript={articleAd.isScript} template={articleAd.template} />)
			}
		}
	}, [allAds]);

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

	if (error) {
		return <ErrorMessage message={error.message} />;
	}

	const BackBtn = () => (
		<button className="bg-header text-inverse text-xs font-medium py-2 px-4 pl-0 rounded relative xl:absolute top-4 sm:top-6 left-4 sm:left-6 inline-flex items-center z-10" onClick={() => history.goBack()}>
			<ChevronLeftIcon className="h-6 w-6" /> Go Back
		</button>
	);

	return (
		<ContentContainer title={article?.title || "Article"} cssClass="article-details relative">
			{isLoading && <ArticleLoader />}
			{!isLoading && article && (
				<>
					<BackBtn />
					<div className="overflow-hidden">
						<div className="relative max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 lg:py-12">
							<div className="hidden xl:block bg-secondary bg-opacity-50 absolute top-0 bottom-0 left-3/4 w-screen" />
							<div className="flex flex-col xl:flex-col-reverse xl:grid xl:grid-cols-2">
								<div className="relative lg:row-start-1 lg:col-start-2">
									{/* desktop article info */}
									<div className="hidden xl:block">
										<svg className="hidden lg:block absolute top-0 right-0 -mt-24 opacity-50" width={404} height={384} fill="none" viewBox="0 0 404 384" aria-hidden="true">
											<defs>
												<pattern id="de316486-4a29-4312-bdfc-fbce2132a2c1" x={0} y={0} width={20} height={20} patternUnits="userSpaceOnUse">
													<rect x={0} y={0} width={4} height={4} className="text-primary" fill="currentColor" />
												</pattern>
											</defs>
											<rect width={404} height={384} fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
										</svg>
										<div className="relative mx-auto max-w-prose lg:max-w-md">
											<div className="bg-secondary border border-divider shadow overflow-hidden sm:rounded-lg mt-6">
												<div className="border-t border-divider">
													<dl>
														{article.imageUrl && (
															<div className="flex-shrink-0">
																<img className="h-48 w-full object-cover" src={article.imageUrl} alt="" style={{ objectFit: "cover" }} />
															</div>
														)}
														<div className="bg-primary px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
															<div className="mt-1 text-sm text-secondary sm:mt-0 sm:col-span-2">
																<div className="relative flex items-center space-x-3">
																	{article.authorPhotoUrl ? (
																		<div className="flex-shrink-0">
																			<img className="h-10 w-10 rounded-full" src={article.authorPhotoUrl} alt="" />
																		</div>
																	) : (
																		<div className="bg-secondary rounded-full p-3">
																			<UserIcon className="h-4 w-4 text-header" />
																		</div>
																	)}
																	<div className="flex-1 min-w-0">
																		<span className="absolute inset-0" aria-hidden="true" />
																		<p className="text-sm font-medium text-primary">{article.byline}</p>
																	</div>
																</div>
															</div>
														</div>

														{article.articleCategory && (
															<div className="bg-secondary px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
																<dt className="text-sm font-medium text-secondary">Category</dt>
																<dd className="mt-1 text-sm text-tertiary sm:mt-0 sm:col-span-2">
																	<Link to={`/articles?cat=${article.articleCategory.id}`} className="hover:underline">
																		{article.articleCategory.name}
																	</Link>
																</dd>
															</div>
														)}
														<div className="bg-primary px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
															<dt className="text-sm font-medium text-primary">Published</dt>
															<dd className="mt-1 text-sm text-primary sm:mt-0 sm:col-span-2">{dayjs(article.publishOn).format("MMM D, YYYY")}</dd>
														</div>
														<div className="bg-secondary px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
															<dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
																<div className="relative flex items-center space-x-3">
																	{!favoriteArticles.includes(articleId) ? (
																		<>
																			<StarIcon className="w-5 h-5 text-primary cursor-pointer mx-1" onClick={() => toggleFavorite(article)} /> Add to favorites
																		</>
																	) : (
																		<>
																			<StarIcon className="w-5 h-5 text-yellow-500 cursor-pointer mx-1" onClick={() => toggleFavorite(article)} /> Remove from favorites
																		</>
																	)}
																</div>
															</dd>
														</div>
													</dl>
												</div>
											</div>
										</div>
									</div>
									<div className="flex justify-center">
										{articleAd}
									</div>
									{/* mobile article info */}
									<div className="block xl:hidden relative lg:row-start-1 lg:col-start-2 pb-4 border-b border-divider text-xs">
										{article.byline && (
											<div className="flex items-center py-1 space-x-2">
												<div className="font-medium">{article.byline}</div>
											</div>
										)}
										{article.articleCategory && (
											<div className="flex items-center py-1 space-x-2">
												<div className="font-medium">Category</div>
												<div className="text-sm">
													<Link to={`/articles?cat=${article.articleCategory.id}`} className="hover:underline text-tertiary">
														{article.articleCategory.name}
													</Link>
												</div>
											</div>
										)}
										{article.publishOn && (
											<div className="flex items-center py-1 space-x-2">
												<div className="font-medium">Published</div>
												<div className="">{dayjs(article.publishOn).format("MMM D, YYYY")}</div>
											</div>
										)}
										<div className="flex items-center py-1 space-x-2">
											<div className="font-medium">{!favoriteArticles.includes(articleId) ? "Add to favorites" : "Remove from favorites"}</div>
											<div className="">{<StarIcon className={`w-5 h-5 ${!favoriteArticles.includes(articleId) ? "text-primary" : "text-yellow-500"} cursor-pointer mx-1`} onClick={() => toggleFavorite(article)} />}</div>
										</div>
									</div>
								</div>
								<div className="mt-8 lg:mt-0">
									
									{article.renderedContent && <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: article.renderedContent }}></div>}
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</ContentContainer>
	);
};

export default NewsArticle;
