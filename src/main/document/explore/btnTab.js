import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {DOC_REDUCER_NAMESPACE, } from "../../../util/constants";
import {changeParamTypeTag} from "../store/actionCreators";
import {FormDataParamBlock, RawComponent} from "./btnTabData";

export const BtnTabComponent = (props) => {
    const {classes} = props;
    const bodyParamTypeTabs = useSelector(state => state[DOC_REDUCER_NAMESPACE].bodyParamTypeTabs);
    const dispatch = useDispatch();

    const onClickTab = (id)=>{
        return ()=>{
            dispatch(changeParamTypeTag(
                bodyParamTypeTabs.map((item,index) => {
                    const newItem =  JSON.parse(JSON.stringify(item));
                   if(item.id === id ) {
                       newItem.color ='primary'
                       newItem.active=true
                   }else{
                       newItem.color ='default'
                       newItem.active=false
                   }
                    return newItem
            })))
        }
    }

    return (
        <div>
           <div>
               <ButtonGroup size="large" color="primary"         variant="contained"
                            aria-label="large outlined primary button group">
                   {
                       bodyParamTypeTabs.map((item,index) =>
                           (<Button key={item.id}
                                    color={item.color}
                                    onClick={onClickTab(item.id)}
                           >
                               {item.name}
                           </Button>))
                   }
               </ButtonGroup>
           </div>
            <div style={{marginTop:'1vh'}}>
            {
                    bodyParamTypeTabs.map((item,index) => {
                        if (item.id === 1){
                            return <RawComponent classes={classes} open={item.active}/>
                        }
                        if (item.id === 2){
                            return <FormDataParamBlock classes={classes} open={item.active}/>
                        }
                        if (item.id === 3){
                            return <FormDataParamBlock classes={classes}  open={item.active}/>
                        }
                        return null
                    })
            }
            </div>
        </div>
    )
}