import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formattedProfile } from "../user/selectors";
import SelectCheck from "../../components/widgets/forms/SelectCheck";
import TrainingCalendar, { calendarEvent } from "./TrainingCalendar";
import Tabs from "../../components/tabs/Tabs";
import dayjs from "dayjs";
import TrainingCourseRequest from "./TrainingCourseRequest";
import TrainingCourseRequests from "./TrainingCourseRequests";
import { useAppDispatch } from "../../app/hooks";
import { get, getAllUpcomingTrainingClasses, training_url } from "../../adapters";
import TrainingHistory from "./TrainingHistory";
import Loader from "../../components/widgets/Loader";
import ErrorMessage from "../../components/widgets/ErrorMessage";
import TrainingClassesTable from "./TrainingClassesTable";
import { fetchMyTrainingClasses } from "./trainingPortalSlice";
import { fetchMyTrainingClassRequests } from "./trainingClassRequestSlice";
import ContentContainer from "../../components/content/ContentContainer";
import { selectPersistenceByPath, setSessionPref } from "../user/persistenceSlice";

const TrainingHome = (props: any) => {
	const { path } = props.match;
	const dispatch = useAppDispatch();
	let userProfile = useSelector(formattedProfile);
	const trainingTopicFilterKey = "training.topic.filter";
	const trainingSubjectFilterKey = "training.subject.filter";
	const [data, setData] = useState<any>([]);
	const [allTopics, setAllTopics] = useState<any[]>([]);
	const [topics, setTopics] = useState<{ id: string; name: string }[]>([]);
	const [topic, setTopic] = useState(selectPersistenceByPath(trainingTopicFilterKey) ?? "");
	const [error, setError] = useState<any>();
	const [isLoading, setIsLoading] = useState(true);
	const [calendarData, setCalendarData] = useState<any>([]);
	const [subjects, setSubjects] = useState<{ id: string; name: string }[]>([]);
	const [subject, setSubject] = useState(selectPersistenceByPath(trainingSubjectFilterKey) ?? "");

	useEffect(() => {
		if (userProfile.memberId) {
			dispatch(fetchMyTrainingClassRequests(userProfile.memberId));
			dispatch(fetchMyTrainingClasses(userProfile.memberId));
		}
	}, [userProfile]);

	const changeSubject = (e: any) => {
		// set persistence value for training subject
		dispatch(
			setSessionPref({
				key: trainingSubjectFilterKey,
				value: e,
			})
		);
		setTopic("");
		setSubject(e);
	};

	const changeTopic = (e: any) => {
		// set persistence value for training topic
		dispatch(
			setSessionPref({
				key: trainingTopicFilterKey,
				value: e,
			})
		);
		setTopic(e);
	};

	useEffect(() => {
		let topicSelect = allTopics.sort((a: any, b: any) => (a.name > b.name ? 1 : -1));
		if (subject && allTopics.length > 0) {
			topicSelect = allTopics.filter((topic) => topic.trainingSubjectId === subject).sort((a: any, b: any) => (a.name > b.name ? 1 : -1));
		}
		topicSelect.unshift({ id: "", name: "Select Topic" });
		setTopics(topicSelect);
	}, [allTopics, subject]);

	useEffect(() => {
		// get subjects
		get(`${training_url}api/app/subjects`).then((response) => {
			let t = response.data.results.sort((a: any, b: any) => (a.name > b.name ? 1 : -1));
			t.unshift({ id: "", name: "Select Subject" });
			setSubjects(t);
		});

		// get topics - these will be filtered on selection of subject
		get(`${training_url}api/app/TrainingTopic/GetAllTrainingTopics`).then((response) => {
			setAllTopics(response.data.results);
		});
	}, []);

	useEffect(() => {
		getClasses();
	}, [topic]);

	const getClasses = () => {
		// get classes
		getAllUpcomingTrainingClasses()
			.then((response) => {
				let calendar_events: calendarEvent[] = [];
				let filtered_events = response.data.results.filter((r: any) => {
					if (topic.length) {
						if (r.trainingTopics.length) {
							return r.trainingTopics.find((t: any) => t.trainingTopicId === topic);
						} else {
							return false;
						}
					} else {
						return true;
					}
				});
				filtered_events.forEach((r: any) => {
					let event = {
						Id: r.id,
						Subject: r.className ?? "Training Class",
						StartTime: dayjs(r.startTime).toDate(),
						EndTime: dayjs(r.endTime).toDate(),
						IsAllDay: false,
						CategoryColor: r.instructor.color,
						InstructorName: r.instructor.name ?? "",
						LocationName: r.location.name ?? "",
						Topics: r.trainingTopics.map((t: any) => t.name ?? ""),
						Aor: r.aor ? r.aor.name : "",
						SeatsAvailable: r.seatsAvailable ?? 0,
						imageURL: r.imageURL ?? "",
					};
					calendar_events.push(event);
				});
				setData(filtered_events);
				return calendar_events;
			})
			.then((calendarEvents) => {
				setCalendarData(calendarEvents);
				setIsLoading(false);
			})
			.catch((e) => {
				console.error(e);
				setError(e);
				setIsLoading(false);
			});
	};

	if (isLoading) {
		return <Loader />;
	} else if (error) {
		return <ErrorMessage message={error.message} />;
	}

	const title = "CRMLS Training Portal";
	const subTitle = "Find and sign up for CRMLS training sessions.";
	const description =
		"The CRMLS Education Team is here to provide the support, knowledge, and instruction you need. Through personalized Association trainings, live and recorded webinars, monthly broker office training, and exclusive one-to-one development, CRMLS offers resources and attention for every learning style and stage in your career.";
	return (
		<>
			<ContentContainer title={title} subTitle={subTitle} description={description} actions={null}>
				<div className="grid grid-cols-8 gap-6 mb-2">
					<div className="col-span-6 sm:col-span-2">
						<SelectCheck id="subject" label="Select Subject" value={subject} options={subjects} changeHandler={changeSubject} />
					</div>
					{subject && (
						<div className="col-span-6 sm:col-span-2">
							<SelectCheck id="topic" label="Filter Topic" value={topic} options={topics} changeHandler={changeTopic} />
						</div>
					)}
				</div>
				<Tabs section="training" rootPath={path.replace("/:urlTab?", "")}>
					<div key="training-calendar" data-label="Training Calendar">
						<TrainingCalendar calendarEvents={calendarData} />
					</div>
					<div key="class-list" data-label="Class List">
						<TrainingClassesTable trainingClasses={data} />
					</div>
					<div key="my-scheduled-classes" data-label="My Scheduled Classes">
						<TrainingHistory />
					</div>
					<div key="request-a-course" data-label="Request a Course">
						<TrainingCourseRequest topics={topics} />
					</div>
					<div key="my-course-requests" data-label="My Course Requests">
						<TrainingCourseRequests topics={topics} />
					</div>
				</Tabs>
			</ContentContainer>
		</>
	);
};

export default TrainingHome;
