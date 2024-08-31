import React from "react";
import {XCircleIcon} from "@heroicons/react/solid";
<<<<<<< HEAD
=======
import { withAITracking } from "@microsoft/applicationinsights-react-js";
import { ai } from "../../telemetryService";
>>>>>>> dev-1

const ErrorMessage = ({message}: {message: string}) => {
    return (
        <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">There was a problem with this request</h3>
                    <div className="mt-2 text-sm text-red-700">
                        <ul className="list-disc pl-5 space-y-1">
                            <li>{message}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

<<<<<<< HEAD
export default ErrorMessage;
=======
export default withAITracking(ai.reactPlugin, ErrorMessage);
>>>>>>> dev-1
