// header请求头
// 当isContainActions参数为true时，newFunc和deleteFunc不可为空
// newFunc:格式 ()=>{}
// deleteFunc: (id)=>{}
import React from "react";
import {ActionComponent} from "./common";

export function getBasicHeaderSchema(isContainActions, newFunc, deleteFunc) {
    // 参数检测
    if (isContainActions && (newFunc === undefined || deleteFunc === undefined)) {
        return [];
    }
    const HeaderSchema = [
        {field: 'id', hide: true,},
        {field: 'lasted', hide: true}, // 当前数据的索引
        {field: 'field', headerName: 'Field', minWidth: 150, editable: true, sortable: false},
        {field: 'optional', headerName: 'Optional', minWidth: 150, editable: true, type: 'boolean', sortable: false},
        {field: 'value', headerName: 'Value', width: 250, flex: 1.1, editable: true, sortable: false},
        {field: 'description', headerName: 'Description', minWidth: 200, flex: 1.5, editable: true, sortable: false},
    ]

    if (isContainActions) {
        HeaderSchema.push({
            field: 'Action',
            type: 'string',
            sortable: false,
            width: 110,
            renderCell: (params) => (<ActionComponent params={params} onRemove={deleteFunc} onAdd={newFunc}/>)
        })
    }
    return HeaderSchema;
}