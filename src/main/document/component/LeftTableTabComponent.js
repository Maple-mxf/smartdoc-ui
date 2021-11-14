import {Box} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import React from "react";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";
import MainDataGrid from "../../../style/component/datagrid";
import {createSnippets} from "../store/actionCreators";
import {parseResponseMsg} from "../../../util/http";
import {ErrorVariant} from "../../../common/tip";
import {FetchDocById} from "./ApiContentComponent";
import {SnippetType_RequestHeader} from "../store/constants";
import {useDispatch} from "react-redux";
import {useSnackbar} from "notistack";
import wrapperWithID from "../../../common/wrapperDocRows";

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`
    };
}

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({theme}) => ({
    textTransform: 'none',
    textAlign: 'left',
    minWidth: 0,
    [theme.breakpoints.up('sm')]: {
        minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    '&.Mui-focusVisible': {
        backgroundColor: '#d1eaff',
    },
    color: theme.palette.text.dark,
    "&:hover": {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-selected': {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightBold,
        fontsize: '18px',
        backgroundColor: theme.palette.action.hover,
    },
}));


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            style={{width: '85%'}}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 1}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

// 数据表格左侧Tab LeftTableTabComponent
export default function LeftTableTabComponent(props) {
    const {doc} = props;
    const [value, setValue] = React.useState(0);

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
        <Box
            sx={{
                flexGrow: 1,
                bgcolor: "background.paper",
                display: "flex",

            }}
        >

            <Tabs
                orientation="vertical"
                // variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{borderRight: 1, borderColor: "divider", width: '15%'}}

            >
                <AntTab label="Item One" {...a11yProps(0)} />
                <AntTab label="Item Two" {...a11yProps(1)} />
                <AntTab label="Item Three" {...a11yProps(2)} />
                <AntTab label="Item Four" {...a11yProps(3)} />
                <AntTab label="Item Five" {...a11yProps(4)} />
                <AntTab label="Item Six" {...a11yProps(5)} />
                <AntTab label="Item Seven" {...a11yProps(6)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <MainDataGrid
                    rows={wrapperWithID(doc.requestHeaderDescriptor)}
                    /* columns={getHeaderSchema(true,
                         () => newTempHeaderFunc(doc),
                         (docId) => {
                             console.info(docId)
                         }
                     )}*/
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item Five
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Six
            </TabPanel>
            <TabPanel value={value} index={6}>
                Item Seven
            </TabPanel>
        </Box>
    )
}