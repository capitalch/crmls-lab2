import TrainingRegButtons from "../TrainingRegButtons";
import dayjs from "dayjs";
import {Link} from "react-router-dom";

type calendarArgs = {
    Id: string,
    Subject: string,
    StartTime: Date,
    EndTime: Date,
    IsAllDay: boolean,
    CategoryColor: string,
    InstructorName: string,
    LocationName: string,
    Topics: string[],
    Aor: string,
    SeatsAvailable: number,
    Guid: string,
    elementType: string,
    imageURL: string
}

export const headerTemplate: string | any = (args: calendarArgs) => {
    return (<div>
        {args.elementType === 'cell' ?
            <div className="e-cell-header text-white">
                {args.Subject}
            </div>
            :
            <div className="shadow-md shadow-inner">
                <div className="e-header-icon-wrapper">
                    <button type="button" className="text-xl text-white align-center cursor-pointer alert-del pr-2 close-btn" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <Link to={`/training/registration/${args.Id}`}>
                    <div className="px-6 py-5 pt-0 flex items-center space-x-3 text-white">
                        <div className="flex-shrink-0">
                            {args.imageURL && args.imageURL !== ''
                                ? <img className="h-10 w-10 rounded-full" src={args.imageURL} alt={args.LocationName} />
                                : <div className="inline-block align-middle e-calendar e-icons mr-1 text-4xl calendar-detail-icon"></div>
                            }
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-shadow font-medium">{args.Subject}</p>
                        </div>
                    </div>
                </Link>
            </div>
        }
    </div>);
}

export const contentTemplate: string | any = (args: calendarArgs) => {
    return (<div>
        {args.elementType === 'cell' ?
            <div className="e-cell-content e-template">
                <div className="p-1">
                    Content
                </div>
            </div>
            :
            <div className="e-event-content e-template pt-2">
                <dl>
                    <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-2">
                        <dt className="text-sm font-medium text-gray-500">
                            <div className="inline-block align-middle e-people e-icons mr-1 text-lg calendar-detail-icon"></div> Instructor
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{args.InstructorName}</dd>
                    </div>
                    <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-2">
                        <dt className="text-sm font-medium text-gray-500">
                            <div className="inline-block align-middle e-location-icon e-icons mr-1 text-lg calendar-detail-icon"></div> Location
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{args.LocationName}</dd>
                    </div>
                    <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-2">
                        <dt className="text-sm font-medium text-gray-500">
                            <div className="inline-block align-middle e-clock e-icons mr-1 text-lg calendar-detail-icon"></div> Start Time
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{dayjs(args.StartTime).format('ddd, MMM D, YYYY')}<br />{dayjs(args.StartTime).format('h:mm A')}</dd>
                    </div>
                    <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-2">
                        <dt className="text-sm font-medium text-gray-500">
                            <div className="inline-block align-middle e-clock e-icons mr-1 text-lg calendar-detail-icon"></div> End Time
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{dayjs(args.EndTime).format('ddd, MMM D, YYYY')}<br />{dayjs(args.EndTime).format('h:mm A')}</dd>
                    </div>
                </dl>
                <div className="pt-2 flex justify-end"><TrainingRegButtons classId={args.Id} seatsLeft={args.SeatsAvailable} /></div>
            </div>
        }
    </div>);
}

export const footerTemplate: string | any = (args: calendarArgs) => {
    return (
        <></>
    );
}
