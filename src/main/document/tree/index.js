import React from 'react';
import ControlledTreeView from "./component/TableContentComponent";
import {styled} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {Container} from "@mui/material";
import { makeStyles } from '@material-ui/styles';
import {useTheme} from "@material-ui/core";

export const LeftTreeWidth = 350;
export const LeftTreeHeight = 700;

const Drawer = styled(MuiDrawer)(({theme}) => ({
        width: LeftTreeWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        overflowX: 'hidden',
    }),
);


const useStyles =  makeStyles({
    drawer: {
        width: "100%"
    },
    drawerPaper: {
        width: 350,
    }
});

// DocumentNavigationComponent
export default function DocumentNavigationComponent() {
    const classes = useStyles();
    const theme = useTheme()

    console.log("rerender DocumentNavigationComponent")

    return (
        <Container maxWidth={null}>
            <div
                id="drawer-container"
                style={{
                    position: "relative",
                    marginLeft: "0px",
                    width: 350,
                    height: "86vh",
                    border:'solid',
                    borderWidth:'0.5px',
                    borderColor:theme.palette.divider,
                }}
            >
                <Drawer
                    className={classes.drawer}
                    open
                    variant="permanent"
                    anchor="left"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    PaperProps={{
                        style: { position: "absolute" }
                    }}
                    BackdropProps={{ style: { position: "absolute" } }}
                    ModalProps={{
                        container: document.getElementById("drawer-container"),
                        style: { position: "absolute" }
                    }}
                >
                   <ControlledTreeView />
                </Drawer>
            </div>
        </Container>
    )
}







