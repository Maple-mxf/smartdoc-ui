import React from 'react';
import ControlledTreeView from "./component/TableContentComponent";
import {Box} from "@mui/material";

export const LeftTreeWidth = 450;
export const LeftTreeHeight = 700;

export default function () {
    return (
        <Box>
            {/*<SearchDocumentViewComponent />*/}
            <ControlledTreeView
                sx={{
                    width: LeftTreeWidth,
                    height: LeftTreeHeight
                }}/>
        </Box>
    )
}







