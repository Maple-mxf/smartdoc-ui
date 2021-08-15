import * as React from 'react';
import {DataGrid, GridToolbarContainer, useGridSlotComponentProps} from '@material-ui/data-grid';
import {Add, AddCircle} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}))

export const DocDataEditDataGrid = (props)=>{
    const classes =useStyles()
    const {rows,columns,getRowIdFunc,editCommitFunc,batchDeleteFunc,createSnippetFunc } = props;

    console.info("rows",rows)
    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid rows={rows}
                      columns={columns}
                      autoPageSize={false}
                      headerHeight={65}
                      checkboxSelection={true}
                      components={{
                          Toolbar: ToolBar,
                      }}
                      componentsProps={
                          {
                              toolbar:{classes:classes,batchDeleteFunc:batchDeleteFunc,createSnippetFunc:createSnippetFunc}
                          }
                      }

                      icons={AddCircle}
                      hideFooterRowCount={true}
                      hideFooterPagination={true}
                      onCellEditCommit={editCommitFunc}
                      getRowId={getRowIdFunc}
            />
        </div>
    )
}

const  ToolBar = (props)=> {
    const {classes,batchDeleteFunc,createSnippetFunc} = props
    const { state,} =  useGridSlotComponentProps()

    return (
        <div>
            <GridToolbarContainer >
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Add />}
                    onClick={createSnippetFunc}
                >
                    Create
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    endIcon={<DeleteIcon />}
                    onClick={()=>batchDeleteFunc(state.selection) }
                >
                    Delete
                </Button>
            </GridToolbarContainer>
        </div>
    )
}

