import React from "react";
import {RequestBodyComponent} from "./RequestBodyComponent";
import {RequestBodyTypeSelectorComponent} from "./RequestBodyTypeSelectorComponent";
import {RequestHeaderComponent} from "./RequestHeaderComponent";


export const ExploreMainComponent = (props) => {
    const {classes} = props;
    const [codeType, setCodeType] = React.useState("json");
    return (
        <div>
            <RequestBodyTypeSelectorComponent  codeType={codeType}
                                               setCodeType={setCodeType}/>
            <RequestHeaderComponent classes={classes} />
            <RequestBodyComponent classes={classes}
                                  codeType={codeType}
            />
        </div>
    )
}