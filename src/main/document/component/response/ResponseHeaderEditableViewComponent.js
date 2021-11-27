import React from "react";
import MainDataGrid from "../../../../style/component/datagrid";
import wrapperWithID from "../../../../common/wrapperDocRows";
import EditableTabSwitchComponent from "../EditableTabSwitchComponent";
import {EditableCodeTextComponent} from "../common";
import {getBasicHeaderSchema} from "../../schema/header";
import {useDispatch} from "react-redux";
import {createSnippets} from "../../store/actionCreators";
import {SnippetType_RequestHeader} from "../../store/constants";
import {parseResponseMsg} from "../../../../util/http";
import {FetchDocById} from "../ApiContentComponent";
import {useSnackbar} from "notistack";
import {ErrorVariant} from "../../../../common/tip";
import {mapHeaderCodeText} from "../../common/utils";

export default function ResponseHeaderEditableViewComponent(props) {
    const {doc} = props;

    let dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const handleVariant = (msg, variant) => {
        enqueueSnackbar(msg, {variant});
    };

    const newEmptyHeaderFunc = () => {
        createSnippets(doc.id, SnippetType_RequestHeader, {
            "field": "Example Header",
            "value": "*",
            "optional": true,
            "description": "返回数据格式约定"
        }).then(
            res => {
                let {succ, errorMsg, data} = parseResponseMsg(res)
                if (!succ) {
                    handleVariant(errorMsg, ErrorVariant);
                    return;
                }
                FetchDocById(doc.id, dispatch)
            },
            err => {
                handleVariant(JSON.stringify(err), ErrorVariant)
            }
        )
    }

    return (
        <div>
            <EditableTabSwitchComponent
                EditableTextComponent={EditableCodeTextComponent}
                editableTextComponentProps={{
                    tag: "header",
                    language: 'http',
                    codeText: mapHeaderCodeText(doc.requestHeaderDescriptor)
                }}

                GridTableComponent={MainDataGrid}
                gridTableComponentProps={{
                    rows: wrapperWithID(doc.requestHeaderDescriptor),
                    columns: getBasicHeaderSchema(true, newEmptyHeaderFunc, () => {
                    })
                }}
            />
        </div>
    )
}



