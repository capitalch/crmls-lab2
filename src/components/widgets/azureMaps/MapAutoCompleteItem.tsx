import React from "react";

type mapAutoCompleteItemProps = {
    index: number,
    option: {
        id: string,
        address: {
            freeformAddress: string,
        }
    },
    selected: boolean,
    onClick: (event: any) => {}
}

const MapAutoCompleteItem = ({option, index, selected, onClick}: mapAutoCompleteItemProps) => {
    const li = selected ? "text-white bg-indigo-600 cursor-default select-none relative py-2 pl-3 pr-9" : "text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9";
    const outer = selected ? "font-semibold truncate" : "font-normal truncate";
    const checkmark = selected ? "text-white absolute inset-y-0 right-0 flex items-center pr-4" : "text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4";

    return (
        <li
            id={index.toString()}
            key={option.id}
            className={li}
            role="option"
            aria-selected={selected}
            onClick={onClick}
        >
            <div className="flex">
                <span className={outer}>
                    {option.address.freeformAddress}
                </span>
            </div>
            <span className={checkmark}>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                     aria-hidden="true">
                <path fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"/>
              </svg>
            </span>
        </li>
    );
}

export default MapAutoCompleteItem;