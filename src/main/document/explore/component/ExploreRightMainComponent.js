import React from "react";
import {RequestBodyComponent} from "./RequestBodyComponent";
import {RequestBodyTypeSelectorComponent} from "./RequestBodyTypeSelectorComponent";
import {RequestHeaderComponent} from "./RequestHeaderComponent";
import {useDispatch, useSelector} from "react-redux";
import {DOC_EXPLORE_REDUCER_NAMESPACE} from "../../../../util/constants";
import {changeUrlValueAction} from "../store/actionCreators";
import {URIVarComponent} from "./URIVarComponent";
import {URLParamComponent} from "./URLParamComponent";
import {MatrixVarComponent} from "./MatrixVarComponent";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import {Visibility} from "@mui/icons-material";

export const ExploreRightMainComponent = (props) => {
    const [codeType, setCodeType] = React.useState("json");
    const exploreDocData = useSelector(state => state[DOC_EXPLORE_REDUCER_NAMESPACE]);
    const dispatch = useDispatch()

    const onUrlChange = (e) => {
        dispatch(changeUrlValueAction(e.target.value))
    }

    return (
        <Paper elevation={4} style={{height: '85vh', width: '100%', overflow: 'auto'}} >
            <form  noValidate autoComplete="off">
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
                <RequestHeaderComponent />
                <URIVarComponent  />
                <MatrixVarComponent  />
                <URLParamComponent  />
                <RequestBodyTypeSelectorComponent codeType={codeType} setCodeType={setCodeType}/>
                <RequestBodyComponent  codeType={codeType}/>
                <ExploreContentControllerComponent />
            </form>
        </Paper>
    )
}

const ExploreContentControllerComponent = (props) => {
    const exploreDocData = useSelector(state => state[DOC_EXPLORE_REDUCER_NAMESPACE]);
    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                endIcon={<Icon>send</Icon>}
                disabled={exploreDocData.url.length === 0}
            >
                Send
            </Button>

            <Button
                variant="contained"
                color="default"
                endIcon={<Visibility/>}
                disabled={exploreDocData.url.length === 0}
            >
                Clear
            </Button>
        </div>
    )
}