import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentContainer from "../../components/content/ContentContainer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { IAudienceMember, IListing, IResponse, ReportReasonEntityProperties } from "./interfaces";
import styles from "./create-report.module.css";
import dayjs from "dayjs";

import SelectCheck from "../../components/widgets/forms/SelectCheck";
import "react-bootstrap-typeahead/css/Typeahead.css";
import MemberAutoComplete from "../../components/widgets/autoComplete/MemberAutoComplete";
import { compliance_url, crib_url, getMemberByLoginId } from "../../adapters";
import { useAppDispatch } from "../../app/hooks";
import { show } from "../notification/notificationSlice";
import { ListBox } from "@syncfusion/ej2-dropdowns";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import { classNames } from "../../util/helpers";
import { RequiredIndicator } from "../registeredListing/RegisteredListingForm";
import Loader from "../../components/widgets/Loader";
import { BeatLoader, ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { user } from "../user/selectors";

enum SearchType {
	Listing = "Listings",
	Member = "Members",
}
const moneyFormat = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0, // rounds up
});
const shortDate = (value: string) => {
	return dayjs(value).format("MM/DD/YYYY");
};

const formatDate = (value: string | Date) => {
	return dayjs(value).format("MM/DD/YYYY");
};

interface ValueDisplayProps {
	title: string;
	value: any; // Using any to allow for any type of value
}

const ValueDisplay: React.FC<ValueDisplayProps> = ({ title, value }) => {
	return (
		<div>
			{title}: {value !== null ? value : "Unknown"}
		</div>
	);
};

const CreateReport = () => {
	let { listingId } = useParams<{
		listingId: string;
	}>();
	const [listingSearchValue, setListingSearchValue] = useState("");
	const [description, setDescription] = useState("");
	const [reasonId, setReasonId] = useState("");
	const [memberId, setMemberId] = useState("");
	const [searchType, setSearchType] = useState<SearchType>(SearchType.Listing);
	const [reasons, setReasons] = useState<ReportReasonEntityProperties[]>([]);
	const [selectedMember, setSelectedMember] = useState<IAudienceMember>();
	const [selectedListing, setSelectedListing] = useState<IListing>();
	const [isSending, setIsSending] = useState(false);
	const [loadingListing, setLoadingListing] = useState(false);
	const [showForm, setShowForm] = useState(true);
	const [cancelToken, setCancelToken] = useState(undefined as any);
	const [selectedReason, setSelectedReason] = useState({ reasonText: "Select a reason" } as any);
	const currentUser = useSelector(user);
	const [isExpanded, setIsExpanded] = useState(false);
	const toggleExpand = () => setIsExpanded(!isExpanded);
	const dispatch = useAppDispatch();

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

	useEffect(() => {
		getReasons();
		if (listingId) {
			setListingSearchValue(listingId);
			getListing(listingId);
		}
	}, []);

	const getReasons = () => {
		axios
			.post<IResponse<ReportReasonEntityProperties>>(`${compliance_url}ReportReasons/MemberHubReportReason/q`, {
				pageId: 0,
				pageSize: 50,
				criteria: [],
				orderBy: [],
				fields: [],
			})
			.then((response) => {
				setReasons(response.data.results);
			})
			.catch((e) => {});
	};

	const getListing = (id: string) => {
		setLoadingListing(true);
		if (typeof cancelToken != typeof undefined) {
			cancelToken.cancel("Operation canceled due to new request.");
		}
		const newToken = axios.CancelToken.source();
		setCancelToken(newToken);
		axios
			.get<IResponse<IListing>>(`${crib_url}${id}?include=media`, {
				cancelToken: newToken.token,
			})
			.then((response) => {
				setLoadingListing(false);
				setSelectedListing(response.data.results[0]);
			})
			.catch((error) => {
				if (axios.isCancel(error)) {
					console.log("Request canceled", error.message);
				} else {
					setLoadingListing(false);
				}
			});
	};

	const listingSearch = (search: string) => {
		if (searchType === SearchType.Listing) {
			getListing(search);
		}
	};

	const onMemberSelection = (id: string, value: string) => {
		setSelectedMember(undefined);

		if (value) {
			getMemberByLoginId(value).then((resp) => {
				if (resp?.data?.results?.length) {
					setSelectedMember({ ...resp?.data?.results[0], contactJObject: JSON.parse(resp?.data?.results[0].contactJObject) });
					setMemberId(resp?.data?.results[0]?.contactId);
				}
			});
		}
		return {};
	};

	const sendReport = () => {
		setIsSending(true);
		const payload = {
			reportReasonId: reasonId,
			listingId: selectedListing?.listingId,
			memberId: memberId.length ? memberId : undefined,
			text: description,
			reportingParty: currentUser.profile.memberFirstName + " " + currentUser.profile.memberLastName,
		};

		axios
			.post(`${compliance_url}Reports/CreateReport`, payload)
			.then(() => {
				setIsSending(false);
				displayToast("success", "Success", "Report created successfully");
				setShowForm(false);
			})
			.catch(() => {
				setIsSending(false);
				displayToast("error", "Error", "There was a problem creating your report");
			});
	};

	const isValid = () => {
		if (!description.length || !reasonId.length) {
			return false;
		}

		if ((searchType === SearchType.Listing && !selectedListing) || (searchType === SearchType.Member && !memberId.length)) {
			return false;
		}

		return true;
	};

	const resetForm = () => {
		setDescription("");
		setSearchType(SearchType.Listing);
		setReasonId("");
		setShowForm(true);
		setSelectedReason(undefined);
		setSelectedListing(undefined);
		setListingSearchValue("");
		setSelectedMember(undefined);
	};

	const handleChange = (event: any) => {
		let sel = reasons.find((option) => option.id === event);
		if (sel) {
			setSelectedReason(sel);
			setReasonId(sel.id);
		}
	};

	const renderContent = () => {
		const remarks = selectedListing?.publicRemarks;
		if (remarks && remarks.length > 100 && !isExpanded) {
			return (
				<>
					{remarks?.substring(0, 100)}...
					<button onClick={toggleExpand} className="text-blue-500 ml-1">
						Read More
					</button>
				</>
			);
		}
		return (
			<>
				{remarks}
				{remarks && remarks?.length > 200 && (
					<button onClick={toggleExpand} className="text-blue-500 ml-1">
						Show Less
					</button>
				)}
			</>
		);
	};
	const form = (
		<>
			<ContentContainer title="Create a Compliance Report" subTitle="" actions={null} cssClass="crmls-articles">
				<div className={`max-w-full text-sm text-primary p-4 sm:p-6 ${styles.main_container}`}>
					<div className="grid grid-cols-1 sm:grid-cols-12 gap-0 sm:gap-4">
						<div className="col-span-6">
							<label className="block text-sm font-medium text-gray-700 text-primary">Search by Listing or Member{RequiredIndicator}</label>
							<div className="grid grid-cols-12 relative mt-1 rounded-md shadow-sm mb-5">
								<div className={`basic-form-field-listbox col-span-4 ${styles.report_toggle}`}>
									<SelectCheck
										id="topic"
										label=""
										value={"Test"}
										options={[
											{ id: SearchType.Listing, name: "Listing ID" },
											{ id: SearchType.Member, name: "Member" },
										]}
										showDefault={true}
										changeHandler={(value: SearchType) => {
											setSearchType(value);
											setListingSearchValue("");
											setSelectedListing(undefined);
											setSelectedMember(undefined);
											setMemberId("");
											if (value === SearchType.Member) {
												setSelectedListing(undefined);
											}
										}}
									/>
								</div>
								<div className="col-span-8">
									{searchType === SearchType.Listing ? (
										<>
											{" "}
											<input
												type="text"
												value={listingSearchValue}
												onChange={(e) => {
													setSelectedListing(undefined);
													setListingSearchValue(e.target.value);
													listingSearch(e.target.value);
												}}
												className={`basic-form-field`}
												placeholder={"Enter a listing id"}
											/>
											<span
												style={{
													position: "absolute",
													right: "7px",
													top: "12px",
												}}
											>
												{loadingListing && <BeatLoader color={"#adadad"} size="5" />}
											</span>
										</>
									) : (
										<MemberAutoComplete
											handleChange={() => {
												return {};
											}}
											handleBlur={() => {
												return {};
											}}
											errors={{}}
											touched={{}}
											n={{}}
											values={[]}
											setFieldValue={onMemberSelection}
											defaultContainerStyle={false}
										/>
									)}
								</div>
							</div>
						</div>
						<div className="col-span-6">
							<label className="block text-sm font-medium text-gray-700 text-primary">Report Reason{RequiredIndicator}</label>

							<div className="relative mt-1 rounded-md shadow-sm mb-5">
								<Listbox value={selectedReason} onChange={handleChange}>
									{({ open }) => (
										<>
											<div className="mt-1 relative">
												<span className="basic-form-field-listbox">
													<Listbox.Button className="bg-secondary text-secondary relative w-full border border-default rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
														<span className="block truncate">{selectedReason?.reasonText}</span>
														<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
															<SelectorIcon className="h-5 w-5" aria-hidden="true" />
														</span>
													</Listbox.Button>
												</span>

												<Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
													<Listbox.Options className="absolute z-10 mt-1 w-full bg-secondary text-secondary shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
														{Object.values(
															reasons.reduce((acc: any, obj: any) => {
																const key = obj.reportReasonCategory?.displayText;

																if (!acc[key]) {
																	acc[key] = {
																		groupTitle: key,
																		reasons: [],
																	};
																}

																acc[key].reasons.push(obj);

																return acc;
															}, {})
														).map((item: any, i) => {
															return (
																<span key={i}>
																	<Listbox.Label>
																		<span className={"ml-2 font-bold"}>{item.groupTitle}</span>
																	</Listbox.Label>
																	{item.reasons.map((reason: any) => (
																		<Listbox.Option key={reason.id} value={reason.id} className={({ active }) => classNames(active ? "text-primary bg-primary" : "text-secondary", "cursor-default select-none relative py-2 pl-3 pr-9")}>
																			{reason.reasonText}
																		</Listbox.Option>
																	))}
																</span>
															);
														})}
													</Listbox.Options>
												</Transition>
											</div>
										</>
									)}
								</Listbox>
							</div>
						</div>
					</div>
					{selectedMember && (
						<>
							<div className="grid grid-cols-3 col-span-9 gap-4 mb-10">
								<div>
									<div className="font-bold text-primary">Member</div>
									<ValueDisplay title="Name" value={`${selectedMember?.firstName} ${selectedMember?.lastName}`} />
									<ValueDisplay title="Phone" value={selectedMember?.contactJObject?.Phones?.length ? selectedMember?.contactJObject?.Phones[0].Phone : null} />
									<ValueDisplay title="Email" value={selectedMember?.emailAddress} />
									<ValueDisplay title="Application" value={selectedMember?.applicationName} />
									<ValueDisplay title="Login ID" value={selectedMember?.loginId} />
									<ValueDisplay title="User Class" value={selectedMember?.memberTypeName} />
								</div>
								<div>
									<div className="font-bold text-primary">Office</div>
									<ValueDisplay title="Name" value={selectedMember?.contactJObject?.ContactOffices?.length ? selectedMember?.contactJObject?.ContactOffices[0].Office?.Name : null} />
									<ValueDisplay title="Phone" value={selectedMember?.contactJObject?.ContactOffices[0].Office?.Phone} />
									<ValueDisplay title="Address" value={selectedMember?.contactJObject?.ContactOffices[0].Office?.Address1} />
									<ValueDisplay title="Code" value={selectedMember?.contactJObject?.ContactOffices[0].Office?.OfficeCode} />
								</div>

								<div>
									<div className="font-bold text-primary">Aor</div>
									<ValueDisplay title="Name" value={selectedMember?.aorName} />
									<ValueDisplay title="Phone" value={selectedMember?.contactJObject?.ContactAors?.length ? selectedMember?.contactJObject?.ContactAors[0].Aor?.Phone : null} />
									<ValueDisplay title="Address" value={selectedMember?.contactJObject?.ContactAors?.length ? selectedMember?.contactJObject?.ContactAors[0].Aor?.Address1 : null} />
								</div>
							</div>
						</>
					)}

					{selectedListing && !loadingListing ? (
						<div className="mb-5">
							<label className="block text-sm font-bold text-gray-700 text-primary">Listing Found</label>

							<div className="grid grid-cols-12 gap-4 mt-1">
								<div className={`col-span-3 ${styles.carousel_container}`}>
									<div className={styles.image_loading}>{selectedListing?.media?.filter((media) => media.mediaType === "IMAGE").length ? "Loading Images" : "No Images"}</div>
									<Carousel dynamicHeight={false} className={styles.carousel}>
										{selectedListing
											? selectedListing?.media
													?.filter((media) => media.mediaType === "IMAGE")
													.map((media, i) => (
														<div key={i}>
															<img src={media.mediaURL} />
														</div>
													))
											: undefined}
									</Carousel>
								</div>
								<div className="grid grid-cols-2 col-span-9 gap-4">
									<div>
										<div>
											Listing #:{" "}
											<a style={{ color: "#0084ff" }} target="_blank" href={`http://matrix.crmls.org/Matrix/Link?id=${selectedListing.listingId}`} rel="noreferrer">
												{selectedListing.listingId}
											</a>
										</div>
										<div>
											Address:
											{`${selectedListing.streetNumberNumeric ? selectedListing.streetNumberNumeric : ""} 
											${selectedListing.streetName ? selectedListing.streetName : ""} 
											${selectedListing.streetSuffix ? selectedListing.streetSuffix : ""}, 
											${selectedListing.city ? selectedListing.city : ""}, 
											${selectedListing.stateOrProvince ? selectedListing.stateOrProvince : ""}, 
											${selectedListing.postalCode ? selectedListing.postalCode : ""}`}
										</div>
										<div>
											<ValueDisplay title="List Price" value={moneyFormat.format(selectedListing.listPrice)} />
											<ValueDisplay title="Status" value={selectedListing.standardStatus} />
											<ValueDisplay title="Source" value={selectedListing.sourceSystemID} />
											<ValueDisplay title="List Contract Date" value={shortDate(selectedListing.listingContractDate)} />
											<ValueDisplay title="Purchase Contract Date" value={formatDate(selectedListing.purchaseContractDate)} />
											<ValueDisplay title="Closed Date" value={selectedListing.closeDate ? formatDate(selectedListing.closeDate) : null} />
										</div>
									</div>
									<div>
										<ValueDisplay title="Prop Type" value={selectedListing.propertyType} />
										<ValueDisplay title="Prop Sub Type" value={selectedListing.propertySubType} />
										<ValueDisplay title="Entry Date" value={formatDate(selectedListing.onMarketTimestamp)} />
										<ValueDisplay title="On Market Date" value={formatDate(selectedListing.onMarketDate)} />
										<ValueDisplay title="Days on market" value={selectedListing.daysOnMarket} />
										<ValueDisplay title="Mod Date" value={formatDate(selectedListing.modificationTimestamp)} />{" "}
									</div>
									<div className="col-span-2">
										<div>Public Remarks: {renderContent()}</div>
									</div>
								</div>
							</div>
						</div>
					) : searchType === SearchType.Listing && listingSearchValue.length && !loadingListing ? (
						<div className="mb-5">No listing found</div>
					) : undefined}

					<div>
						<label className="block text-sm font-medium text-gray-700 text-primary">Report Description{RequiredIndicator}</label>
						<div className="relative mt-1 rounded-md shadow-sm mb-5">
							<textarea
								value={description}
								onChange={(e) => {
									setDescription(e.target.value);
								}}
								className={`basic-form-field`}
								placeholder="Enter a report description"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className={`${!isValid() ? styles.disabled : styles.enabled} ${
								styles.submit_button
							} basic-form-field float-right inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-inverse bg-header hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:cursor-not-allowed`}
							onClick={() => sendReport()}
							disabled={!isValid() || isSending}
						>
							{isSending ? "Sending..." : "Send Report"}
						</button>
					</div>
				</div>
			</ContentContainer>
		</>
	);

	const success = (
		<>
			<ContentContainer title="Create a Compliance Report" subTitle="" cssClass="crmls-articles">
				<div className={`max-w-full text-sm text-primary p-4 sm:p-6 ${styles.main_container} justify-center`}>
					Success! Your report has been created. An analyst will review your report.
					<br />
					<button className={` mt-4 py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-inverse bg-header hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:cursor-not-allowed`} onClick={() => resetForm()}>
						Create Another Report
					</button>
				</div>
			</ContentContainer>
		</>
	);

	return showForm ? form : success;
};

export default CreateReport;
