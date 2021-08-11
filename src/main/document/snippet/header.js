import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Toolbar} from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});



export default function RequestHeaderTable(props) {

    const {classes,rows} = props;
    return (
        <TableContainer component={Paper}>
            <Toolbar>
                Request Header
            </Toolbar>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Field</TableCell>
                        <TableCell align="right">Sample Value</TableCell>
                        <TableCell align="right">Require</TableCell>
                        <TableCell align="right">Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row,index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {row.field}
                            </TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                            <TableCell align="right">{row.optional}</TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
