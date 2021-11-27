import {useDispatch, useSelector} from "react-redux";
import {DOC_EXPLORE_REDUCER_NAMESPACE} from "../../../../util/constants";
import React from "react";
import {DynamicFormComponent} from "./DynamicFormComponent";
import {changeRequestHeaderLinesAction} from "../store/actionCreators";
import Zoom from "@mui/material/Zoom";
import Paper from "@mui/material/Paper";

export const RequestHeaderComponent = (props) => {
    const exploreDocData = useSelector(state => state[DOC_EXPLORE_REDUCER_NAMESPACE]);
    const exploreOpenHeaderForm = useSelector(state => state[DOC_EXPLORE_REDUCER_NAMESPACE].exploreOpenHeaderForm);
    const dispatch = useDispatch();
    console.info("exploreDocData",exploreDocData);
    return (
        <div>
            {
                exploreOpenHeaderForm ?
                    <Zoom in={exploreOpenHeaderForm}>
                        <Paper elevation={0} >
                            <DynamicFormComponent
                                formLines={exploreDocData.requestHeaderLines}
                                keyPlaceholder="Header Key"
                                autoCompleteOptions={top100Films}
                                setFormLines={(newLines)=>{
                                    dispatch(changeRequestHeaderLinesAction(newLines))
                                }}
                                open
                            />
                        </Paper>
                    </Zoom> : null
            }
        </div>
    )
}

const top100Films = [
    { title: 'cache-control' },
    { title: 'content-security-policy' },
    { title: 'host' },
];
