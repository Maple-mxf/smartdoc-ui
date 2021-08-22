import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import React from "react";

export const IncreaseFormLineComponent = (props) => {
    const {
        classes,
        id,
        showDelBtn,
        clickValueTextFieldFunc,
        clickDelBtnFunc,
        lastItemId,
        value1,
        value2,
        valueOnChange
    } = props;
    return (
        <div>
            <TextField id="key-basic"
                       label="Key"
                       color="primary"
                       style={{width: '20%'}}
                       value={value1}
                       size='small'
                       placeholder="Key"
                       onChange={valueOnChange('value1', id)}
            />
            <TextField id="Value-basic"
                       label="Value"
                       color="primary"
                       style={{width: '30%'}}
                       className={classes.formDataTextField}
                       size='small'
                       value={value2}
                       placeholder="Value"
                       onChange={valueOnChange('value2', id)}
                       onClick={(lastItemId === id) ? clickValueTextFieldFunc(id) : null}
            />
            {
                showDelBtn ?
                    <IconButton aria-label="delete"
                                className={classes.margin}
                                color='secondary'
                                size='small'
                                onClick={clickDelBtnFunc(id)}
                    >
                        <HighlightOffIcon fontSize="medium"/>
                    </IconButton>
                    : null
            }
        </div>
    )
}