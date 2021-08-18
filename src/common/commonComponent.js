import GridOffIcon from "@material-ui/icons/GridOff";
import React from "react";

export const EmptyTipComponent = (props)=>{
    return (
        <div style={{width:'100%',height:'100%',textAlign:'center',marginTop:'15vh',color:'gray'}}>
            <div>
                <GridOffIcon fontSize="large" />
            </div>
            <div>
                No data
            </div>
        </div>
    )
}