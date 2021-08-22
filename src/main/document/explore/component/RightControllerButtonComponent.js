import {useDispatch, useSelector} from "react-redux";
import {DOC_EXPLORE_REDUCER_NAMESPACE} from "../../../../util/constants";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {
    changeOpenHeaderFormSwitch,
    changeOpenMatrixVarFormSwitch,
    changeOpenURIVarFormSwitch, changeOpenURLParamFormSwitch
} from "../store/actionCreators";
import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export const RightControllerButtonComponent = (props) => {
    const {classes} = props;
    const exploreDocData = useSelector(state => state[DOC_EXPLORE_REDUCER_NAMESPACE]);
    let dispatch = useDispatch();

    const describeLength = (items) =>{
        return items.filter(item=>item.value1 !== '').length
    }

    let headerLen = describeLength(exploreDocData.requestHeaderLines)
    let uriVarLen =  describeLength(exploreDocData.uriVarLines)
    let urlParamLen = describeLength(exploreDocData.urlParamLines)
    let matrixVarLen =describeLength(exploreDocData.matrixVarLines)

    return (
        <Paper elevation={exploreDocData.requestHeaderLines.length}
               style={{height: '85vh', width: '100%',overflow: 'auto', textAlign: 'center'}}
               className={classes.paper}>

            <ButtonGroup
                orientation="vertical"
                color="primary"
                aria-label="vertical contained primary button group"
                variant="contained"
                style={{ marginTop:'5vh',}}
            >

                <Button
                    variant={exploreDocData.exploreOpenHeaderForm ? 'contained' : 'outlined'}
                    onClick={() => {
                        dispatch(changeOpenHeaderFormSwitch(!exploreDocData.exploreOpenHeaderForm))
                    }}
                >
                     Header({headerLen})
                </Button>

                <Button
                    variant={exploreDocData.exploreOpenURLParamForm ? 'contained' : 'outlined'}
                    onClick={() => {
                        dispatch(changeOpenURLParamFormSwitch(!exploreDocData.exploreOpenURLParamForm))
                    }}
                >URL Param({urlParamLen})
                </Button>

                <Button
                    variant={exploreDocData.exploreOpenMatrixVarForm ? 'contained' : 'outlined'}
                    onClick={() => {
                        dispatch(changeOpenMatrixVarFormSwitch(!exploreDocData.exploreOpenMatrixVarForm))
                    }}
                >Matrix Var({matrixVarLen})
                </Button>

                <Button
                    variant={exploreDocData.exploreOpenURIVarVarForm ? 'contained' : 'outlined'}
                    onClick={() => {
                        dispatch(changeOpenURIVarFormSwitch(!exploreDocData.exploreOpenURIVarVarForm))
                    }}
                >URI Var({uriVarLen})</Button>
            </ButtonGroup>
        </Paper>
    )
}