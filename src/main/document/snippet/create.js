import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    }
}));

// 创建Snippet的表单
export default function CreateSnippetForm(props) {
    const {
        title,
        text,
        open,
        showOptionalSelector,
        handleClose,
        handleSubmit
    } = props;

    const classes = useStyles();

    const initFormData={
        field:"",
        optional:false,
        value:"",
        description:""
    }

    const [formData, setFormData] = React.useState( initFormData)

    const handleChange = (event) => {
        formData[event.target.name] = event.target.value;
        setFormData(formData);
    }

    const setFormDateEmptyFunc=()=>{
        setFormData(initFormData)
    }

    return (
        <div>
            <form action="">
                <Dialog open={open} onClose={handleClose(setFormDateEmptyFunc)} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{text}</DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="field"
                            name="field"
                            label="Field"
                            type="field"
                            className={classes.formControl}
                            onChange={handleChange}
                            fullWidth
                        />
                        {
                            showOptionalSelector ? (
                                <FormControl fullWidth={true} className={classes.formControl}>
                                    <InputLabel htmlFor="demo-dialog-native">Optional</InputLabel>
                                    <Select
                                        native
                                        name="optional"
                                        input={<Input id="demo-dialog-native"/>}
                                        onChange={handleChange}
                                    >

                                        <option value={false}>false</option>
                                        <option value={true}>true</option>
                                    </Select>
                                </FormControl>
                            ) : null
                        }

                        <TextField
                            className={classes.formControl}
                            margin="dense"
                            id="value"
                            name="value"
                            label="Value"
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            className={classes.formControl}
                            margin="dense"
                            name="description"
                            onChange={handleChange}
                            id="description"
                            label="Description"
                            fullWidth
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose(setFormDateEmptyFunc)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit(formData,setFormDateEmptyFunc)} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </div>
    );
}
