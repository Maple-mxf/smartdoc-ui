import React from "react";

// Code Editor plugin
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-xml'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'
import "ace-builds/src-noconflict/worker-json";
import {ExploreDialogComponent} from "./component/ExploreDialogComponent";
import IconButton from "@mui/material/IconButton";
import {PlayArrow} from "@mui/icons-material";
import green from "@mui/material/colors/green";


export const ExploreComponent = (props) => {
    const [open, setOpen] = React.useState(false);

    return (
        <div >
            <ExploreDialogComponent open={open}handleClose={() => {
                setOpen(false)
            }}/>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => setOpen(true)}>
                <PlayArrow style={{color: green[500]}}/>
            </IconButton>
        </div>
    )
}



