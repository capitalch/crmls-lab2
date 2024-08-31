import React, { useContext, useRef, } from 'react'
import { useHistory, } from 'react-router-dom';
import { SaveTypesEnum } from '../../util/helpers';
import { MembershipMessages } from '../../util/MembershipMessages';
import _ from 'lodash';
import dayjs from 'dayjs';

function ActionBar(props: ActionPropsType) {
    const history = useHistory();
    const { errors, handleSubmit, isSubmitting, isValid, values }: any = props?.formik

    // Following is workaround. isManaged is true only the first time refresh of component. On next time refresh its value is false
    let isManaged = useRef(false)

    var localizedFormat = require("dayjs/plugin/localizedFormat");
    dayjs.extend(localizedFormat);
    

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="portlet-box portlet-fullHeight border0 shadow-sm mb-30">
                    <div className="portlet-header d-flex align-items-center justify-content-between">
                        <div className='d-flex align-items-center'>
                            <h3>{props.title}</h3>
                            {toShowErrorAlert() && <div className="alert alert-warning ml-4" role="alert">
                                <i className='fa fa-asterisk mr-1 text-danger' style={{ fontSize: '10px' }} /> {MembershipMessages.tabValidationErrors}
                            </div>}
                        </div>

                        {/* {props.errorsArray && Array.isArray(props.errorsArray) && (props.errorsArray.length > 0) ? props.errorsArray[0] : ''} */}
                        {/* </div> */}
                        {/* <div className="portlet-tools">
                            <ul className="nav justify-content-end">
                                {isManaged.current && (
                                    <li className="nav-item">
                                        <button type="button" disabled={(!isValid) || (isSubmitting)}
                                            onClick={handleOnActionSave}
                                            className="btn btn-icon btn-sm btn-square btn-success">
                                            <i className="fa fa-save" /> Save
                                        </button>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <button disabled={(!isValid) || (isSubmitting)} type="button" className="btn btn-icon btn-sm btn-square btn-outline-success" onClick={handleOnActionSaveAndNew} >
                                        <i className="far fa-plus-square" /> Save & New
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button disabled={(!isValid) || (isSubmitting)} type="button" className="btn btn-icon btn-sm btn-square btn-outline-success" onClick={handleOnActionSaveAndClose}>
                                        <i className="far fa-check-square" /> Save & Close
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        type="button"
                                        className="btn btn-icon btn-sm btn-square btn-outline-danger"
                                        onClick={handleOnActionClose}>
                                        <i className="far fa-times-circle" /> Close
                                    </button>
                                </li>
                            </ul>
                            {props.modifiedOn && <p className="text-xs text-muted text-right mt-2 mb-0">Last Modified: {dayjs(props.modifiedOn).format("lll")}</p>}
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )

    function handleOnActionClose() {
        history.push(`/${props.routePath}`);
    }

    async function handleOnActionSave() {
        values.saveType = SaveTypesEnum.SaveOnly
        handleSubmit(values)
    }

    function handleOnActionSaveAndNew() {
        values.saveType = SaveTypesEnum.SaveAndNew
        handleSubmit(values)
    }

    function handleOnActionSaveAndClose() {
        values.saveType = SaveTypesEnum.SaveAndClose
        handleSubmit(values)
    }

    function toShowErrorAlert() {
        let ret: boolean = false
        const fields = props.fieldsToCheckForError
        if (props.fieldsToCheckForError && Array.isArray(props.fieldsToCheckForError) && (props.fieldsToCheckForError.length > 0)) {
            const errorObj = fields?.find((field: string) => {
                let r: boolean = false
                r = errors[field] ? true : false
                return (r)
            })
            if(errorObj){
                ret = true
            }
        }
        return (ret)
    }
}
export { ActionBar }

type ActionPropsType = {
    modifiedOn?: string
    resourceType: 'membership' | 'notification' | 'mace'
    routePath: string
    title: string
    errorsArray?: string[]
    formik?: any
    fieldsToCheckForError?: string[]
}



