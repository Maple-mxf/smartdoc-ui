import React from "react";
import {RequestBodyComponent} from "./RequestBodyComponent";
import {RequestBodyTypeSelectorComponent} from "./RequestBodyTypeSelectorComponent";
import {RequestHeaderComponent} from "./RequestHeaderComponent";
import {useDispatch, useSelector} from "react-redux";
import {DOC_EXPLORE_REDUCER_NAMESPACE} from "../../../../util/constants";
import {changeUrlValueAction} from "../store/actionCreators";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import ClearIcon from "@material-ui/icons/Clear";
import {URIVarComponent} from "./URIVarComponent";
import {URLParamComponent} from "./URLParamComponent";
import {MatrixVarComponent} from "./MatrixVarComponent";


export const ExploreRightMainComponent = (props) => {
    const {classes} = props;
    const [codeType, setCodeType] = React.useState("json");
    const exploreDocData = useSelector(state => state[DOC_EXPLORE_REDUCER_NAMESPACE]);
    const dispatch = useDispatch()

    const onUrlChange = (e) => {
        dispatch(changeUrlValueAction(e.target.value))
    }

    return (
        <Paper elevation={4} style={{height: '85vh', width: '100%', overflow: 'auto'}} className={classes.paper}>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic"
                           label="request URL"
                           autoFocus
                           size='small'
                           color="primary"
                           value={exploreDocData.url}
                           onChange={onUrlChange}
                           style={{width: '50%'}}
                           margin="dense"
                           placeholder="Enter request URL here"
                />
                <RequestHeaderComponent classes={classes}/>
                <URIVarComponent classes={classes} />
                <MatrixVarComponent  classes={classes} />
                <URLParamComponent classes={classes} />
                <RequestBodyTypeSelectorComponent codeType={codeType} setCodeType={setCodeType}/>
                <RequestBodyComponent classes={classes} codeType={codeType}/>
                <ExploreContentControllerComponent classes={classes}/>
            </form>
        </Paper>
    )
}

const ExploreContentControllerComponent = (props) => {
    const {classes} = props;
    const exploreDocData = useSelector(state => state[DOC_EXPLORE_REDUCER_NAMESPACE]);
    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Icon>send</Icon>}
                disabled={exploreDocData.url.length === 0}
            >
                Send
            </Button>

            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                endIcon={<ClearIcon/>}
            >
                Clear
            </Button>
        </div>
    )
}