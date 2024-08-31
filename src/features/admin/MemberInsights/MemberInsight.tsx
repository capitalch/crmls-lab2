import { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import dayjs from "dayjs";
import { getTicket } from "../../../adapters";
import { useParams } from "react-router";
import { TableLoader } from "../../../components/widgets/SkeletonScreens";

enum WorkItemTypes {
	TextFieldType = "TextFieldType",
	TimeFieldType = "TimeFieldType",
	PhoneFieldType = "PhoneFieldType",
	IntegerFieldType = "IntegerFieldType",
	FloatFieldType = "FloatFieldType",

	CurrencyFieldType = "CurrencyFieldType",
	DateFieldType = "DateFieldType",
	TextAreaFieldType = "TextAreaFieldType",
	AttachmentFieldType = "AttachmentFieldType",
	RichTextType = "RichTextType",
	BooleanFieldType = "BooleanFieldType",
	RichTextFieldType = "RichTextFieldType",
	EmailFieldType = "EmailFieldType",
	DateTimeFieldType = "DateTimeFieldType",
}

const textFields = [WorkItemTypes.TextFieldType, WorkItemTypes.TextFieldType, WorkItemTypes.TimeFieldType, WorkItemTypes.PhoneFieldType, WorkItemTypes.IntegerFieldType, WorkItemTypes.FloatFieldType];

interface IWorkItem {
	createdOn: string;
	title: string;
	itemShortCode: string;
	categories: {
		title: string;
		fields: {
			type: WorkItemTypes;
			displayValue: string;
			value: string | null | boolean | string[] | undefined;
		}[];
	}[];
}

export type RouteParam = {
	insightId: string;
};

const FieldLabel = ({ label }: { label: string }) => {
	return <div className="font-light">{label}</div>;
};

const MemberInsight = (props: any) => {
	const [workItem, setWorkItem] = useState<IWorkItem>();
	const [isLoading, setIsLoading] = useState(true);
	let { insightId } = useParams<RouteParam>();
	const gridColumns = 5;

	useEffect(() => {
		if (props.id || insightId) {
			getTicket(props.id ? props.id : insightId).then((response: any) => {
				setWorkItem(response.data);
				setIsLoading(false);
			});
		}
	}, [insightId, props.id]);

	return isLoading ? (
		<TableLoader />
	) : (
		<div className="ml-5 mt-5">
			<h3 className="font-medium text-2xl">
				{workItem?.itemShortCode} {workItem?.title}
			</h3>

			<div className="font-light mb-5">Created {dayjs(workItem?.createdOn).format("hh:mm A, MM/DD/YYYY")}</div>
			<div className="" style={{ width: "100%", borderBottom: "1px solid #d8d8d8" }}></div>

			{workItem?.categories.map((section: any, idx: number) => {
				if (section.fields.filter((field: any) => field.displayValue != null).length > 0) {
					return (
						<div key={idx}>
							<h3 className="font-medium text-xl mb-2 mt-5">{section.name}</h3>
							<div className={`grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-${gridColumns} gap-4`}>
								{section.fields.map((field: any, i: number) => {
									if (field.displayValue !== null) {
										if (textFields.includes(field.fieldType)) {
											return (
												<div className="" key={i}>
													<FieldLabel label={field.label} />
													<div>{field.displayValue}</div>
												</div>
											);
										}
										if (field.fieldType === WorkItemTypes.CurrencyFieldType) {
											return (
												<div className="" key={i}>
													<FieldLabel label={field.label} />
													<div>${Number(field.displayValue).toLocaleString("en")}</div>
												</div>
											);
										} else if (field.fieldType === WorkItemTypes.DateTimeFieldType) {
											return (
												<div className="" key={i}>
													<FieldLabel label={field.label} />
													<div>{dayjs(field.displayValue).format("hh:mm A, MM/DD/YYYY")}</div>
												</div>
											);
										} else if (field.fieldType === WorkItemTypes.EmailFieldType) {
											return (
												<div className="" key={i}>
													<FieldLabel label={field.label} />
													<div>
														<a style={{ color: "#00549a" }} href={`mailTo:${field.displayValue}`}>
															{field.displayValue}
														</a>
													</div>
												</div>
											);
										} else if (field.fieldType === WorkItemTypes.DateFieldType) {
											return (
												<div className="" key={i}>
													<FieldLabel label={field.label} />
													<div>{dayjs(field.displayValue).format("MM/DD/YYYY")}</div>
												</div>
											);
										} else if (field.fieldType === WorkItemTypes.TextAreaFieldType) {
											return (
												<div className={`col-span-${gridColumns}`} key={i}>
													<FieldLabel label={field.label} />
													<div>{field.displayValue}</div>
												</div>
											);
										} else if (field.fieldType === WorkItemTypes.RichTextType || field.fieldType === WorkItemTypes.RichTextFieldType) {
											return (
												<div className={`col-span-${gridColumns}`} key={i}>
													<FieldLabel label={field.label} />
													<div dangerouslySetInnerHTML={{ __html: field.displayValue }} />
												</div>
											);
										} else if (field.fieldType === WorkItemTypes.BooleanFieldType) {
											return (
												<div className="" key={i}>
													<FieldLabel label={field.label} />
													<div>{field.displayValue === true ? <CheckCircleIcon className="h-6 w-6 text-green-500" /> : <XCircleIcon className="h-6 w-6 text-red-500" />}</div>
												</div>
											);
										} else if (field.fieldType === WorkItemTypes.AttachmentFieldType) {
											return (
												<div className={`col-span-${gridColumns}`} key={i}>
													<FieldLabel label={field.label} />
													<div>
														{Array.isArray(field.displayValue) &&
															field.displayValue?.map((attachment: string) => {
																return (
																	<a style={{ color: "#00549a" }} href={attachment}>
																		{attachment}
																	</a>
																);
															})}
													</div>
												</div>
											);
										} else {
											return (
												<div className="" key={i}>
													<FieldLabel label={field.label} />
													<div>{field.displayValue}</div>
												</div>
											);
										}
									}
									return false;
								})}
							</div>
						</div>
					);
				}
			})}
		</div>
	);
};

export default MemberInsight;
