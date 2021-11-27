import {GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

export const URIVarSchema = [
    {field: 'field', headerName: 'field', width: 180, editable: false},
    {field: 'value', headerName: 'value', width: 180, editable: true},
    {field: 'description', headerName: 'description', width: 180, editable: true},
]

export function getURIVarSchema(isContainActions, newFunc, deleteFunc) {
    // 参数检测
    if (isContainActions && (newFunc === undefined || deleteFunc === undefined)) {
        return [];
    }

    const QueryParamSchema = [
        {field: 'id', hide: true,},
        {field: 'field', headerName: 'field', minWidth: 180, editable: false, flex: 1.1,},
        {field: 'value', headerName: 'value', minWidth: 180, editable: true, flex: 1.1,},
        {field: 'description', headerName: 'description', minWidth: 180, editable: true, flex: 1.5,},
    ]

    if (isContainActions) {
        QueryParamSchema.push({
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => {
                return [
                    <GridActionsCellItem
                        icon={<DeleteIcon/>}
                        label="Delete"
                    />]
            },
        })
    }
    return QueryParamSchema;
}