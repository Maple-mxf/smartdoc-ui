import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
        valueOnChange,
        keyPlaceholder,
        autoCompleteOptions
    } = props;
    return (
        <div>
            {
                autoCompleteOptions?
                    <Autocomplete
                        style={{width: '20%'}}
                        id="free-solo-demo"
                        freeSolo
                        size='small'
                        options={autoCompleteOptions.map((option) => option.title)}
                        renderInput={(params) => (
                            <TextField {...params}
                                       id="key-basic"
                                       size='small'
                                       color="primary"

                                       label={keyPlaceholder}
                                       placeholder={keyPlaceholder}
                                       onChange={valueOnChange('value1', id)}
                            />

                        )}
                    />:<TextField id="key-basic"
                                  label={keyPlaceholder}
                                  color="primary"
                                  style={{width: '20%'}}
                                  value={value1}
                                  size='small'
                                  placeholder={keyPlaceholder}
                                  onChange={valueOnChange('value1', id)}
                    />
            }

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