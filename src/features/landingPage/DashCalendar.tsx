import React, {useState} from "react";
import { ScheduleComponent, Week, Month, TimelineViews, TimelineMonth, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
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
import dayjs from "dayjs";
import {MinusIcon, PlusIcon} from "@heroicons/react/solid";

const DashCalendar = () => {
    const [show, setShow] = useState(true);
    let showClass = show ? "text-sm text-gray-400" : "hidden";

    const [data, setData] = useState([
        {
            Id: 1,
            Subject: 'Training for Some Sweet Tech',
            StartTime: dayjs().hour(11).minute(0).add(1, 'day').toDate(),
            EndTime: dayjs().hour(12).minute(0).add(1, 'day').toDate()
        }, {
            Id: 2,
            Subject: 'Mandatory MLS Rules Discussion',
            StartTime: dayjs().hour(13).minute(0).add(2, 'day').toDate(),
            EndTime: dayjs().hour(14).minute(0).add(2, 'day').toDate()
        }, {
            Id: 3,
            Subject: 'Broker Meeting',
            StartTime: dayjs().hour(9).minute(30).subtract(1, 'day').toDate(),
            EndTime: dayjs().hour(12).minute(0).subtract(1, 'day').toDate()
        }, {
            Id: 4,
            Subject: 'Learning Lunch',
            StartTime: dayjs().hour(12).minute(0).toDate(),
            EndTime: dayjs().hour(13).minute(0).toDate()
        }
    ]);

    return (
        <div className="relative bg-white pt-5 px-4 pb-8 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
            <span
                className="float-right inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium bg-gray-100 text-gray-800 mb-2"
                onClick={() => setShow(!show)}
            >
              {show && <MinusIcon className="w-4 h-4 pr-2" />}
              {!show && <PlusIcon className="w-4 h-4 pr-2" />}
                Toggle Calendar
            </span>
            <div className={showClass}>
                <ScheduleComponent
                    width='100%'
                    height='450px'
                    selectedDate={new Date()}
                    eventSettings={{ dataSource: data }}
                >
                    <ViewsDirective>
                        <ViewDirective option='Week'/>
                        <ViewDirective option='TimelineWeek'/>
                        <ViewDirective option='Month'/>
                        <ViewDirective option='TimelineMonth'/>
                    </ViewsDirective>
                    <Inject services={[Week, Month, TimelineViews, TimelineMonth]}/>
                </ScheduleComponent>
            </div>
        </div>
    );
}

export default DashCalendar;