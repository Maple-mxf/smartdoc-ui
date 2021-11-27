import {useDispatch, useSelector} from "react-redux";
import {DOC_EXPLORE_REDUCER_NAMESPACE} from "../../../../util/constants";
import {
    changeOpenHeaderFormSwitch,
    changeOpenMatrixVarFormSwitch,
    changeOpenURIVarFormSwitch, changeOpenURLParamFormSwitch
} from "../store/actionCreators";
import React from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";

export const RightControllerButtonComponent = (props) => {

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
        <Paper elevation={5}
               style={{height: '85vh', width: '100%',overflow: 'auto', textAlign: 'center'}} >

            <ButtonGroup
                orientation="vertical"
                size="small"
                aria-label="vertical contained primary button group"
                style={{ marginTop:'5vh',}}
            >

                <Button
                    style={{textAlign:"left"}}
                    color={exploreDocData.exploreOpenHeaderForm ? 'primary' : 'default'}
                    variant={exploreDocData.exploreOpenHeaderForm ? 'contained' : 'default'}

                    onClick={() => {
                        dispatch(changeOpenHeaderFormSwitch(!exploreDocData.exploreOpenHeaderForm))
                    }}
                >
                     Header({headerLen})
                </Button>

                <Button
                    color={exploreDocData.exploreOpenURLParamForm ? 'primary' : 'default'}
                    variant={exploreDocData.exploreOpenURLParamForm ? 'contained' : 'text'}

                    onClick={() => {
                        dispatch(changeOpenURLParamFormSwitch(!exploreDocData.exploreOpenURLParamForm))
                    }}
                >URL Param({urlParamLen})
                </Button>

                <Button

                    color={exploreDocData.exploreOpenMatrixVarForm ? 'primary' : 'default'}
                    variant={exploreDocData.exploreOpenMatrixVarForm ? 'contained' : 'default'}

                    onClick={() => {
                        dispatch(changeOpenMatrixVarFormSwitch(!exploreDocData.exploreOpenMatrixVarForm))
                    }}
                >Matrix Var({matrixVarLen})
                </Button>

                <Button
                    color={exploreDocData.exploreOpenURIVarVarForm ? 'primary' : 'default'}
                    variant={exploreDocData.exploreOpenURIVarVarForm ? 'contained' : 'default'}

                    onClick={() => {
                        dispatch(changeOpenURIVarFormSwitch(!exploreDocData.exploreOpenURIVarVarForm))
                    }}
                >URI Var({uriVarLen})</Button>
            </ButtonGroup>
        </Paper>
    )
}