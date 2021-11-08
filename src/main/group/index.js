import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {getSwitchLeftMenuAction} from "../../store/actionCreators";

export default function Group(props){
    const dispatch = useDispatch();
    const {nodeId}  = props;
    useEffect(() => {
        dispatch(getSwitchLeftMenuAction(nodeId))
    });
    return (
        <div>
            <h1>Group</h1>
        </div>
    )
}