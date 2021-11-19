import * as React from "react";
import Box from "@mui/material/Box";
import {LeftTreeWidth} from "../index";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {PhotoCamera} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

// 搜索文档输入框
export default function SearchDocumentViewComponent() {
    return (
        <Box sx={{
            borderRadius: 1,
            bgcolor: 'background.paper',
            maxWidth: LeftTreeWidth - 100
        }}>

            <Autocomplete
                disablePortal
                autoSelect
                freeSolo
                id="combo-box-demo"
                size="small"
                options={top100Films}
                sx={{width: LeftTreeWidth - 200}}
                renderInput={(params) => <TextField placeholder='search document' {...params} label="Keyword" />}
            />

            {/*<IconButton color="primary" aria-label="upload picture" component="span">*/}
            {/*    <PhotoCamera />*/}
            {/*</IconButton>*/}

        </Box>
    )
}

const top100Films = [
    {label: 'Inception', year: 2010},
    {
        label: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },

];