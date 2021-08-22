import {useDispatch, useSelector} from "react-redux";
import {DOC_EXPLORE_REDUCER_NAMESPACE} from "../../../../util/constants";
import React from "react";
import {DynamicFormComponent} from "./DynamicFormComponent";
import {
    changeMatrixVarLinesAction
} from "../store/actionCreators";
import Zoom from "@material-ui/core/Zoom";
import Paper from "@material-ui/core/Paper";

export const MatrixVarComponent = (props) => {
    const {classes,} = props;
    const exploreDocData = useSelector(state => state[DOC_EXPLORE_REDUCER_NAMESPACE]);
    const exploreOpenMatrixVarForm = useSelector(state => state[DOC_EXPLORE_REDUCER_NAMESPACE].exploreOpenMatrixVarForm);
    const dispatch = useDispatch();

    return (
        <div>
            {
                exploreOpenMatrixVarForm ?
                    <Zoom in={exploreOpenMatrixVarForm}>
                        <Paper elevation={0} >
                            <DynamicFormComponent
                                classes={classes}
                                formLines={exploreDocData.matrixVarLines}
                                keyPlaceholder="Matrix Var Key"
                                setFormLines={(newLines)=>{
                                    dispatch(changeMatrixVarLinesAction(newLines))
                                }}
                                open
                            />
                        </Paper>
                    </Zoom> : null
            }
        </div>
    )
}