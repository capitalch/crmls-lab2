import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { show } from "../notification/notificationSlice";
import { RenderDayCellEventArgs } from "@syncfusion/ej2-react-calendars";
import { useSelector } from "react-redux";
import { userId } from "../user/selectors";
import dayjs from "dayjs";
import { cancelTrainingClassRequest, selectAllTrainingClassRequests } from "./trainingClassRequestSlice";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { ClassRequestEntity } from "./trainingTypes";
import { columnType } from "../../components/widgets/sortableTable/SortableTable";
import { classNames } from "../../util/helpers";
import { XCircleIcon } from "@heroicons/react/solid";
import SortableTableContainer from "../../components/widgets/sortableTable/SortableTableContainer";

const ClassRequestColumns: columnType[] = [
	{
		field: "topic",
		label: "Topic ",
		sortable: false,
		justify: "center",
		hideMobile: false,
	},
	{
		field: "dateTime",
		label: "Requested Class Date",
		sortable: false,
		formatAs: "datetime",
		justify: "center",
		hideMobile: false,
	},
	{
		field: "status",
		label: "Request Status",
		sortable: false,
		justify: "center",
		hideMobile: false,
	},
	{
		field: "actions",
		label: "Actions",
		sortable: false,
		justify: "center",
	},
];

const TrainingCourseRequests = ({ topics }: { topics: { id: string; name: string }[] }) => {
	dayjs.extend(LocalizedFormat);

	const dispatch = useAppDispatch();
	const [isProcessing, setIsProcessing] = useState(false);

	let classRequests = useSelector(selectAllTrainingClassRequests);

	const buildActionButton = (classRequest: ClassRequestEntity) => {
		let disabled = !!(classRequest.requestStatus && classRequest.requestStatus > 1);

		let icon, color, onClick: { (): void; (): void } | null;
		switch (classRequest.requestStatus) {
			case 1:
			case 2:
				// Active
				icon = <XCircleIcon className="w-6 pr-2" />;
				color = "red";
				onClick = () => {
					setIsProcessing(true);
					dispatch(cancelTrainingClassRequest(classRequest)).then(() => {
						dispatch(
							show({
								show: true,
								title: "Cancelled!",
								message: "Your course request has been cancelled.",
								status: "warn",
								position: "popover",
								autoHide: 5000,
								confirm: false,
								notificationId: null,
							})
						);
						setIsProcessing(false);
					});
				};
				break;
		}

		let colorClass = classNames(`cursor-pointer inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-${color}-600 hover:bg-${color}-500 disabled:opacity-50`, "w-25");

		if (!disabled && !isProcessing) {
			return (
				<button type="button" className={colorClass} onClick={() => (onClick ? onClick() : "")}>
					{icon}
					Cancel
				</button>
			);
		} else {
			return (
				<button type="button" className={colorClass} disabled>
					{icon}
					{getRequestStatus(classRequest.requestStatus)}
				</button>
			);
		}
	};

	const getRequestStatus = (status: number | null | undefined) => {
		if (!status) {
			return "None";
		}
		switch (status) {
			case 1:
				return "New";
			case 2:
				return "Approved";
			case 3:
				return "Scheduled";
			case 4:
				return "Cancelled";
		}
	};

	return (
		<div className="col-lg-12 pb-12">
			<SortableTableContainer
				allData={classRequests.map((d: ClassRequestEntity) => {
					let r: any[] = [];
					r.push(d.trainingTopic?.name ?? d.trainingTopicId);
					r.push(d.dateTime ? dayjs(d.dateTime).format("lll") : "No date provided");
					r.push(getRequestStatus(d.requestStatus));
					r.push(buildActionButton(d));
					return r;
				})}
				columns={ClassRequestColumns}
				defaultSort="dateTime"
			/>
		</div>
	);
};

export default TrainingCourseRequests;
