import React from "react";
import {DotLoader} from "react-spinners";

const Loader = () => {
    const getThemeColor = () => {
        return '#00468b';
    }
    return (
        <div className="w-full h-full grid grid-cols-1 place-items-center">
            <DotLoader color={getThemeColor()} />
        </div>
    );
}

export default Loader;