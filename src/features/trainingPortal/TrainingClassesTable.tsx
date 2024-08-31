import React from "react";
import { TrainingClassEntity } from "./trainingTypes";
import TrainingRegButtons from "./TrainingRegButtons";
import SortableTableContainer from "../../components/widgets/sortableTable/SortableTableContainer";
import { columnType } from "../../components/widgets/sortableTable/SortableTable";
import { Link } from "react-router-dom";

const TrainingColumns: columnType[] = [
	{
		field: "className",
		label: "Name",
		sortable: true,
		justify: "center",
		hideMobile: true,
	},
	{
		field: "instructorId",
		label: "Trainer",
		sortable: false,
		justify: "center",
		hideMobile: true,
	},
	{
		field: "startTime",
		label: "Class Start",
		sortable: true,
		formatAs: "datetime",
		justify: "center",
		hideMobile: true,
	},
	{
		field: "endTime",
		label: "Class End",
		sortable: true,
		formatAs: "datetime",
		justify: "center",
		hideMobile: true,
	},
	{
		field: "seatsAvailable",
		label: "Seats Available",
		sortable: true,
		justify: "center",
	},
	{
		field: "locationId",
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

const TrainingClassesTable = ({ trainingClasses }: { trainingClasses: TrainingClassEntity[] }) => {
	return (
		<div className="col-lg-12 pb-12">
			<SortableTableContainer
				allData={trainingClasses.map((d: TrainingClassEntity) => {
					let r: any[] = [];
					r.push(
						<Link to={`/training/registration/${d.id}`} className="crmls-link">
							{d.className ?? "Class Name Not Defined"}
						</Link>
					);
					r.push(d.instructor ? d.instructor.name : "CRMLS Trainer");
					r.push(d.startTime);
					r.push(d.endTime);
					r.push(d.capacity);
					r.push(d.location ? d.location.name : "TBD");
					r.push(<TrainingRegButtons classId={d.id} seatsLeft={d.seatsAvailable} />);
					return r;
				})}
				columns={TrainingColumns}
				defaultSort="classDate"
			/>
		</div>
	);
};

export default TrainingClassesTable;
