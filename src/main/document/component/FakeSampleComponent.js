import CustomCodeComponent from "../../../style/component/code";
import React from "react";


export function FakeSampleComponent(props) {
    const {doc} = props;
    return (
        <div>
            {(doc.curlCodeSample !== undefined && doc.curlCodeSample !== '') ?
                <CustomCodeComponent codeText={doc.curlCodeSample} language='shell' tag='request'/> : null}
            {(doc.responseFakeCodeSample !== undefined && doc.responseFakeCodeSample !== '') ?
                <CustomCodeComponent codeText={doc.responseFakeCodeSample} language='json' tag='response'/> : null}
        </div>
    )
}