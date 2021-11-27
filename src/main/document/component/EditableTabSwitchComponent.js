import {useTheme} from "@mui/material";
import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TableViewIcon from "@mui/icons-material/TableView";
import CodeIcon from "@mui/icons-material/Code";
import {TabPanel} from "./common";


export default function EditableTabSwitchComponent(props) {
    let theme = useTheme();

    const {
        EditableTextComponent, editableTextComponentProps,
        GridTableComponent, gridTableComponentProps

    } = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const baseSxStyle = {
        height: '50%',
        textAlign: 'center',
        border: 'solid',
        borderColor: `${theme.palette.divider}`,
        borderWidth: '0.5px',
        borerLeftWidth: '0px',
    };

    const commonRightSx = {
        '&:hover': {
            backgroundColor: `${theme.palette.action.hover}`,
            cursor: 'hand',
            color: `${theme.palette.primary.main}`,
        },
        backgroundColor: `${theme.palette.background.paper}`,
    }

    const commonRightSxSelected = {
        '&:hover': {
            backgroundColor: `${theme.palette.info.main}`,
            cursor: 'hand',
            color: `${theme.palette.grey.A100}`
        },
        backgroundColor: `${theme.palette.info.main}`,
        color: `${theme.palette.grey.A100}`
    }
    return (
        <Grid container spacing={0} sx={{width: '100%', height: '100%', padding: 0}}>
            <div style={{width: '98%'}}>
                <TabPanel value={value} index={0}>
                    <EditableTextComponent {...editableTextComponentProps} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <GridTableComponent {...gridTableComponentProps}/>
                </TabPanel>
            </div>
            <div style={{width: '2%', float: 'left'}}>
                <Box
                    sx={{
                        ...baseSxStyle,
                        ...(value === 0 ? commonRightSxSelected : commonRightSx)
                    }}
                    onClick={(event) => {
                        handleChange(event, 0)
                    }}>
                    <CodeIcon fontSize='small' sx={{marginTop: '20%',}}/>
                </Box>
                <Box
                    sx={{
                        ...baseSxStyle,
                        borderTopWidth: '0px',
                        ...(value === 1 ? commonRightSxSelected : commonRightSx)
                    }}
                    onClick={(event) => {
                        handleChange(event, 1)
                    }}>
                    <TableViewIcon fontSize='small' sx={{marginTop: '20%',}}/>
                </Box>
            </div>
        </Grid>
    )
}