import {useDispatch, useSelector} from "react-redux";
import {DOC_EXPLORE_REDUCER_NAMESPACE} from "../../../../util/constants";
import React from "react";
import {DynamicFormComponent} from "./DynamicFormComponent";
import {changeURIVarLinesAction} from "../store/actionCreators";
import Zoom from "@mui/material/Zoom";
import Paper from "@mui/material/Paper";

export const URIVarComponent = (props) => {
    const exploreDocData = useSelector(state => state[DOC_EXPLORE_REDUCER_NAMESPACE]);
    const exploreOpenURIVarVarForm = useSelector(state => state[DOC_EXPLORE_REDUCER_NAMESPACE].exploreOpenURIVarVarForm);
    const dispatch = useDispatch();

    return (
        <div>
            {
                exploreOpenURIVarVarForm ?
                    <Zoom in={exploreOpenURIVarVarForm}>
                        <Paper elevation={0} >
                            <DynamicFormComponent
                                formLines={exploreDocData.uriVarLines}
                                keyPlaceholder="URI Var Key"
                                setFormLines={(newLines)=>{
                                    dispatch(changeURIVarLinesAction(newLines))
                                }}
                                open
                            />
                        </Paper>
                    </Zoom> : null
            }
        </div>
    )
}