import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {tableProps} from "./SortableTable";

export type selectorProps = {
    props: tableProps,
    setSelector: Dispatch<SetStateAction<string>>
}

const Selector = ({props, setSelector}: selectorProps) => {
    const [values, setValues] = useState<string[]>([]);

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelector(e.target.value);
    }

    const buildSelect = () => {
        return values.map(v => {
            return <option key={v} value={v}>{v}</option>
        })
    }

    useEffect(() => {
        let temp: string[] = [];
        // get the index of the column we're building the selector for
        let index = -1;
        if (props.selector) {
            index = props.columns.findIndex((c) => c.field === props.selector?.column)
        }

        if (index >= 0) {
            // get all the values
            props.data.forEach((d) => {
                let v = d[index];

                if ((typeof v === 'string') && !temp.includes(v)) {
                    temp.push(v);
                }
            })
        }

        setValues(temp);

    }, [props.columns, props.selector?.column]);

    return (
        <>
            <select
                id="selector"
                name="selector"
                value={props.selected}
                onChange={onChange}
                className="w-full ml-2 focus:border-divider border-default rounded-md bg-secondary text-secondary"
                >
                <option>{props.selector?.label ?? 'Select'}</option>
                {buildSelect()}
            </select>
        </>
    );
}

export default Selector;
