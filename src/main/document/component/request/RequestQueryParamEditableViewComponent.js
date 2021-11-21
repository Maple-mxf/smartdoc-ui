import EditableTabSwitchComponent from "../EditableTabSwitchComponent";
import {EditableCodeTextComponent} from "../common";
import MainDataGrid from "../../../../style/component/datagrid";
import wrapperWithID from "../../../../common/wrapperDocRows";
import React from "react";
import {getQueryParamSchema} from "../../schema/queryParam";
import {mapQueryParamCodeText} from "../../common/utils";

export default function RequestQueryParamEditableViewComponent(props) {
    const {doc} = props;
    return (
        <div>
            <EditableTabSwitchComponent
                EditableTextComponent={EditableCodeTextComponent}
                editableTextComponentProps={{
                    tag: "query param",
                    codeText: mapQueryParamCodeText(doc.queryParamDescriptor)
                }}

                GridTableComponent={MainDataGrid}
                gridTableComponentProps={{
                    rows: wrapperWithID(doc.queryParamDescriptor),
                    columns: getQueryParamSchema(true, () => {
                    }, () => {
                    })
                }}
            />
        </div>
    )
}