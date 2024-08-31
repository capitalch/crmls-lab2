import React from "react";
import {useSelector} from "react-redux";
import {selectAllTraining} from "./trainingPortalSlice";
import TrainingHistoryTable from "./TrainingHistoryTable";

const TrainingHistory = () => {
    let classes = useSelector(selectAllTraining);

    return (<TrainingHistoryTable trainingClassesAttended={classes} />);
}

export default TrainingHistory;
