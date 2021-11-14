import * as React from 'react';
import {DataGrid, GridActionsCellItem} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const initialRows = [
    {
        id: 1,
        name: 'Damien',
        age: 25,
        country: 'Spain',
        discount: '',
    },
    {
        id: 2,
        name: 'Nicolas',
        age: 36,

        country: 'France',
        discount: '',
    },
    {
        id: 3,
        name: 'Kate',
        age: 19,
        country: 'Brazil',
        discount: 'junior',
    },
];

export default function ColumnTypesGrid() {
    const [rows, setRows] = React.useState(initialRows);

    const deleteUser = React.useCallback(
        (id) => () => {
            setTimeout(() => {
                setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            });
        },
        [],
    );
    const columns = React.useMemo(
        () => [
            {field: 'name', type: 'string'},
            {field: 'age', type: 'number'},
            {
                field: 'country',
                type: 'singleSelect',
                width: 120,
                valueOptions: [
                    'Bulgaria',
                    'Netherlands',
                    'France',
                    'United Kingdom',
                    'Spain',
                    'Brazil',
                ],
            },
            {
                field: 'discount',
                type: 'singleSelect',
                width: 120,
                editable: true,
                valueOptions: ({row}) => {
                    if (row === undefined) {
                        return ['EU-resident', 'junior'];
                    }
                    const options = [];
                    if (!['United Kingdom', 'Brazil'].includes(row.country)) {
                        options.push('EU-resident');
                    }
                    if (row.age < 27) {
                        options.push('junior');
                    }
                    return options;
                },
            },
            {
                field: 'actions',
                type: 'actions',
                width: 80,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<DeleteIcon/>}
                        label="Delete"
                        onClick={deleteUser(params.id)}
                    />,
                ],
            },
        ],
        [deleteUser ],
    );

    return (
        <div style={{height: 300, width: '100%'}}>
            <DataGrid columns={columns} rows={rows}/>
        </div>
    );
}
