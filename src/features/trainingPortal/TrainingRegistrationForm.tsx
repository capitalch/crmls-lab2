import { useEffect, useState } from "react";
import { useParams } from "react-router";
import dayjs from "dayjs";
import ICalendarLink from "react-icalendar-link";
import { TrainingClassEntity } from "./trainingTypes";
import Loader from "../../components/widgets/Loader";
import ErrorMessage from "../../components/widgets/ErrorMessage";
import { get, training_url } from "../../adapters";
import TrainingRegButtons from "./TrainingRegButtons";
import localizedFormat from "dayjs/plugin/localizedFormat";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import TrainingMap from "./TrainingMap";
import Tabs from "../../components/tabs/Tabs";
import ContentContainer from "../../components/content/ContentContainer";
<<<<<<< HEAD
import { ChatIcon, InformationCircleIcon, MapIcon, PaperClipIcon } from "@heroicons/react/outline";
=======
import { ChatIcon, DocumentTextIcon, InformationCircleIcon, MapIcon, PaperClipIcon, VideoCameraIcon, PhotographIcon } from "@heroicons/react/outline";
>>>>>>> dev-1
import { ThemeTooltip } from "../../components/settings/theme/ThemeTooltip";

type TrainingFormParams = {
	eventId: string;
};

const TrainingRegistrationForm = () => {
	const [trainingClass, setTrainingClass] = useState<TrainingClassEntity>();
	const [isLoading, setIsLoading] = useState(true);
	const [instructorColor, setInstructorColor] = useState("#0D8ABC");
	const [error, setError] = useState<any>();

	dayjs.extend(localizedFormat);
	dayjs.extend(duration);
	dayjs.extend(utc);

	let { eventId } = useParams<TrainingFormParams>();

	useEffect(() => {
		if (eventId) {
			setIsLoading(true);
			get(`${training_url}api/app/trainingClass/${eventId}/expanded?trainingClassId=${eventId}`)
				.then((response) => {
					setTrainingClass(response.data.results[0]);
					setInstructorColor(response.data.results[0].instructor.color);
				})
				.then(() => setIsLoading(false))
				.catch((e: Error) => setError(e));
		}
	}, [eventId]);

	const getICalLink = () => {
		const event = {
			title: trainingClass?.className ?? "CRMLS Training",
			description: "CRMLS Training Class",
			startTime: dayjs(trainingClass?.startTime).toISOString(),
			endTime: dayjs(trainingClass?.endTime).toISOString(),
			location: trainingClass?.location?.address ?? "",
			attendees: [],
		};

		return (
			<ICalendarLink event={event}>
				<button type="button" className="inline-flex justify-center px-4 py-2 shadow-sm text-sm font-medium rounded-md text-inverse bg-header hover:bg-opacity-80">
					<MapIcon className="mr-2 h-5 w-5" />
					<span>Add to Calendar</span>
				</button>
			</ICalendarLink>
		);
	};

	const openTopicAttachment = (attachmentUrl: string | null | undefined) => {
		if (attachmentUrl) {
			window.open(attachmentUrl);
		}
<<<<<<< HEAD
	}
=======
	};
>>>>>>> dev-1

	const buildTabContent = () => {
		if (trainingClass) {
			let tabs = [
				<div key="details" data-label="Class Details">
					<div className="mt-6 max-w-6xl">
						<dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-4">
							<div className="sm:col-span-1">
								<dt className="text-sm font-medium">Presented By:</dt>
								<dd className="mt-1 text-sm">{trainingClass.instructor?.name}</dd>
							</div>
							<div className="sm:col-span-1">
								<dt className="text-sm font-medium">Location:</dt>
								<dd className="mt-1 text-sm">{trainingClass.presentationType === "Virtual" ? "Virtual" : trainingClass.location?.name}</dd>
							</div>
							<div className="sm:col-span-1">
								<dt className="text-sm font-medium">Start Date:</dt>
								<dd className="mt-1 text-sm">{dayjs(trainingClass.startTime ?? "").format("lll")}</dd>
							</div>
							<div className="sm:col-span-1">
								<dt className="text-sm font-medium">End Date:</dt>
								<dd className="mt-1 text-sm">{dayjs(trainingClass.endTime ?? "").format("lll")}</dd>
							</div>
							<div className="sm:col-span-4">
								<dd className="mt-1 text-sm space-y-3">
									<p>{trainingClass.instructor?.notes}</p>
								</dd>
							</div>
						</dl>
					</div>

					{trainingClass?.trainingTopics && trainingClass.trainingTopics.length > 0 && (
						<div className="mt-8 max-w-6xl pb-12">
							<h2 className="text-sm font-medium">Topics:</h2>
							<div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
								{trainingClass.trainingTopics?.map((t) => {
									if (t.trainingTopic) {
<<<<<<< HEAD
										return (
											<div key={t.trainingTopic?.id} className="relative rounded-lg border border-default bg-secondary text-secondary px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-divider">
												{(t.trainingTopic?.notes || t.trainingTopic?.attachmentUrl) && (
												<div className="absolute z-10 top-4 right-4 flex space-x-1">
													{t.trainingTopic?.notes && <InformationCircleIcon className="h-4 w-4 text-secondary hover:opacity-80 cursor-pointer focus:outline-none focus:ring-0" data-tip={t.trainingTopic?.notes} />}
													{t.trainingTopic?.attachmentUrl && <PaperClipIcon className="h-4 w-4 text-secondary hover:opacity-80 cursor-pointer focus:outline-none focus:ring-0" data-tip="Click to view attachment" onClick={() => openTopicAttachment(t.trainingTopic?.attachmentUrl)} />}
												</div>)}
=======
										let attachmentIcon = <></>;
										if (t.trainingTopic?.attachmentUrl) {
											let fileExt = t.trainingTopic?.attachmentUrl.split(".").pop() ?? "";
											if (["pdf", "doc", "docx", "xls", "xlsx", "csv", "ppt", "pptx", "txt"].includes(fileExt)) {
												attachmentIcon = <DocumentTextIcon className="h-4 text-secondary hover:opacity-80 cursor-pointer focus:outline-none focus:ring-0" data-tip="Click to view attachment" onClick={() => openTopicAttachment(t.trainingTopic?.attachmentUrl)} />;
											} else if (["jpg", "jpeg", "png", "gif"].includes(fileExt)) {
												attachmentIcon = <PhotographIcon className="h-4 text-secondary hover:opacity-80 cursor-pointer focus:outline-none focus:ring-0" data-tip="Click to view attachment" onClick={() => openTopicAttachment(t.trainingTopic?.attachmentUrl)} />;
											} else {
												attachmentIcon = <PaperClipIcon className="h-4 text-secondary hover:opacity-80 cursor-pointer focus:outline-none focus:ring-0" data-tip="Click to view attachment" onClick={() => openTopicAttachment(t.trainingTopic?.attachmentUrl)} />;
											}
										}
										return (
											<div key={t.trainingTopic?.id} className="relative rounded-lg border border-default bg-secondary text-secondary px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-divider">
												{(t.trainingTopic?.notes || t.trainingTopic?.videoUrl || t.trainingTopic?.attachmentUrl) && (
													<div className="absolute z-10 top-4 right-4 flex space-x-1">
														{t.trainingTopic?.notes && <InformationCircleIcon className="h-4 text-secondary hover:opacity-80 cursor-pointer focus:outline-none focus:ring-0" data-tip={t.trainingTopic?.notes} />}
														{t.trainingTopic?.videoUrl && <VideoCameraIcon className="h-4 text-secondary hover:opacity-80 cursor-pointer focus:outline-none focus:ring-0" data-tip="Click to view video" onClick={() => openTopicAttachment(t.trainingTopic?.videoUrl)} />}
														{attachmentIcon}
													</div>
												)}
>>>>>>> dev-1
												<div className="flex-shrink-0">
													<ChatIcon className="h-8 w-8" />
												</div>
												<div className="flex-1 min-w-0">
													<span className="absolute inset-0" aria-hidden="true"></span>
													<p className="text-sm font-medium mb-2">{t.trainingTopic?.name}</p>
													<p className="text-sm whitespace-pre-wrap">{t.trainingTopic?.description}</p>
												</div>
											</div>
										);
									}
									return "";
								})}
							</div>
						</div>
					)}
				</div>,
			];

			// Add location tab only if there is a location and the presentation type is NOT virtual
			if (trainingClass.location && trainingClass.presentationType !== "Virtual") {
				tabs.push(
					<div key="location" data-label="Location">
						<div className="mt-6 max-w-6xl">
							<dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
								<div className="sm:col-span-1">
									<dt className="text-sm font-medium">Name:</dt>
									<dd className="mt-1 text-sm">{trainingClass.location?.name}</dd>
								</div>
								<div className="sm:col-span-1">
									<dt className="text-sm font-medium">Address:</dt>
									<dd className="mt-1 text-sm">{trainingClass.location?.address}</dd>
								</div>
							</dl>
							{trainingClass.location?.address && (
								<div className="w-full h-96 mt-4">
									<TrainingMap address={trainingClass.location.address} zoom={10} />
								</div>
							)}
						</div>
					</div>
				);
			}

			return tabs;
		}
		return;
	};

	if (isLoading) {
		return <Loader />;
	} else if (error) {
		return <ErrorMessage message={error.message} />;
	} else if (trainingClass) {
		return (
			<ContentContainer title={trainingClass.className ?? "No Name Class"} subTitle={`Presented by: ${trainingClass.instructor?.name}`}>
				<div className="pb-16">
					<div className="container max-w-2xl bg-primary transform duration-200 easy-in-out">
						{trainingClass.imageURL && (
							<div className="h-90 overflow-hidden border border-crmls-blue">
								<img className="w-full" src={trainingClass.imageURL} alt="" />
							</div>
						)}
						<div className={`flex justify-left ${trainingClass.imageURL ? "-mt-14" : "mt-4"}`}>
							<img
								className="h-32 w-32 bg-white p-1 rounded-full"
								src={trainingClass.instructor?.photoURL ? trainingClass.instructor?.photoURL : `https://ui-avatars.com/api/?background=${instructorColor.substring(1)}&color=fff&name=${trainingClass.instructor?.name}`}
								alt={trainingClass.instructor?.name || ""}
							/>
						</div>
						<div className="sm:hidden 2xl:block -mt-16 min-w-0 flex-1 ml-36">
							<h2 className="text-xl font-bold">{trainingClass.className ?? "No Name Class"}</h2>
							<span className="text-sm">Presented by: {trainingClass.instructor?.name}</span>
						</div>
					</div>
					<div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
						<TrainingRegButtons classId={eventId} seatsLeft={trainingClass.seatsAvailable} />
						{trainingClass.location && trainingClass.presentationType !== "Virtual" && (
							<a href={`https://www.google.com/maps?saddr=Current+Location&daddr=${trainingClass.location.address}`} target="_blank" rel="noreferrer">
								<button type="button" className="inline-flex justify-center px-4 py-2 border border-default hover:border-divider shadow-sm text-sm font-medium rounded-md bg-header hover:bg-opacity-80 text-inverse">
									<MapIcon className="-ml-1 mr-2 h-5 w-5" />
									<span>Directions</span>
								</button>
							</a>
						)}
					</div>
					<div className="max-w-full mt-12">
						<Tabs section="trainingRegistration" persist={false} children={buildTabContent()} />
					</div>
					<div className="max-w-full mt-4">
						{/* @TODO: should this be moved into the registration buttons component? if the user has already signed up, show add to calendar? */}
						{getICalLink()}
					</div>
				</div>
				<ThemeTooltip />
			</ContentContainer>
		);
	} else {
		return <div>No class found</div>;
	}
};

export default TrainingRegistrationForm;
