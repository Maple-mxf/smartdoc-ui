export function mapHeaderCodeText(headerDescriptors) {
    let codeText = "";
    if (headerDescriptors === undefined || headerDescriptors.length === 0) {
        codeText = codeText + "HeaderKey: Value"
        return codeText;
    }
    for (let i = 0; i < headerDescriptors.length; i++) {
        codeText = codeText + headerDescriptors[i].field + ": " + headerDescriptors[i].value + "\n";
    }
    return codeText;
}

//
export function mapPathVarCodeText(uriVarDescriptors) {
    let codeText = "";
    if (uriVarDescriptors === undefined || uriVarDescriptors.length === 0) {
        codeText = codeText + "PathVarKey=Value"
        return codeText;
    }

    for (let i = 0; i < uriVarDescriptors.length; i++) {
        codeText = codeText + uriVarDescriptors[i].field + "= " + uriVarDescriptors[i].value + "\n";
    }
    return codeText;
}

export function mapQueryParamCodeText(queryParamDescriptors) {
    let codeText = "";
    if (queryParamDescriptors === undefined || queryParamDescriptors.length === 0) {
        codeText = codeText + "QueryParamKey=Value"
        return codeText;
    }

    for (let i = 0; i < queryParamDescriptors.length; i++) {
        codeText = codeText + queryParamDescriptors[i].field + "= " + queryParamDescriptors[i].value + "\n";
    }
    return codeText;
}