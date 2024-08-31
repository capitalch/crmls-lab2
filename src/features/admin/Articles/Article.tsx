import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { getArticle, mace_url } from "../../../adapters";
import { FormLoader } from "../../../components/widgets/SkeletonScreens";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { RequiredIndicator } from "../../registeredListing/RegisteredListingForm";
import { CheckCircleIcon, InformationCircleIcon } from "@heroicons/react/solid";
import { useAppDispatch } from "../../../app/hooks";
import { show } from "../../notification/notificationSlice";
import MediaManagerModal from "../tools/MediaManagerModal";
import Tabs from "../../../components/tabs/Tabs";
import { ChangedEventArgs, DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { useSelector } from "react-redux";
import { userProfile } from "../../user/selectors";
import axios from "axios";
import TinyEditor from "../tools/TinyEditor";
import { ThemeTooltip } from "../../../components/settings/theme/ThemeTooltip";

export type RouteParam = {
	insightId: string;
};

const Article = ({ id, closeSlider }: { id?: string; closeSlider?: () => void }) => {
	const profile = useSelector(userProfile);
	const dispatch = useAppDispatch();
	const [article, setArticle] = useState<any>();
	const [isLoading, setIsLoading] = useState(true);
	const [disabled, setDisabled] = useState(true);

	const displayToast = (status: any, title: string, message: string) => {
		dispatch(
			show({
				show: true,
				title,
				message,
				status,
				position: "popover",
				autoHide: 5000,
				confirm: false,
				notificationId: null,
			})
		);
	};

	const articleId = id ?? null;
	useEffect(() => {
		if (articleId) {
			getArticle(articleId).then((response: any) => {
				setArticle(response.data.results[0]);
				setIsLoading(false);
				setDisabled(false);
			});
		} else {
			setIsLoading(false);
			setDisabled(false);
		}
	}, []);

	const handleImageChange = (files: any, setFieldValue: any) => {
		if (files.length > 0) {
			setFieldValue("imageUrl", files[0]);
		} else {
			setFieldValue("imageUrl", "");
		}
	};

	const handleContentChange = (value: any, setFieldValue: any) => {
		setFieldValue("content", value);
	};

	return isLoading ? (
		<div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
			<FormLoader />
		</div>
	) : (
		<>
			<Formik
				validationSchema={Yup.object().shape({
					title: Yup.string()
						.min(5)
						.max(200)
						.matches(/^(?!(?:.|[\n\r])*<[a-z][a-z0-9]*\b[^>]*>)/i, "HTML is not allowed")
						.required("Title Required"),
					imageUrl: Yup.string(),
					byline: Yup.string().max(200),
					publishOn: article ? Yup.date().required("Publish On Required") : Yup.date().required("Publish On Required").min(dayjs().toDate(), "Publish On must be in the future"),
					expiresOn: Yup.date().min(Yup.ref("publishOn"), "Expires On must be after Publish On"),
					promoteOn: Yup.date().min(Yup.ref("publishOn"), "Promote On must be after Publish On"),
					promoteEnd: Yup.date().min(Yup.ref("promoteOn"), "Promote End must be after Promote On"),
					content: Yup.string().max(1000).required("Content Required"),
				})}
				initialValues={{
					title: article?.title ?? "",
					imageUrl: article?.imageUrl ?? "",
					byline: article?.byline ?? "",
					publishOn: article?.publishOn ? new Date(article.publishOn) : new Date(),
					expiresOn: article?.expiresOn ? new Date(article.expiresOn) : undefined,
					promoteOn: article?.promoteOn ? new Date(article.promoteOn) : undefined,
					promoteEnd: article?.promoteEnd ? new Date(article.promoteEnd) : undefined,
					content: article?.content ?? "",
				}}
				onSubmit={async (values, { resetForm }) => {
					let payload: any = {
						title: values.title,
						imageUrl: values.imageUrl,
						byline: values.byline,
						publishOn: values.publishOn,
						expiresOn: values.expiresOn,
						promoteOn: values.promoteOn,
						promoteEnd: values.promoteEnd,
						content: values.content,
					};

					if (article) {
						// Updating an existing article
						delete article?.articleCategory;
						delete article?.audience;
						delete article?.template;
						delete article?.criteria;

						payload = { ...article, ...payload };
						axios
							.put(mace_url + "api/app/article/" + article.id, payload)
							.then((response) => {
								displayToast("success", "Success", "Article updated succesfully");
								resetForm();
								setDisabled(false);
								if (closeSlider) {
									closeSlider();
								}
							})
							.catch((e) => {
								displayToast("error", "Error", "There was a problem updating the article. " + e.message);
								console.error("Error updating article", e);
							});
					} else {
						// Creating a new article
						const newArticlePayload = {
							sourceId: profile?.aor?.id,
							articleCategoryId: process.env.REACT_APP_ARTICLE_CATEGORY_ID,
							templateId: process.env.REACT_APP_ARTICLE_TEMPLATE_ID,
							status: "Approved",
							criteria: [{ field: "aorShortName", op: "Equal", values: [profile?.aor?.shortName] }],
						};
						payload = { ...newArticlePayload, ...payload };

						axios
							.post(mace_url + "api/app/article/", payload)
							.then((response) => {
								if (response.data?.isSuccessful) {
									displayToast("success", "Success", "Your article has been created succesfully");
									resetForm();
									setDisabled(false);
									if (closeSlider) {
										closeSlider();
									}
								} else {
									displayToast("error", "Error", `There was a problem creating the article: ${response.data?.message ?? "Unknown error"}`);
								}
							})
							.catch((e) => {
								displayToast("error", "Error", "There was a problem creating the article. " + e.message);
								console.error("Error creating article", e);
							});
					}
				}}
			>
				{({ values, errors, touched, setFieldValue, handleChange }) => (
					<Form>
						<Tabs section="admin-articles" activeTab="Details">
							<div key="details" data-label="Details">
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full 2xl:w-2/3">
									<div className="crmls-field-wrap">
										<label htmlFor="title">Title {RequiredIndicator}</label>
										<div className="mt-1 sm:mt-0 sm:col-span-2">
											<div className="max-w-lg flex rounded-md shadow-sm">
												<input
													type="text"
													id="title"
													name="title"
													className="input-registered"
													disabled={disabled}
													onChange={(e) => {
														setFieldValue("title", e.target.value);
													}}
													defaultValue={values.title ?? ""}
												/>
											</div>
										</div>
										{touched.title && errors.title && <div className="text-sm text-red-600">{errors.title}</div>}
									</div>
									<div className="crmls-field-wrap">
										<label htmlFor="byline">Author/Byline</label>
										<div className="mt-1 sm:mt-0 sm:col-span-2">
											<div className="max-w-lg flex rounded-md shadow-sm">
												<input
													type="text"
													id="byline"
													name="byline"
													className="input-registered"
													disabled={disabled}
													onChange={(e) => {
														setFieldValue("byline", e.target.value);
													}}
													defaultValue={values.byline ?? ""}
												/>
											</div>
										</div>
										{touched.byline && errors.byline && <div className="text-sm text-red-600">{errors.byline}</div>}
									</div>
									<div className="crmls-field-wrap">
										<label htmlFor="publishOn">Publish On</label>
										<div className="mt-1 sm:mt-0 sm:col-span-2">
											<div className="max-w-lg flex rounded-md shadow-sm">
												<DateTimePickerComponent id="publishOn" value={values.publishOn} min={new Date()} onChange={(e: ChangedEventArgs) => setFieldValue("publishOn", e.value)} cssClass="px-3 py-1 bg-secondary text-secondary" />
											</div>
										</div>
										{touched.publishOn && errors.publishOn && <div className="text-sm text-red-600">{errors.publishOn}</div>}
									</div>
									<div className="crmls-field-wrap">
										<label htmlFor="expiresOn">Expires On</label>
										<div className="mt-1 sm:mt-0 sm:col-span-2">
											<div className="max-w-lg flex rounded-md shadow-sm">
												<DateTimePickerComponent id="expiresOn" value={values.expiresOn} min={new Date()} onChange={(e: ChangedEventArgs) => setFieldValue("expiresOn", e.value)} cssClass="px-3 py-1 bg-secondary text-secondary" />
											</div>
										</div>
										{touched.expiresOn && errors.expiresOn && <div className="text-sm text-red-600">{errors.expiresOn}</div>}
									</div>
								</div>
								<h3 className="font-medium text-xl mb-2 mt-5">Carousel Details</h3>
								<p>If you would like to show the article in the dashboard carousel, please enter the information below.</p>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full 2xl:w-2/3">
									<div className="crmls-field-wrap">
										<label htmlFor="promoteOn">Promote On</label>
										<div className="mt-1 sm:mt-0 sm:col-span-2">
											<div className="max-w-lg flex rounded-md shadow-sm">
												<DateTimePickerComponent id="promoteOn" value={values.promoteOn} min={new Date()} onChange={(e: ChangedEventArgs) => setFieldValue("promoteOn", e.value)} cssClass="px-3 py-1 bg-secondary text-secondary" />
											</div>
										</div>
										{touched.promoteOn && errors.promoteOn && <div className="text-sm text-red-600">{errors.promoteOn}</div>}
									</div>
									<div className="crmls-field-wrap">
										<label htmlFor="promoteEnd">Promote End</label>
										<div className="mt-1 sm:mt-0 sm:col-span-2">
											<div className="max-w-lg flex rounded-md shadow-sm">
												<DateTimePickerComponent id="promoteEnd" value={values.promoteEnd} min={new Date()} onChange={(e: ChangedEventArgs) => setFieldValue("promoteEnd", e.value)} cssClass="px-3 py-1 bg-secondary text-secondary" />
											</div>
										</div>
										{touched.promoteEnd && errors.promoteEnd && <div className="text-sm text-red-600">{errors.promoteEnd}</div>}
									</div>
									<div className="crmls-field-wrap">
										<label htmlFor="imageUrl">
											Carousel Image <InformationCircleIcon className="w-5 h-5 text-header inline cursor-pointer" data-tip="Carousel images should be 384x192 (384px wide by 192px high)" />
										</label>
										<div className="mt-1 sm:mt-0 sm:col-span-2">
											<div className="max-w-lg flex rounded-md shadow-sm relative">
												<MediaManagerModal type="append" onInsert={(e) => handleImageChange(e, setFieldValue)} />
												<input id="imageUrl" type="text" onChange={handleChange} value={values.imageUrl} className="input-registered pl-16" placeholder="Enter Image Url" disabled={disabled} />
												{touched.imageUrl && errors.imageUrl ? <div className="text-sm text-red-600">{errors.imageUrl}</div> : null}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div key="article-body" data-label="Article Body">
								{/* <textarea className="input-registered" name="content" onChange={handleChange} value={values.content} /> */}
								<InformationCircleIcon className="w-5 h-5 text-header inline cursor-pointer" data-tip="Article content must be less than or equal to 1000 characters." />
								<TinyEditor value={values.content} change={(e: any) => handleContentChange(e, setFieldValue)} disabled={disabled} mediaContainer="articles" mediaAuthType="marketing" />
								{touched.content && errors.content ? <div className="text-sm text-red-600">{errors.content}</div> : null}
							</div>
						</Tabs>
						<div className="mt-8 w-100">
							<button type="submit" className={`crmls-submit-btn ${disabled ? "bg-opacity-20" : ""}`} disabled={disabled}>
								<CheckCircleIcon className="w-6 pr-2" />
								{article ? "Update Article" : "Create Article"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
			<ThemeTooltip />
		</>
	);
};

export default Article;
