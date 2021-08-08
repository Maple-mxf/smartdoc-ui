import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import {PROJECT_REDUCER_NAMESPACE} from '../../util/constants'
import {useDispatch, useSelector} from "react-redux";
import {closeCreateProjectWindow, createProject } from './store/actionCreators'
import Grid from "@material-ui/core/Grid";
import {parseResponseMsg} from "../../util/http";
import {useSnackbar} from "notistack";
import {ErrorVariant, SuccessVariant} from "../../common/tip";
import {FetchProjectList} from "./index";


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
    const {enqueueSnackbar} = useSnackbar();
    const handleVariant = (msg, variant) => {
        enqueueSnackbar(msg, {variant});
    };

    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(closeCreateProjectWindow)
    };
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const {current: descriptionElement} = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);


    const [formData, setFormData] =   React.useState({
        name: '',
        desc: '',
        type: 'REST_WEB'
    })

    const handleChange = (event) => {
        formData[event.target.name] = event.target.value;
        setFormData(formData);
    }

    const {page,size} = useSelector(state => state[PROJECT_REDUCER_NAMESPACE]);

    const handleSubmit = (event) => {
        createProject(formData).then(
            (res) => {
                let {succ, errorMsg, data} = parseResponseMsg(res)
                if (!succ) {
                    handleVariant(errorMsg, ErrorVariant)
                } else {
                    handleVariant("New Project Success", SuccessVariant)
                    handleClose()
                    FetchProjectList(page,size,dispatch,handleVariant)
                }
            },
            (err) => {
                handleVariant(err, ErrorVariant)
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
                <DialogContent>
                    <form
                        autoComplete="off"
                        className={classes.root}
                    >
                        <Grid item xs={12} sm={10}>
                            <TextField
                                required
                                id="Name"
                                label="Name"
                                name="name"
                                variant="outlined"
                                className={classes.margin}
                                autoFocus
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}/>
                        <Grid item xs={12} sm={10}>
                            <TextField
                                required
                                className={classes.margin}
                                id="filled-required"
                                name="desc"
                                label="Description"
                                variant="outlined"
                                onChange={handleChange}
                                multiline
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}/>

                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button   onClick={handleSubmit} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </form>

                </DialogContent>
            </Dialog>
        </div>
    );
}
