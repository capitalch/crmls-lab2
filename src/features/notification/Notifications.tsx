import React, { useState, useEffect } from "react";
import ContentContainer, { containerProps } from "../../components/content/ContentContainer";
import { InboxLoader } from "../../components/widgets/SkeletonScreens";
import ErrorMessage from "../../components/widgets/ErrorMessage";
import { classNames } from "../../util/helpers";
import { useHistory } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon, EyeOffIcon, RefreshIcon, ReplyIcon, SearchCircleIcon, TrashIcon, ViewListIcon } from "@heroicons/react/solid";
import { mace_url, post } from "../../adapters";
import { useAppDispatch } from "../../app/hooks";
import dayjs from "dayjs";

import { EmailRequestEntity, NotificationCategoryEntity, NotificationFilterEntity } from "./notificationTypes";
import { fetchAllNotifications, selectAllNotifications } from "./notificationsSlice";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { setUserPrefs } from "../../features/user/userPrefsSlice";
import { selectReadNotifications, selectArchivedNotifications, userProfile } from "../user/selectors";
import SlidePanel from "../../components/content/SlidePanel";
import { hideSlider, showSlider } from "../dashboard/sideSliderSlice";

const Notifications = () => {
	const dispatch = useAppDispatch();
	const profile = useSelector(userProfile);
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<any>();
	const [notifications, setNotifications] = useState<EmailRequestEntity[]>([]);
	const [notificationCategories, setNotificationCategories] = useState<NotificationCategoryEntity[]>([]);
	const [activeNotification, setActiveNotification] = useState<EmailRequestEntity>();
	const [notificationIndex, setNotificationIndex] = useState<number>(0);
	const [notificationFilters, setNotificationFilters] = useState<NotificationFilterEntity>();
	const [offset, setOffset] = useState(0);
	const [perPage] = useState(10);
	const [pageCount, setPageCount] = useState(0);
	const [filteredTotal, setFilteredTotal] = useState<number>();
	const allNotifications = useSelector(selectAllNotifications);
	const readNotifications = useSelector(selectReadNotifications);
	const archivedNotifications = useSelector(selectArchivedNotifications);
	const [processing, setProcessing] = useState(0);
	const [selectedNotifications, setSelectedNotifications] = useState<any[]>([]);
	const [bulkAction, setBulkAction] = useState<string>();
	const [selectAll, setSelectAll] = useState<boolean>(false);

	useEffect(() => {
		if (profile && profile.member?.id) {
			// Get notification categories to populate dropdown
			post(`${mace_url}api/app/campaignType/q`, { pageId: 0, pageSize: 1000, orderBy: [{ field: "name", direction: 0 }] })
				.then((response) => {
					// Get notifications and repopulate redux state
					dispatch(fetchAllNotifications(profile.member.id));
					setNotificationCategories(response.data.results);
				})
				.catch((e) => {
					setError(e);
				})
				.then(() => {
					setIsLoading(false);
				});
		}
	}, [profile]);

	useEffect(() => {
		if (allNotifications.length) {
			getFilteredNotifications();
		}
	}, [allNotifications, notificationFilters, offset, readNotifications, archivedNotifications]);

	const getFilteredNotifications = () => {
		let notificationsList = [...allNotifications];

		if (notificationFilters?.category) notificationsList = notificationsList.filter((notification) => notification.emailCategory === notificationFilters.category);
		if (notificationFilters?.isRead) {
			if (notificationFilters.isRead === "read") {
				notificationsList = notificationsList.filter((notification) => readNotifications.includes(notification.id) && !archivedNotifications.includes(notification.id));
			} else if (notificationFilters.isRead === "unread") {
				notificationsList = notificationsList.filter((notification) => !readNotifications.includes(notification.id) && !archivedNotifications.includes(notification.id));
			} else if (notificationFilters.isRead === "archived") {
				notificationsList = notificationsList.filter((notification) => archivedNotifications.includes(notification.id));
			}
		} else {
			notificationsList = notificationsList.filter((notification) => !archivedNotifications.includes(notification.id));
		}
		if (notificationFilters?.search) {
			let foundMatch = [];
			["subject"].forEach((key, index) => {
				if (foundMatch.length === 0) {
					foundMatch = notificationsList.filter((o) => o[key] && o[key].toLowerCase().includes(notificationFilters.search ? notificationFilters.search.toLowerCase() : ""));
					notificationsList = foundMatch;
				}
			});
		}
		if (notificationsList.length) {
			const query = new URLSearchParams(window.location.search);
			const queryNotification = query.get("id");

			if (queryNotification) {
				let foundNotification = notificationsList.find((notification: EmailRequestEntity) => notification.id === queryNotification);
				handleActiveNotification(foundNotification || notificationsList[0]);
			} else {
				handleActiveNotification(notificationsList[0]);
			}
		}

		setPageCount(Math.ceil(notificationsList.length / perPage));
		setFilteredTotal(notificationsList.length);
		notificationsList.sort((a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn));

		const filteredNotifications = notificationsList.slice(offset, offset + perPage);
		setNotifications(filteredNotifications);
		setIsLoading(false);

		// workaround to re-render list view if filters are set but not enough items for pagination
		// @note: may need to rework this once we have more data to test with
		if (offset === 0) {
			setProcessing(Math.random());
		}
	};

	const handleRefresh = () => {
		setNotificationFilters({ category: null, isRead: null, search: null });
		resetPagination();
	};

	const resetPagination = () => {
		if (filteredTotal) {
			setOffset((0 * perPage) % filteredTotal);
		}
	};

	const handlePageClick = (e: any) => {
		const selectedPage = e.selected;
		if (filteredTotal) {
			setOffset((selectedPage * perPage) % filteredTotal);
		}
	};

	const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setNotificationFilters({ ...notificationFilters, category: event.target.value ? event.target.value : null });
		resetPagination();
	};

	const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setNotificationFilters({ ...notificationFilters, isRead: event.target.value ? event.target.value : null });
		resetPagination();
	};

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNotificationFilters({ ...notificationFilters, search: event.target.value ? event.target.value : null });
		resetPagination();
	};

	const handleMarkAsRead = (notification: EmailRequestEntity) => {
		let selectedNotification = notification ?? activeNotification;
		if (selectedNotification && !readNotifications.find((notification: string) => notification === selectedNotification.id)) {
			const newReadNotifications = [...readNotifications, selectedNotification.id];
			dispatch(
				setUserPrefs({
					key: "notifications.read",
					value: newReadNotifications,
				})
			);
		}
	};

	const handleMarkAsUnread = () => {
		if (activeNotification) {
			const index = readNotifications.indexOf(activeNotification.id);
			if (index !== -1) {
				const newReadNotifications = [...readNotifications].filter((notification) => notification !== activeNotification.id);
				dispatch(
					setUserPrefs({
						key: "notifications.read",
						value: newReadNotifications,
					})
				);
			}
		}
	};

	const handleArchiveNotification = () => {
		if (activeNotification) {
			if (window.confirm("Are you sure you wish to archive this notification?")) {
				const newArchivedNotifications = [...archivedNotifications, activeNotification.id];
				dispatch(
					setUserPrefs({
						key: "notifications.archived",
						value: newArchivedNotifications,
					})
				);
			}
			handleMarkAsRead(activeNotification);
		}
	};

	const handleUnArchiveNotification = () => {
		if (activeNotification) {
			const newArchivedNotifications = [...archivedNotifications].filter((notification) => notification !== activeNotification.id);
			dispatch(
				setUserPrefs({
					key: "notifications.archived",
					value: newArchivedNotifications,
				})
			);
			handleMarkAsUnread();
		}
	};

	const handleScrollNotification = (direction: string) => {
		let currentIndex = 0;
		if (activeNotification) {
			currentIndex = notifications.findIndex((notification) => notification.id === activeNotification.id);
		}
		let newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
		if (notifications[newIndex]) {
			handleActiveNotification(notifications[newIndex]);
		}
	};

	const handleActiveNotification = (notification: EmailRequestEntity, closeSidebar?: boolean, markAsRead?: boolean) => {
		let notificationIndex = notifications.findIndex((n) => n.id === notification.id);
		history.push("?id=" + notification.id);

		setNotificationIndex(notificationIndex);
		setActiveNotification(notification);
		if (closeSidebar) {
			dispatch(hideSlider());
		}
		if (markAsRead) {
			handleMarkAsRead(notification);
		}
	};

	const openSideSlider = () => {
		dispatch(showSlider());
	};

	// Bulk Actions
	useEffect(() => {
		if (selectAll) {
			setSelectedNotifications(allNotifications.map((notification) => notification.id));
		} else {
			setSelectedNotifications([]);
		}
	}, [selectAll]);

	const handleSelectClick = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setSelectedNotifications([...selectedNotifications, e.target.value]);
		} else {
			setSelectedNotifications(selectedNotifications.filter((notification) => notification !== e.target.value));
		}
	};

	const bulkActions = ["Mark as Read", "Mark as Unread", "Archive", "Unarchive"];
	const changeBulkAction = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setBulkAction(e.target.value);
	};

	const executeBulkAction = () => {
		// console.log(`Execute bulk action - ${bulkAction}`, selectedNotifications);
		let newReadNotifications: any[], newArchivedNotifications: any[];
		switch (bulkAction) {
			case "Mark as Read":
				const unread: string[] = [];
				selectedNotifications.forEach((notification) => {
					let selectedNotification = allNotifications.find((n) => n.id === notification);
					if (selectedNotification && !readNotifications.find((notification: string) => notification === selectedNotification.id)) {
						unread.push(selectedNotification.id);
					}
				});
				newReadNotifications = [...readNotifications, ...unread];
				// console.log("Mark as Read", newReadNotifications)
				dispatch(
					setUserPrefs({
						key: "notifications.read",
						value: newReadNotifications,
					})
				);
				break;
			case "Mark as Unread":
				newReadNotifications = [...readNotifications];
				selectedNotifications.forEach((notification) => {
					let selectedNotification = allNotifications.find((n) => n.id === notification);
					if (selectedNotification && readNotifications.find((notification: string) => notification === selectedNotification.id)) {
						const index = readNotifications.indexOf(selectedNotification.id);
						if (index !== -1) {
							newReadNotifications = [...newReadNotifications].filter((notification) => notification !== selectedNotification.id);
						}
					}
				});
				// console.log("Mark as Unread", newReadNotifications)
				dispatch(
					setUserPrefs({
						key: "notifications.read",
						value: newReadNotifications,
					})
				);
				break;
			case "Archive":
				const unarchived: string[] = [];
				selectedNotifications.forEach((notification) => {
					let selectedNotification = allNotifications.find((n) => n.id === notification);
					if (selectedNotification && !archivedNotifications.find((notification: string) => notification === selectedNotification.id)) {
						unarchived.push(selectedNotification.id);
					}
				});
				newArchivedNotifications = [...archivedNotifications, ...unarchived];
				// console.log("Mark as Archived", newArchivedNotifications)
				dispatch(
					setUserPrefs({
						key: "notifications.archived",
						value: newArchivedNotifications,
					})
				);
				break;
			case "Unarchive":
				newArchivedNotifications = [...archivedNotifications];
				selectedNotifications.forEach((notification) => {
					let selectedNotification = allNotifications.find((n) => n.id === notification);
					if (selectedNotification && archivedNotifications.find((notification: string) => notification === selectedNotification.id)) {
						const index = archivedNotifications.indexOf(selectedNotification.id);
						if (index !== -1) {
							newArchivedNotifications = [...newArchivedNotifications].filter((notification) => notification !== selectedNotification.id);
						}
					}
				});
				// console.log("Mark as Unarchived", newArchivedNotifications)
				dispatch(
					setUserPrefs({
						key: "notifications.archived",
						value: newArchivedNotifications,
					})
				);
				break;
		}
		setBulkAction("");
		setSelectedNotifications([]);
		setSelectAll(false);
	};

	const getNotificationsList = () => {
		return (
			<div className="h-full w-full relative flex flex-col">
				<div className="flex-shrink-0">
					<div className="grid grid-cols-1 sm:grid-cols-8 gap-3 px-2 py-3 border-default">
						<div className="mt-1 sm:mt-0 sm:col-span-8">
							<input id="filter" name="filter" type="text" className="input-registered-required" placeholder="Search" value={notificationFilters?.search ?? ""} onChange={handleSearch} />
						</div>

						<div className="mt-1 sm:mt-0 sm:col-span-4">
							<div className="max-w-lg flex rounded-md shadow-sm">
								<select id="notification-category" name="notification-category" className="input-registered-required" value={notificationFilters?.category || ""} onChange={handleCategoryChange}>
									<option value="">Select Category</option>
									{notificationCategories.map((cat) => (
										<option key={cat.name} value={cat.name}>
											{cat.name}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="mt-1 sm:mt-0 sm:col-span-3">
							<div className="max-w-lg flex rounded-md shadow-sm">
								<select id="notification-status" name="notification-status" className="input-registered-required" value={notificationFilters?.isRead || ""} onChange={handleStatusChange}>
									<option value="">All</option>
									<option value="read">Read</option>
									<option value="unread">Unread</option>
									<option value="archived">Archived</option>
								</select>
							</div>
						</div>
						<div className="mt-1 sm:mt-0 sm:col-span-1">
							<button type="button" className="py-2 px-1 rounded-md border border-default bg-primary text-sm font-medium text-primary hover:bg-secondary" onClick={handleRefresh}>
								<RefreshIcon className="h-5 w-5 focus:outline-none focus:ring-0" aria-hidden="true" data-tip="Reset Filters" />
							</button>
						</div>
					</div>
					<div className="border-t border-b border-default px-6 py-2 text-sm font-medium flex justify-between">
						<p>{`${filteredTotal} ${filteredTotal === 0 || (filteredTotal && filteredTotal > 1) ? "messages" : "message"}`}</p>
						<p>Sorted by date</p>
					</div>
				</div>
				<nav aria-label="Message list" className="min-h-0 flex-1 overflow-y-auto">
					{notifications.length <= 0 && (
						<div className="flex justify-center mt-12 h-96">
							<div className="flex flex-col justify-center items-center">
								<SearchCircleIcon className="h-16 w-16 text-primary" />
								<p className="text-lg text-primary">No Notifications Found</p>
							</div>
						</div>
					)}
					{notifications.length >= 1 && (
						<div key={processing}>
							{pageCount > 1 && (
								<div className="w-full flex justify-center p-3 border-b border-default">
									<ReactPaginate
										previousLabel={"previous"}
										nextLabel={"next"}
										breakLabel={"..."}
										breakClassName={"break-me"}
										pageCount={pageCount}
										onPageChange={handlePageClick}
										pageRangeDisplayed={5}
										marginPagesDisplayed={2}
										activeClassName="z-10 text-tertiary"
										breakLinkClassName="bg-primary border-default text-primary hover:bg-secondary hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
										containerClassName="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
										pageClassName="bg-primary border-default text-primary hover:bg-secondary relative inline-flex items-center px-4 py-2 border text-sm font-medium"
										previousClassName="relative inline-flex items-center px-2 py-2 rounded-l-md border border-default bg-primary text-sm font-medium text-primary hover:bg-secondary"
										nextClassName="relative inline-flex items-center px-2 py-2 rounded-r-md border border-default bg-primary text-sm font-medium text-primary hover:bg-secondary"
									/>
								</div>
							)}

							<div className="mt-1 sm:mt-0 sm:col-span-4 py-2 px-4 border-b border-default shadow-sm">
								{selectedNotifications.length > 0 && (
									<>
										<p className="font-medium pl-1 pb-1 text-sm">Bulk Actions:</p>
										<div className="max-w-lg flex rounded-md">
											<select id="notification-category" name="notification-category" className="input-registered-required" value={bulkAction || ""} onChange={changeBulkAction}>
												<option value="">With Selected</option>
												{bulkActions.map((action) => (
													<option key={action} value={action}>
														{action}
													</option>
												))}
											</select>
											<button type="button" className={`p-2 rounded-md text-sm font-medium hover:bg-opacity-80 ml-2 ${bulkAction ? "bg-header text-white" : "border border-default bg-secondary text-secondary"}`} onClick={executeBulkAction} disabled={!bulkAction}>
												Confirm
											</button>
										</div>
									</>
								)}
								<div className="max-w-lg flex items-center rounded-md pt-2">
									<input type="checkbox" checked={selectAll} className="w-4 h-4 text-header bg-secondary border-divider rounded mr-2 z-20 cursor-pointer form-checkbox focus:ring-0 focus:outline-none focus-visible:outline-none" onChange={() => setSelectAll(!selectAll)} />
									<span className="text-sm font-medium">Select All</span>
								</div>
							</div>
							<ul className="border-b border-default divide-y divide-default">
								{notifications.map((notification) => (
									<li key={notification.id} className={`relative flex bg-primary p-4 hover:bg-opacity-50 cursor-pointer ${activeNotification && notification.id === activeNotification.id && "bg-gray-50"}`}>
										<input
											type="checkbox"
											value={notification.id}
											checked={selectedNotifications.includes(notification.id)}
											className="w-4 h-4 text-header bg-secondary border-divider rounded mr-2 z-20 cursor-pointer form-checkbox focus:ring-0 focus:outline-none focus-visible:outline-none"
											onChange={(e) => handleSelectClick(e)}
										/>

										{activeNotification && notification.id === activeNotification.id && (
											<>
												<div style={{ position: "absolute", right: 0, width: 0, height: 0, borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderRight: "10px solid #00549a" }}></div>
												<div className="absolute inset-y-0 right-0 w-0.5 bg-header"></div>
											</>
										)}
										<div className="min-w-0 flex-1" onClick={() => handleActiveNotification(notification, true, true)}>
											<div className="block focus:outline-none">
												<span className="absolute inset-0" aria-hidden="true" />
												<div
													className={`text-sm font-medium px-1 ${archivedNotifications.includes(notification.id) ? "text-red-500" : "text-header"} truncate ${
														readNotifications.includes(notification.id) || archivedNotifications.includes(notification.id) ? "text-opacity-30" : "text-opacity-1"
													}`}
												>
													{notification.subject}
												</div>
											</div>
										</div>
										<time dateTime={notification.createdOn} className="flex-shrink-0 whitespace-nowrap text-xs text-primary">
											{dayjs(notification.createdOn).format("MMM D, YYYY")}
										</time>
									</li>
								))}
							</ul>
						</div>
					)}
				</nav>
			</div>
		);
	};

	const props: containerProps = {
		title: "Notification Center",
		// actions: <SocialIcons />,
		actions: null,
		cssClass: "p-0 max-w-full text-sm",
	};

	if (error) {
		return <ErrorMessage message={error.message} />;
	}

	return (
		<ContentContainer title={props.title} actions={props.actions} cssClass={props.cssClass}>
			{isLoading && <InboxLoader />}
			{!isLoading && !activeNotification && (
				<div className="flex justify-center mt-12 h-96">
					<div className="flex flex-col justify-center items-center">
						<SearchCircleIcon className="h-16 w-16 text-primary" />
						<p className="text-lg text-primary">No Notifications Found</p>
					</div>
				</div>
			)}
			{!isLoading && activeNotification && (
				<main className="min-w-0 flex-1 xl:flex">
					<section aria-labelledby="message-heading" className="min-w-0 flex-1 h-full flex flex-col overflow-hidden xl:order-last">
						{/* Top section */}
						<div className="flex-shrink-0 border-b border-divider">
							{/* Toolbar*/}
							<div className="h-16 flex flex-col justify-center">
								<div className="px-4 sm:px-6 lg:px-8">
									<div className="py-3 flex justify-between">
										{/* Left buttons */}
										<div>
											<span className="relative z-0 inline-flex shadow-sm rounded-md sm:shadow-none sm:space-x-3">
												<span className="inline-flex sm:shadow-sm">
													<div
														className="relative inline-flex xl:hidden items-center px-4 py-2 rounded-md border border-default bg-header text-sm font-medium text-inverse hover:bg-opacity-80 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 mr-2"
														onClick={openSideSlider}
													>
														<span className="sr-only">View All</span>
														<ViewListIcon className="h-5 w-5" aria-hidden="true" />
													</div>
													{!archivedNotifications.includes(activeNotification.id) && readNotifications.includes(activeNotification.id) && (
														<button
															type="button"
															className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-default bg-primary text-sm font-medium text-primary hover:bg-secondary focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
															onClick={handleMarkAsUnread}
														>
															<ReplyIcon className="mr-2.5 h-5 w-5 text-blue-400" aria-hidden="true" />
															<span className="hidden sm:inline-flex">Mark as Unread</span>
														</button>
													)}
													{!archivedNotifications.includes(activeNotification.id) && !readNotifications.includes(activeNotification.id) && (
														<button
															type="button"
															className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-default bg-primary text-sm font-medium text-primary hover:bg-secondary focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
															onClick={() => handleMarkAsRead(activeNotification)}
														>
															<EyeOffIcon className="mr-2.5 h-5 w-5 text-blue-400" aria-hidden="true" />
															<span className="hidden sm:inline-flex">Mark as Read</span>
														</button>
													)}
													{archivedNotifications.includes(activeNotification.id) && (
														<button
															type="button"
															className="relative inline-flex items-center -ml-px px-4 py-2 rounded-r-md border border-default bg-primary text-sm font-medium text-primary hover:bg-secondary focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
															onClick={handleUnArchiveNotification}
														>
															<ReplyIcon className="mr-2.5 h-5 w-5 text-blue-400" aria-hidden="true" />
															<span className="hidden sm:inline-flex">UnArchive</span>
														</button>
													)}
													{!archivedNotifications.includes(activeNotification.id) && (
														<button
															type="button"
															className="relative inline-flex items-center -ml-px px-4 py-2 rounded-r-md border border-default bg-primary text-sm font-medium text-primary hover:bg-secondary focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
															onClick={handleArchiveNotification}
														>
															<TrashIcon className="mr-2.5 h-5 w-5 text-red-400" aria-hidden="true" />
															<span className="hidden sm:inline-flex">Archive</span>
														</button>
													)}
												</span>
											</span>
										</div>

										{/* Right buttons */}
										<nav aria-label="Pagination" className="visible xl:invisible">
											<span className="relative z-0 inline-flex shadow-sm rounded-md">
												<div
													className={classNames(
														"relative inline-flex items-center px-4 py-2 rounded-l-md border border-default text-sm font-medium text-primary  focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600",
														notificationIndex === 0 ? "bg-secondary cursor-default" : "bg-primary hover:bg-secondary cursor-pointer"
													)}
													onClick={() => handleScrollNotification("prev")}
												>
													<span className="sr-only">Previous</span>
													<ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
												</div>
												<div
													className={classNames(
														"-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-default text-sm font-medium text-primary focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600",
														notificationIndex === notifications.length - 1 ? "bg-secondary cursor-default" : "bg-primary hover:bg-secondary cursor-pointer"
													)}
													onClick={() => handleScrollNotification("next")}
												>
													<span className="sr-only">Next</span>
													<ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
												</div>
											</span>
										</nav>
									</div>
								</div>
							</div>
							{/* Message header */}
						</div>

						{activeNotification && (
							<div className="min-h-0 flex-1 overflow-y-auto">
								<div className="pt-5 pb-6 shadow">
									<div className="px-4 sm:flex sm:justify-between sm:items-baseline sm:px-6 lg:px-8">
										<div className="sm:w-0 sm:flex-1">
											<h1 id="message-heading" className="text-lg font-medium">
												{activeNotification.subject}
											</h1>
											{/* <p className="mt-1 text-sm text-gray-500 truncate">{activeNotification.from}</p> */}
										</div>

										<div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
											{activeNotification.priority > 0 && <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-secondary text-secondary">{activeNotification.emailCategory}</span>}
										</div>
									</div>
								</div>
								<ul className="py-4 space-y-2 sm:px-6 sm:space-y-4 lg:px-8">
									<li key={activeNotification.id} className="bg-primary text-primary border border-default px-4 py-6 shadow sm:rounded-lg sm:px-6">
										<div className="sm:flex sm:justify-between sm:items-baseline">
											<h3 className="font-medium">
												Message sent on <time dateTime={activeNotification.createdOn}>{dayjs(activeNotification.createdOn).format("MMM D, YYYY")}</time>
											</h3>
										</div>
										<div className="mt-4 space-y-6 text-sm" dangerouslySetInnerHTML={{ __html: activeNotification.body ?? "" }} />
									</li>
								</ul>
							</div>
						)}
					</section>

					{/* Message list*/}
					<aside className="hidden xl:block xl:flex-shrink-0 xl:order-first">
						<div className="w-96 border-r border-divider h-screen text-primary">{getNotificationsList()}</div>
					</aside>
					<SlidePanel title="Notifications">
						<div className="absolute inset-0 px-4 sm:px-6 p-4">
							<div className="mt-4">
								<div className="mx-auto w-full flex flex-wrap justify-center items-top">{getNotificationsList()}</div>
							</div>
						</div>
					</SlidePanel>
				</main>
			)}
		</ContentContainer>
	);
};

export default Notifications;
