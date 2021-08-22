import {RawComponent} from "./RawCodeComponent";
import {DynamicFormComponent} from "./DynamicFormComponent";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {DOC_EXPLORE_REDUCER_NAMESPACE} from "../../../../util/constants";
import {changeFormLinesAction, changeXFormLinesAction} from "../store/actionCreators";


export const RequestBodyComponent = (props) => {
    const {classes,codeType} = props;
    const bodyParamTypeTabs = useSelector(state => state[DOC_EXPLORE_REDUCER_NAMESPACE].bodyParamTypeTabs);
    const dispatch = useDispatch();
    const exploreDocData = useSelector(state => state[DOC_EXPLORE_REDUCER_NAMESPACE]);

    return (
        <div style={{marginTop: '1vh'}}>
            {
                bodyParamTypeTabs.map((item, index) => {
                    if (item.id === 1) {
                        return <RawComponent key={index}
                                             classes={classes}
                                             open={item.active}
                                             codeType={codeType}/>
                    }
                    if (item.id === 2) {
                        return <DynamicFormComponent key={index}
                                                     classes={classes}
                                                     open={item.active}
                                                     formLines={exploreDocData.formLines}
                                                     setFormLines={(newFormLines) => {
                                                         dispatch(changeFormLinesAction(newFormLines))
                                                     }}


                        />
                    }
                    if (item.id === 3) {
                        return <DynamicFormComponent key={index}
                                                     classes={classes}
                                                     open={item.active}
                                                     formLines={exploreDocData.xformLines}
                                                     setFormLines={(newFormLines) => {
                                                         dispatch(changeXFormLinesAction(newFormLines))
                                                     }}

                        />
                    }
                    return null
                })
            }
        </div>
    )
}