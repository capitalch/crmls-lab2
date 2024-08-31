import React from "react";

type autoCompleteItemProps = {
    option: {
        loginId: string,
        firstName: string,
        lastName: string,
        email: string
    },
    selected: boolean,
    onClick: (event: any) => {}
}


const MemberAutoCompleteItem = ({option, selected, onClick}: autoCompleteItemProps) => {
    const li = selected ? "text-white bg-indigo-600 cursor-default select-none relative py-2 pl-3 pr-9" : "text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9";
    const outer = selected ? "font-semibold truncate" : "font-normal truncate";
    const highlighted = selected ? "text-indigo-200 ml-2 truncate" : "text-gray-500 ml-2 truncate";
    const checkmark = selected ? "text-white absolute inset-y-0 right-0 flex items-center pr-4" : "text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4";

    return (
        <>
            <li
                key={option.loginId}
                className={li}
                id={option.loginId}
                role="option"
                aria-selected={selected}
                onClick={onClick}
            >
                <div className="flex">
                    <span className={outer}>
                        {option.loginId}: {option.firstName} {option.lastName}
                    </span>
                    <span className={highlighted}>
                        {option.email}
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
        </>
    );
}

export default MemberAutoCompleteItem;