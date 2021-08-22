import {useDispatch, useSelector} from "react-redux";
import {DOC_EXPLORE_REDUCER_NAMESPACE} from "../../../../util/constants";
import React from "react";
import {DynamicFormComponent} from "./DynamicFormComponent";
import {changeURLParamLinesAction} from "../store/actionCreators";
import Zoom from "@material-ui/core/Zoom";
import Paper from "@material-ui/core/Paper";

export const URLParamComponent = (props) => {
    const {classes,} = props;
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
                                classes={classes}
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