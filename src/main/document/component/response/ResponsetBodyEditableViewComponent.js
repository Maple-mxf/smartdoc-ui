import EditableTabSwitchComponent from "../EditableTabSwitchComponent";
import {EditableCodeTextComponent} from "../common";
import MainDataGrid from "../../../../style/component/datagrid";
import wrapperWithID from "../../../../common/wrapperDocRows";
import {getQueryParamSchema} from "../../schema/queryParam";
import React from "react";

export default function ResponsetBodyEditableViewComponent(props) {
    const {doc} = props;
    return (
        <div>
            <EditableTabSwitchComponent
                EditableTextComponent={EditableCodeTextComponent}
                editableTextComponentProps={{language: 'json',tag:"json"}}

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