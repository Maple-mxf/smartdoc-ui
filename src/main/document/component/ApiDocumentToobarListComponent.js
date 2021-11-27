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
import VisibilityIcon from '@mui/icons-material/Visibility';
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {Close} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {ExploreComponent} from "../explore";

const StyledIconButton = styled(IconButton)(({theme}) => ({
    '&:hover': {
        transform: `scale(1.1)`
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// DocumentToobarListComponent 文档工具条
export default function ApiDocumentToobarListComponent(props) {
    let theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
       <div>
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
               <Tooltip title="API explore" arrow placement="bottom">
                   <StyledIconButton onClick={handleClickOpen}>
                       <ExploreIcon color='primary'/>
                   </StyledIconButton>
               </Tooltip>
               <Tooltip title="document subject" arrow placement="bottom">
                   <StyledIconButton>
                       <SubjectIcon color='primary'/>
                   </StyledIconButton>
               </Tooltip>
               <Tooltip title="wiki text" arrow placement="bottom">
                   <StyledIconButton>
                       <AddCommentIcon color='primary'/>
                   </StyledIconButton>
               </Tooltip>
               <Tooltip title="copy document link" arrow placement="bottom">
                   <StyledIconButton>
                       <InsertLinkIcon color='primary'/>
                   </StyledIconButton>
               </Tooltip>
               <Tooltip title="copy document" arrow placement="bottom">
                   <StyledIconButton>
                       <CopyAllIcon color='primary'/>
                   </StyledIconButton>
               </Tooltip>
               <Tooltip title="copy document" arrow placement="bottom">
                   <StyledIconButton>
                       <TableViewIcon color='primary'/>
                   </StyledIconButton>
               </Tooltip>
               <Tooltip title="copy document" arrow placement="bottom">
                   <StyledIconButton>
                       <VisibilityIcon color='primary'/>
                   </StyledIconButton>
               </Tooltip>
               <Tooltip title="copy document" arrow placement="bottom">
                   <StyledIconButton>
                       <DeleteForeverIcon color='error'/>
                   </StyledIconButton>
               </Tooltip>
           </Stack>

           <Dialog
               fullScreen
               open={open}
               onClose={handleClose}
               TransitionComponent={Transition}
           >
               <AppBar sx={{ position: 'relative' }}>
                   <Toolbar>
                       <IconButton
                           edge="start"
                           color="inherit"
                           onClick={handleClose}
                           aria-label="close"
                       >
                           <Close />
                       </IconButton>
                       <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                           Sound
                       </Typography>
                       <Button autoFocus color="inherit" onClick={handleClose}>
                           save
                       </Button>
                   </Toolbar>
               </AppBar>
               <ExploreComponent />
           </Dialog>
       </div>
    )
}