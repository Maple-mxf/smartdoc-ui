import {Box} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import React from "react";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";
import {createSnippets} from "../store/actionCreators";
import {parseResponseMsg} from "../../../util/http";
import {ErrorVariant} from "../../../common/tip";
import {FetchDocById} from "./ApiContentComponent";
import {SnippetType_RequestHeader} from "../store/constants";
import {useDispatch} from "react-redux";
import {useSnackbar} from "notistack";
import RequestHeaderEditableViewComponent from "./RequestHeaderEditableViewComponent";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

// 数据表格左侧Tab LeftTableTabComponent
export default function LeftTableTabComponent(props) {
    const {doc} = props;
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const handleVariant = (msg, variant) => {
        enqueueSnackbar(msg, {variant});
    };

    // 创建一个临时的
    const newTempHeaderFunc = (doc) => {
        createSnippets(doc.id, SnippetType_RequestHeader, {
            "field": "Accept",
            "value": "*",
            "optional": true,
            "description": "返回数据格式约定"
        }).then(
            res => {
                let {succ, errorMsg, data} = parseResponseMsg(res)
                if (!succ) {
                    handleVariant(errorMsg, ErrorVariant)
                    return
                }
                FetchDocById(doc.id, dispatch)
            },
            err => {
                handleVariant(JSON.stringify(err), ErrorVariant)
            }
        )
    }

    return (
        <Box sx={{width: '100%', typography: 'body1', border: 1, borderColor: 'divider'}}>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Request Header" value="1"/>
                        <Tab label="Response Body" value="2"/>
                    </TabList>
                </Box>
                <TabPanel value="1" sx={{height:'50vh'}}>
                    <RequestHeaderEditableViewComponent doc={doc}/>
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
        </Box>
    )
}