import {Box, useTheme} from "@mui/material";
import React from "react";
import ExploreIcon from '@mui/icons-material/Explore';
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import {styled} from "@mui/material/styles";
import SubjectIcon from '@mui/icons-material/Subject';
import Tooltip from "@mui/material/Tooltip";
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import AddCommentIcon from '@mui/icons-material/AddComment';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TableViewIcon from '@mui/icons-material/TableView';

const StyledIconButton = styled(IconButton)(({theme}) => ({
    '&:hover': {
        transform: `scale(1.1)`
    },
}));

// DocumentToobarListComponent 文档工具条
export default function ApiDocumentToobarListComponent(props) {
    let theme = useTheme();
    return (
        /* <Box sx={{
             height: '50vh',
             border: 'solid',
             marginTop: theme.spacing(6),
             marginLeft: theme.spacing(2),
             padding: theme.spacing(1),
             width: '50%',
             textAlign: 'center'
         }}>
             <IconButton aria-label="Example">
                 <ExploreIcon color='primary'/>
             </IconButton>
         </Box>*/
        <Stack
            spacing={2}
            direction="column"
            divider={<Divider orientation="horizontal" flexItem/>}

            sx={{
                marginTop: theme.spacing(6),
                marginLeft: theme.spacing(1),
                padding: theme.spacing(1),
                border: 'solid',
                borderWidth: '0.5px',
                borderRadius: '10px',
                width: '60%',
                borderColor: theme.palette.divider,
                textAlign: 'center'
            }}>
            <Box sx={{
                color: theme.palette.primary.main,
            }}>tools</Box>
            <Tooltip title="API explore" arrow placement="right">
                <StyledIconButton>
                    <ExploreIcon color='primary'/>
                </StyledIconButton>
            </Tooltip>
            <Tooltip title="document subject" arrow placement="right">
                <StyledIconButton>
                    <SubjectIcon color='primary'/>
                </StyledIconButton>
            </Tooltip>
            <Tooltip title="wiki text" arrow placement="right">
                <StyledIconButton>
                    <AddCommentIcon color='primary'/>
                </StyledIconButton>
            </Tooltip>
            <Tooltip title="copy document link" arrow placement="right">
                <StyledIconButton>
                    <InsertLinkIcon color='primary'/>
                </StyledIconButton>
            </Tooltip>
            <Tooltip title="copy document" arrow placement="right">
                <StyledIconButton>
                    <CopyAllIcon color='primary'/>
                </StyledIconButton>
            </Tooltip>
            <Tooltip title="copy document" arrow placement="right">
                <StyledIconButton>
                    <TableViewIcon color='primary'/>
                </StyledIconButton>
            </Tooltip>
            <Tooltip title="copy document" arrow placement="right">
                <StyledIconButton>
                    <DeleteForeverIcon color='error'/>
                </StyledIconButton>
            </Tooltip>
        </Stack>
    )
}