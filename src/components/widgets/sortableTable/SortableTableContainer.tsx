import React, {useEffect, useState, useRef} from "react";
import SortableTable, {columnType, rowValue} from "./SortableTable";

export type selectorSettings = {
    selected?: string,
    column?: string,
    label?: string,
}

export type sortableTableContainerProps = {
    allData: rowValue[][],
    columns: columnType[],
    defaultSort?: string,
    showFilter?: boolean,
    addButton?: JSX.Element,
    selector?: selectorSettings,
}

/**
 * this component will be for items where the total number of rows is manageable without making further requests to the
 * server
 * @param allData
 * @param columns
 * @param defaultSort
 * @param showFilter
 * @param addButton
 * @param showSelector
 * @param selector
 * @constructor
 */
const SortableTableContainer = ({allData, columns, defaultSort, showFilter, addButton, selector}: sortableTableContainerProps) => {
    const [data, setData] = useState<rowValue[][]>(allData);
    const [sort, setSort] = useState(defaultSort ?? '');
    const [sortOrder, setSortOrder] = useState(false);
    const [filter, setFilter] = useState('');
    const [selectorVal, setSelectorVal] = useState('');
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalResults, setTotalResults] = useState(allData.length);
    const [totalPages, setTotalPages] = useState(totalResults / pageSize);

    // ref object to hold local settings
    const settingsRef = useRef({
        filter: filter,
        selector: selectorVal,
        sort: sort,
        sortOrder: sortOrder,
    })

    useEffect(() => {
        let temp = [...allData];

        // reset filter / sort if needed
        if (filter !== settingsRef.current.filter) {
            settingsRef.current.filter = filter;
            setPage(0);
        }

        // reset selector / sort if needed
        if (selectorVal !== settingsRef.current.selector) {
            settingsRef.current.selector = selectorVal;
            setPage(0);
        }

        if (sort !== settingsRef.current.sort || sortOrder !== settingsRef.current.sortOrder) {
            // set the new filter in the ref
            settingsRef.current.sort = sort;
            settingsRef.current.sortOrder = sortOrder;
            setPage(0);
        }

        if (filter.length) {
            // set the new filter in the ref
            temp = temp.filter(el => {
                let hasValue = false;
                el.forEach((e) => {
                    if ("string" === typeof e) {
                        if (e.toLowerCase().includes(filter.toLowerCase())) {
                            hasValue = true;
                        }
                    }
                })
                return hasValue;
            });
        }

        if (selectorVal.length && selectorVal !== selector?.label) {
            let index = columns.findIndex((c) => c.field === selector?.column);
            if (index > -1) {
                // set the new filter in the ref
                temp = temp.filter(el => {
                    return el[index] === selectorVal
                })
            }
        }

        if (sort.length) {
            let sortBy = sort;
            // check for a hidden sort field
            let column = columns.find(el => el.field === sort);
            if (column && column.hiddenSort) {
                sortBy = column.hiddenSort;
            }
            // get the index of the sorted field
            let i = columns.findIndex((el) => el.field === sortBy);
            if (i >= 0) {
                temp.sort((a, b) => {
                    if (sortOrder) {
                        // ascending
                        return a[i] > b[i] ? 1 : -1;
                    } else {
                        // descending
                        return a[i] < b[i] ? 1 : -1;
                    }
                })
            } else {
                // console.log('sort column not found');
            }
        }

        let start = page === 0 ? 0 : page * pageSize;
        let end = start + pageSize;

        setData(temp.slice(start, end));
        setTotalResults(temp.length);
        setTotalPages(Math.ceil(temp.length / pageSize));
    }, [columns, page, pageSize, filter, sort, sortOrder, allData, selectorVal]);

    return (
        <SortableTable
            columns={columns}
            data={data}
            pageSize={pageSize}
            setPageSize={setPageSize}
            sort={sort}
            setSort={setSort}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            showFilter={showFilter ?? false}
            filter={filter}
            setFilter={setFilter}
            setSelector={setSelectorVal}
            selector={selector}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            totalResults={totalResults}
            newButton={addButton}
        />
    );
}

export default SortableTableContainer;
