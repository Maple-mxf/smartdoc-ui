import {GridActionsCellItem} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

export function getQueryParamSchema(isContainActions, newFunc, deleteFunc) {
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