import {useDispatch, useSelector} from "react-redux";
import {DOC_EXPLORE_REDUCER_NAMESPACE} from "../../../../util/constants";
import React from "react";
import {DynamicFormComponent} from "./DynamicFormComponent";
import {changeRequestHeaderLinesAction} from "../store/actionCreators";
import Zoom from "@material-ui/core/Zoom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";

const useHeaderStyles = makeStyles((theme) => ({
    root: {
        height: 180,
    },
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing(1),
    },
    svg: {
        width: 100,
        height: 100,
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
}));

export const RequestHeaderComponent = (props) => {
    const {classes,} = props;
    const exploreDocData = useSelector(state => state[DOC_EXPLORE_REDUCER_NAMESPACE]);
    const exploreOpenHeaderForm = useSelector(state => state[DOC_EXPLORE_REDUCER_NAMESPACE].exploreOpenHeaderForm);
    const dispatch = useDispatch();

    return (
        <div>
            {
                exploreOpenHeaderForm ?
                    <Zoom in={exploreOpenHeaderForm}>
                        <Paper elevation={0} >
                            <DynamicFormComponent
                                classes={classes}
                                formLines={exploreDocData.requestHeaderLines}
                                keyPlaceholder="Header Key"
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
//
// const HeaderFormLineComponent = (props) => {
//     const {lines, classes} = props;
//     const dispatch = useDispatch();
//
//     return (
//         <Fade in={checked}>
//             <DynamicFormComponent
//                 classes={classes}
//                 formLines={lines}
//                 keyPlaceholder="Header Key"
//                 setFormLines={(newLines)=>{
//                     dispatch(changeRequestHeaderLinesAction(newLines))
//                 }}
//                 open
//             />
//         </Fade>
//     )
// }
