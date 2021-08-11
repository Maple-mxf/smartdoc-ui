

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
    { field: 'value', headerName: 'value', width: 180, editable: true },
    { field: 'description', headerName: 'description', width: 180, editable: true },
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

export const mapArrayKey = (array)=>{
    if (array === undefined || array.length === undefined)
    {
        return array;
    }

    for (let i = 0; i < array.length; i++) {
        array[i].id = i;
    }

    console.info(JSON.stringify(array))
    return array
}