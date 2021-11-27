import {useDispatch, useSelector} from "react-redux";
import {DOC_EXPLORE_REDUCER_NAMESPACE} from "../../../../util/constants";
import React from "react";
import {DynamicFormComponent} from "./DynamicFormComponent";
import {changeURLParamLinesAction} from "../store/actionCreators";
import Zoom from "@mui/material/Zoom";
import Paper from "@mui/material/Paper";

export const URLParamComponent = (props) => {
    const exploreDocData = useSelector(state => state[DOC_EXPLORE_REDUCER_NAMESPACE]);
    const exploreOpenURLParamForm = useSelector(state => state[DOC_EXPLORE_REDUCER_NAMESPACE].exploreOpenURLParamForm);
    const dispatch = useDispatch();

    return (
        <div>
            {
                exploreOpenURLParamForm ?
                    <Zoom in={exploreOpenURLParamForm}>
                        <Paper elevation={0} >
                            <DynamicFormComponent
                                formLines={exploreDocData.urlParamLines}
                                keyPlaceholder="Query Param Key"
                                setFormLines={(newLines)=>{
                                    dispatch(changeURLParamLinesAction(newLines))
                                }}
                                open
                            />
                        </Paper>
                    </Zoom> : null
            }
        </div>
    )
}