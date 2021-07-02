import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import {PROJECT_REDUCER_NAMESPACE} from '../../common/constants'
import {useDispatch, useSelector} from "react-redux";
import {closeCreateProjectWindow, createProject} from './store/actionCreators'
import Grid from "@material-ui/core/Grid";
import {parseResponseMsg} from "../../common/http";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '50ch',
        },
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function CreateProjectComponent() {
    const classes = useStyles();
    const open = useSelector(state => state[PROJECT_REDUCER_NAMESPACE].openNewProjectForm);

    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(closeCreateProjectWindow)
    };
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const [value, setValue] = React.useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const handleSubmit = (event) => {
        createProject({"name":"a"}).then(
            (res) => {
                let {succ,errorMsg,data} = parseResponseMsg(res)
                if (!succ){
                    alert(errorMsg)
                }
            },
            (err) => {
                alert(err)
            }
            )
    }

    return (
        <div className={classes.root}>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">New Project</DialogTitle>
                <DialogContent  >
                    <form className={classes.root} noValidate autoComplete="off">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={10}>
                                <TextField id="title" label="Name" color="secondary" />
                            </Grid>
                            <Grid item xs={12} sm={2} />
                            <Grid item xs={12} sm={10}>
                                <TextField
                                    id="standard-multiline-flexible"
                                    label="Description"
                                    multiline
                                    maxRows={6}
                                    value={value}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
