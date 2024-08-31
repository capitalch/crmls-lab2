import React from "react";
import SortableTableContainer from "../../components/widgets/sortableTable/SortableTableContainer";
import {columnType, rowValue} from "../../components/widgets/sortableTable/SortableTable";

const TrainingRequestColumns : columnType[] = [
    {
        field: 'topic',
        label: 'Topic',
        sortable: true,
        justify: 'center',
        hideMobile: false,
    },
    {
        field: 'dateTime',
        label: 'Requested Date',
        sortable: false,
        formatAs: 'datetime',
        justify: 'center',
        hideMobile: false,
    },
    {
        field: 'status',
        label: 'Status',
        sortable: true,
        justify: 'center',
        hideMobile: false,
    },
];

const TrainingRequestsTable = ({classRequests}: {classRequests: rowValue[][]}) => {
    return (
        <SortableTableContainer
            allData={classRequests}
            columns={TrainingRequestColumns}
            defaultSort='classDate'
        />
    );
}

export default TrainingRequestsTable;