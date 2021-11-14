import React from "react";
import {GridActionsCellItem, GridRowParams} from "@mui/x-data-grid";
import {MiniIconCreateButton, MiniIconDeleteButton} from "../../../style/component/button";
import pink from "@mui/material/colors/pink";
import {Box, useTheme} from "@mui/material";

export const QueryParamSchema = [
    {field: 'field', headerName: 'field', width: 180, editable: false},
    {field: 'value', headerName: 'value', width: 180, editable: true},
    {field: 'description', headerName: 'description', width: 180, editable: true},
]

export const URIVarSchema = [
    {field: 'field', headerName: 'field', width: 180, editable: false},
    {field: 'value', headerName: 'value', width: 180, editable: true},
    {field: 'description', headerName: 'description', width: 180, editable: true},
]

// header请求头
// 当isContainActions参数为true时，newFunc和deleteFunc不可为空
// newFunc:格式 ()=>{}
// deleteFunc: (id)=>{}
export function getHeaderSchema(isContainActions, newFunc, deleteFunc) {
    // 参数检测
    if (isContainActions && (newFunc === undefined || deleteFunc === undefined)) {
        return [];
    }
    const HeaderSchema = [
        {field: 'id', hide: true, },
        {field: 'field', headerName: 'Field', minWidth: 150, editable: true},
        {field: 'optional', headerName: 'Optional', minWidth: 150, editable: true, type: 'boolean'},
        {field: 'value', headerName: 'Value', width: 250, flex: 1.1, editable: true},
        {field: 'description', headerName: 'Description', minWidth: 200, flex: 1.5, editable: true},
    ]

    if (isContainActions) {
        HeaderSchema.push({
            field: 'actions',
            type: 'actions',
            width: 80,
            align: 'left',
            renderCell: (params) => {
                return (
                    <Box sx={{margin: '1rem'}}>
                        <MiniIconDeleteButton sx={{color: pink[500], fontSize: 22}}
                                              onClick={() => deleteFunc(params.id)}/>

                        {(params.api.getRowIndex(params.id) === params.api.getRowsCount() - 1) ?
                            <MiniIconCreateButton size="large" sx={{fontSize: 22}}
                                                  color='primary'
                                                  fontSize="large"
                                                  onClick={() => newFunc()}
                            /> : null}
                    </Box>
                )
            },
        })
    }
    return HeaderSchema;
}


export const RequestBodySchema = [
    {field: 'path', headerName: 'field', width: 180, editable: false},
    {field: 'optional', headerName: 'optional', width: 180, editable: true},
    {field: 'type', headerName: 'type', width: 180, editable: true},
    {field: 'value', headerName: 'value', width: 180, editable: true},
    {field: 'description', headerName: 'description', width: 180, editable: true},
]

export const ResponseBodySchema = [
    {field: 'path', headerName: 'path', width: 180, editable: false},
    {field: 'optional', headerName: 'optional', width: 180, editable: true},
    {field: 'type', headerName: 'type', width: 180, editable: true},
    {field: 'value', headerName: 'value', width: 180, editable: true},
    {field: 'description', headerName: 'description', width: 180, editable: true},
]

export const getRequestHeaderRowId = (row) => (row.field)


