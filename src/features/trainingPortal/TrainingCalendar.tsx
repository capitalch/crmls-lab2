import React, { useEffect, useRef, useState } from "react";
import { Agenda, Day, EventRenderedArgs, Inject, Month, ScheduleComponent, View, ViewDirective, ViewsDirective, Week, WorkWeek } from "@syncfusion/ej2-react-schedule";
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";
import { contentTemplate, footerTemplate, headerTemplate } from "./CalendarWidgets/CalendarTemplate";
import { selectPersistenceByPath, setSessionPref } from "../user/persistenceSlice";
import { useAppDispatch } from "../../app/hooks";
import { CalendarLoader } from "../../components/widgets/SkeletonScreens";

export type calendarEvent = {
	Id: string;
	Subject: string;
	StartTime: Date;
	EndTime: Date;
	IsAllDay: boolean;
	CategoryColor: string;
	InstructorName: string;
	LocationName: string;
	Topics: string[];
	Aor: string;
	SeatsAvailable: number;
};

const TrainingCalendar = ({ calendarEvents }: { calendarEvents: calendarEvent[] }) => {
	const dispatch = useAppDispatch();
	const scheduler = useRef<any>();
	const [calendarView, setCalendarView] = useState<View>();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const calendarViewKey = "training.calendar.view";

	useEffect(() => {
		// Set the default calendar view to month unless there is a persistence value
		setCalendarView(selectPersistenceByPath(calendarViewKey) ?? "Month");
		setIsLoading(false);
	}, []);

	const applyCategoryColor = (args: EventRenderedArgs, currentView: string) => {
		let categoryColor = args.data.CategoryColor;
		if (!args.element || !categoryColor) {
			return;
		}
		if (currentView === "Agenda" && args && args.element.firstChild) {
			// args.element.firstChild.style.borderLeftColor = categoryColor;
			return;
		} else {
			args.element.style.backgroundColor = categoryColor;
		}
	};

	const renderEvent = (args: EventRenderedArgs) => {
		applyCategoryColor(args, scheduler.current.currentView);
	};

	const onNavigate = (args: any) => {
		// Triggered when changing calendar view - set the persistence value
		if (args.action === "view") {
			dispatch(
				setSessionPref({
					key: calendarViewKey,
					value: args.currentView,
				})
			);
		}
	};

	if (isLoading) {
		return <CalendarLoader />;
	}

	return (
		<div className="col-lg-12 pb-12">
			<div className="portlet-box portlet-fullHeight border0 shadow-sm mb-30">
				<div className="portlet-body pt-2">
					<ScheduleComponent
						width="100%"
						height="650px"
						selectedDate={new Date()}
						readonly={true}
						ref={scheduler}
						eventSettings={{ dataSource: calendarEvents }}
						showWeekend={false}
						workHours={{
							highlight: true,
							start: "09:00",
							end: "17:00",
						}}
						startHour="08:00"
						endHour="17:00"
						eventRendered={renderEvent}
						popupOpen={(args) => {
							const $closeBtn = args.element.querySelector(".close-btn");
							// Close button
							$closeBtn.addEventListener("click", () => {
								if (scheduler.current) {
									scheduler.current.quickPopup.quickPopup.hide(true);
								}
							});
						}}
						quickInfoTemplates={{
							header: headerTemplate,
							content: contentTemplate,
							footer: footerTemplate,
						}}
						cssClass="training-calendar"
						currentView={calendarView}
						navigating={onNavigate}
					>
						<ViewsDirective>
							<ViewDirective option="Day" />
							<ViewDirective option="Week" />
							<ViewDirective option="Month" />
							<ViewDirective option="Agenda" />
						</ViewsDirective>
						<Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
					</ScheduleComponent>
				</div>
			</div>
		</div>
	);
};

export default TrainingCalendar;
