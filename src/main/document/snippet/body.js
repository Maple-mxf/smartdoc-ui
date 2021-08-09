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
import {Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import {NAV_TREE_REDUCER_NAMESPACE} from "../../../util/constants";
import {func, node} from "prop-types";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Value.data', 159, 6.0, 24, 4.0),
];

function doMapToFlattenNodes(node, nodeIds) {
    if (node.type !== 'RESOURCE') {
        nodeIds.push(node.id)
        return
    }
    for (let i = 0; i < node.children; i++) {
        doMapToFlattenNodes(node.children[i])
    }
}

function mapToFlattenNodes(nodes) {
    let nodeIds = [];
    for (let i = 0; i < nodes.length; i++) {
        doMapToFlattenNodes(nodes[i])
    }
    return nodeIds
}

const HC = ()=> (<h1>HHHH</h1>)

// RequestTable
export default function RequestTable() {
    const classes = useStyles();
    const {nodes} = useSelector(state => state[NAV_TREE_REDUCER_NAMESPACE]);
    return (
            <div  >
                <Switch>
                    {
                        mapToFlattenNodes(nodes)
                            .map((nodeId,index) => (
                                <Route component={HC} key={nodeId} path={'/home/document/'+nodeId} />
                            ))
                    }
                </Switch>
            </div>

    )
}
// <TableContainer component={Paper}>
//     <Toolbar>
//         Request Body
//     </Toolbar>
//     <Table className={classes.table} aria-label="simple table">
//         <TableHead>
//             <TableRow>
//                 <TableCell>Field</TableCell>
//                 <TableCell align="right">Sample Value</TableCell>
//                 <TableCell align="right">Type</TableCell>
//                 <TableCell align="right">Require</TableCell>
//                 <TableCell align="right">Description</TableCell>
//             </TableRow>
//         </TableHead>
//         <TableBody>
//             {rows.map((row) => (
//                 <TableRow key={row.name}>
//                     <TableCell component="th" scope="row">
//                         {row.name}
//                     </TableCell>
//                     <TableCell align="right">{row.calories}</TableCell>
//                     <TableCell align="right">{row.fat}</TableCell>
//                     <TableCell align="right">{row.carbs}</TableCell>
//                     <TableCell align="right">{row.protein}</TableCell>
//                 </TableRow>
{/*            ))}*/}
{/*        </TableBody>*/}
{/*    </Table>*/}
{/*</TableContainer>*/}