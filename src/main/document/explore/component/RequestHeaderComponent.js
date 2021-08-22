import {useSelector} from "react-redux";
import {DOC_REDUCER_NAMESPACE} from "../../../../util/constants";
import {IncreaseFormLineComponent} from "./IncreaseFormLineComponent";
import React from "react";


export const RequestHeaderComponent = (props) =>{
    const {classes,} = props;
    const exploreDocData = useSelector(state => state[DOC_REDUCER_NAMESPACE].exploreDocData);
    const exploreOpenHeaderForm = useSelector(state => state[DOC_REDUCER_NAMESPACE].exploreOpenHeaderForm);
    return (
        <div>
            {
                exploreOpenHeaderForm && exploreDocData.requestHeaderFormLines ? (
                    exploreDocData.requestHeaderFormLines.map((item, index) => {
                        return (
                            <IncreaseFormLineComponent
                                key={index}
                                id={item.id}
                                classes={classes}
                                showDelBtn={item.showDelBtn}
                                value1={item.value1}
                                value2={item.value2}
                                valueOnChange={()=>{}}
                            />

                        )
                    })
                ) : null
            }

        </div>
    )
}

