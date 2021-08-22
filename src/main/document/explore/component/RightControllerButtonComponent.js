import {useDispatch, useSelector} from "react-redux";
import {DOC_EXPLORE_REDUCER_NAMESPACE} from "../../../../util/constants";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import {changeOpenHeaderFormSwitch} from "../store/actionCreators";
import Badge from "@material-ui/core/Badge";
import React from "react";

export const RightControllerButtonComponent = (props) => {
    const {classes} = props;
    const exploreDocData = useSelector(state => state[DOC_EXPLORE_REDUCER_NAMESPACE]);
    let dispatch = useDispatch();
    return (
        <Paper elevation={exploreDocData.requestHeaderLines.length} style={{height: '85vh', width: '100%', overflow: 'auto', textAlign: 'center'}}
               className={classes.paper}>
            <Badge badgeContent={4} color="secondary">
                <Button size="medium"
                        variant={exploreDocData.exploreOpenHeaderForm ? 'contained' : 'outlined'}
                        className={classes.margin}
                        color="primary"
                        style={{marginTop: '10vh'}}
                        onClick={() => {
                            dispatch(changeOpenHeaderFormSwitch(!exploreDocData.exploreOpenHeaderForm))
                        }}
                >
                    Header Var
                </Button>
            </Badge>

            <Button size="medium" variant="outlined" className={classes.margin} color="primary"
                    style={{marginTop: '1vh'}}>
                URL Param
            </Button>

            <Badge badgeContent={4} color="secondary">
                <Button size="medium" variant="outlined" className={classes.margin} color="primary"
                        style={{marginTop: '1vh'}}
                >
                    Matrix Var
                </Button>
            </Badge>
        </Paper>
    )
}