import EditableTabSwitchComponent from "../EditableTabSwitchComponent";
import {EditableCodeTextComponent} from "../common";
import MainDataGrid from "../../../../style/component/datagrid";
import wrapperWithID from "../../../../common/wrapperDocRows";
import React from "react";
import {getURIVarSchema} from "../../schema/urivar";
import {mapPathVarCodeText} from "../../common/utils";

export default function RequestURIVarEditableViewComponent(props) {
    const {doc} = props;
    return (
        <div>
            <EditableTabSwitchComponent
                EditableTextComponent={EditableCodeTextComponent}
                editableTextComponentProps={{tag:"path var",language: "http", codeText: mapPathVarCodeText(doc.uriVarDescriptors)}}

                GridTableComponent={MainDataGrid}
                gridTableComponentProps={{
                    rows: wrapperWithID(doc.uriVarDescriptor),
                    columns: getURIVarSchema(true, () => {
                    }, () => {
                    })
                }}
            />
        </div>
    )
}