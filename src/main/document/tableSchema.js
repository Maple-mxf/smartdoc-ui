export const QueryParamSchema = [
    { field: 'field', headerName: 'field', width: 180, editable: false },
    { field: 'value', headerName: 'value', width: 180, editable: true },
    { field: 'description', headerName: 'description', width: 180, editable: true },
]

export const URIVarSchema = [
    { field: 'field', headerName: 'field', width: 180, editable: false },
    { field: 'value', headerName: 'value', width: 180, editable: true },
    { field: 'description', headerName: 'description', width: 180, editable: true },
]

export const HeaderSchema = [
    { field: 'field', headerName: 'field', width: 180, editable: false },
    { field: 'optional', headerName: 'optional', width: 180, editable: false },
    { field: 'value', headerName: 'value', width: 300, editable: true },
    { field: 'description', headerName: 'description', width: 330,editable: true },
]

export const RequestBodySchema = [
    { field: 'path', headerName: 'field', width: 180, editable: false },
    { field: 'optional', headerName: 'optional', width: 180, editable: true },
    { field: 'type', headerName: 'type', width: 180, editable: true },
    { field: 'value', headerName: 'value', width: 180, editable: true },
    { field: 'description', headerName: 'description', width: 180, editable: true },
]

export const ResponseBodySchema = [
    { field: 'path', headerName: 'path', width: 180, editable: false },
    { field: 'optional', headerName: 'optional', width: 180, editable: true },
    { field: 'type', headerName: 'type', width: 180, editable: true },
    { field: 'value', headerName: 'value', width: 180, editable: true },
    { field: 'description', headerName: 'description', width: 180, editable: true },
]

export const getRequestHeaderRowId = (row)=>(row.field)


