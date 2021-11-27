import React from "react";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import {HighlightOff} from "@mui/icons-material";

export const IncreaseFormLineComponent = (props) => {
    const {
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
        <Grid container spacing={1}>
            <Grid item xs={12} sm={3} >
                {
                    autoCompleteOptions?
                        <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            size='small'
                            fullWidth
                            options={autoCompleteOptions.map((option) => option.title)}
                            renderInput={(params) => (
                                <TextField {...params}
                                           id="key-basic"
                                           size='small'
                                           color="primary"
                                           value={value1}
                                           label={keyPlaceholder}
                                           placeholder={keyPlaceholder}
                                           onChange={valueOnChange('value1', id)}
                                />

                            )}
                        />:<TextField id="key-basic"
                                      label={keyPlaceholder}
                                      color="primary"
                                      fullWidth
                                      value={value1}
                                      size='small'
                                      placeholder={keyPlaceholder}
                                      onChange={valueOnChange('value1', id)}
                        />
                }

            </Grid>

            <Grid item xs={12} sm={3} >
                <TextField id="Value-basic"
                           label="Value"
                           color="primary"
                           fullWidth
                           size='small'
                           value={value2}
                           placeholder="Value"
                           onChange={valueOnChange('value2', id)}
                           onClick={(lastItemId === id) ? clickValueTextFieldFunc(id) : null}
                />

            </Grid>
            <Grid item xs={12} sm={1} >
                {
                    showDelBtn ?
                        <IconButton aria-label="delete"
                                    color='secondary'
                                    size='small'
                                    onClick={clickDelBtnFunc(id)}
                        >
                            <HighlightOff fontSize="medium"/>
                        </IconButton>
                        : null
                }
            </Grid>
        </Grid>
    )
}