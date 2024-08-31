import React from "react";
import { AttendeeEntity } from "./trainingTypes";
import TrainingRegButtons from "./TrainingRegButtons";
import SortableTableContainer from "../../components/widgets/sortableTable/SortableTableContainer";
import { columnType } from "../../components/widgets/sortableTable/SortableTable";
import { Link } from "react-router-dom";

const AttendeeEntityColumns: columnType[] = [
	{
		field: "trainingClass.className",
		label: "Class Name",
		sortable: true,
		justify: "center",
		hideMobile: true,
	},
	{
		field: "trainingClass.instructor.name",
		label: "Trainer",
		sortable: false,
		justify: "center",
		hideMobile: true,
	},
	{
		field: "trainingClass.startTime",
		label: "Class Start",
		sortable: true,
		formatAs: "datetime",
		justify: "center",
		hideMobile: true,
	},
	{
		field: "trainingClass.endTime",
		label: "Class End",
		sortable: true,
		formatAs: "datetime",
		justify: "center",
		hideMobile: true,
	},
	{
		field: "location.locationName",
		label: "Location",
		sortable: true,
		justify: "center",
	},
	{
		field: "actions",
		label: "Actions",
		sortable: false,
		justify: "center",
	},
];

const TrainingHistoryTable = ({ trainingClassesAttended }: { trainingClassesAttended: AttendeeEntity[] }) => {
	return (
		<div className="col-lg-12 pb-12">
			<SortableTableContainer
				allData={trainingClassesAttended.map((d: AttendeeEntity) => {
					let r: any[] = [];
					r.push(
						<Link to={`/training/registration/${d.trainingClass?.id}`} className="crmls-link">
							{d.trainingClass?.className ?? "Class Name Not Defined"}
						</Link>
					);
					r.push(d.trainingClass?.instructor ? d.trainingClass.instructor.name : "CRMLS Trainer");
					r.push(d.trainingClass?.startTime ?? "");
					r.push(d.trainingClass?.endTime ?? "");
					r.push(d.trainingClass?.location ? d.trainingClass.location.name : "Unknown");
					r.push(<TrainingRegButtons classId={d.trainingClass?.id ?? ""} seatsLeft={d.trainingClass?.seatsAvailable} />);
					return r;
				})}
				columns={AttendeeEntityColumns}
				defaultSort="classDate"
				// selector={}
			/>
		</div>
	);
};

export default TrainingHistoryTable;
