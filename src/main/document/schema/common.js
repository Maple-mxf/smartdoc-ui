import Grid from "@mui/material/Grid";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React from "react";
import {styled} from "@mui/material/styles";

const StyledRemoveIcon = styled(RemoveCircleOutlineIcon)(({theme}) => ({
    '&:hover': {
        transform: `scale(1.03)`,
        cursor: 'hand'
    },
}));

const StyledAddIcon = styled(AddCircleOutlineIcon)(({theme}) => ({
    '&:hover': {
        transform: `scale(1.03)`,
        cursor: 'hand'
    },
}));

export function ActionComponent(props) {
    const {params, onRemove} = props;
    return (
        <Grid container spacing={0}>
            <Grid item xs={12} sm={12}>
                <StyledRemoveIcon color="error" onClick={() => {
                    onRemove(params.row.id)
                }}/>
            </Grid>

        </Grid>
    )
}