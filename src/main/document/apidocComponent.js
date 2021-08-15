import Grid from "@material-ui/core/Grid";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {darcula} from "react-syntax-highlighter/dist/cjs/styles/prism";
import {DocDataEditDataGrid} from "./apidocDataEditGrid";
import {getRequestHeaderRowId, HeaderSchema} from "./tableSchema";
import {useSnackbar} from "notistack";
import {batchDeleteSnippets, createSnippets, editDocRequestHeader } from "./store/actionCreators";
import {parseResponseMsg} from "../../util/http";
import {useDispatch} from "react-redux";
import {ErrorVariant, SuccessVariant, WarningVariant} from "../../common/tip";
import CreateSnippetForm from "./snippet/create";
import {FetchDocById} from "./apicontent";
import Tab from '@material-ui/core/Tab';
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import {SnippetType_RequestHeader, SnippetType_ResponseHeader} from "./store/constants";
import AssignmentIcon from '@material-ui/icons/Assignment';
export const ApiDocComponent = (props) => {
    const {doc} = props

    const [tabValue,setTabValue] =React.useState('1')
    const [openCreateSnippetForm, setOpenCreateSnippetForm] = React.useState(false)
    const [snippetFormTitle, setSnippetFormTitle] = React.useState("CREAT")
    const [snippetFormText, setSnippetFormText] = React.useState("")
    const [snippetFormShowOptionalSelector, setSnippetFormShowOptionalSelector] = React.useState(true)

    const {enqueueSnackbar} = useSnackbar();
    const handleVariant = (msg, variant) => {
        enqueueSnackbar(msg, {variant});
    };
    const dispatch = useDispatch();

    const handlerCreateSnippetFormClose = (setFormDateEmptyFunc) => {
        return ()=>{
            setOpenCreateSnippetForm(false)
            setFormDateEmptyFunc()
        }
    }
    
    const handleTagChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleSubmitData = (docId,snippetType,dispatch,handleVariant) => {
        return (formData,setFormDateEmptyFunc) => {
            return () => {
                // TODO  临时代码
                if (formData.field === undefined || formData.field.length ===0){
                    handleVariant("Field required", WarningVariant)
                    return
                }
               createSnippets(docId,snippetType,formData)
                   .then(
                       res =>{
                           let {succ, errorMsg, data } = parseResponseMsg(res)
                           if (!succ) {
                               handleVariant(errorMsg, ErrorVariant)
                               return
                           }
                           setOpenCreateSnippetForm(false)
                           handleVariant("Completed", SuccessVariant)
                           FetchDocById(docId,dispatch)
                           setFormDateEmptyFunc()
                       },
                       err => {
                           handleVariant(JSON.stringify(err), ErrorVariant)
                       }
                   )
           }
        }
    }

    const setDialogPropFuncs ={
        setOpenCreateSnippetForm,
        setSnippetFormTitle, setSnippetFormText,
        setSnippetFormShowOptionalSelector
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>

                <CreateSnippetForm
                    title={snippetFormTitle}
                    text={snippetFormText}
                    open={openCreateSnippetForm}
                    showOptionalSelector={snippetFormShowOptionalSelector}
                    handleClose={handlerCreateSnippetFormClose}
                    handleSubmit={handleSubmitData(doc.id, SnippetType_RequestHeader,dispatch,handleVariant)}
                />

                <Typography variant="subtitle1" gutterBottom>
                    Request Example
                </Typography>

                <SyntaxHighlighter language="http" style={darcula} showLineNumbers={true} wrapLongLines={true}>
                    {doc.requestFakeCodeSample === undefined ? "" : doc.requestFakeCodeSample}
                </SyntaxHighlighter>

                <br/>

                <Typography variant="subtitle1" gutterBottom>
                    Response Example
                </Typography>

                <SyntaxHighlighter language="json" style={darcula} showLineNumbers={true} wrapLongLines={true}>
                    {doc.responseFakeCodeSample === undefined ? "" : doc.responseFakeCodeSample}
                </SyntaxHighlighter>

                <TabContext value={tabValue}>
                    <TabList   aria-label="simple tabs example" onChange={handleTagChange}>
                        <Tab label="Request Header"  value="1" icon={<AssignmentIcon />} />
                        <Tab label="Request Header" value="2"  />
                    </TabList>

                    <TabPanel value='1' index={0}>
                        <DocDataEditDataGrid rows={ doc.requestHeaderDescriptor }
                                             columns={ HeaderSchema }
                                             handleVariant={handleVariant}
                                             getRowIdFunc={getRequestHeaderRowId}
                                             editCommitFunc={editDocRequestHeaderFunc(doc.id, dispatch, handleVariant)}
                                             batchDeleteFunc={batchDeleteFunc(doc.id, SnippetType_RequestHeader, dispatch, handleVariant,)}
                                             createSnippetFunc={createSnippetFunc(
                                                 doc.id,
                                                 SnippetType_RequestHeader,
                                                 handleVariant,
                                                 dispatch,
                                                 setDialogPropFuncs,
                                                 {
                                                     title: "Create Header",
                                                     text: "",
                                                     showOptionalSelector: true
                                                 }
                                             )}
                        />
                    </TabPanel>
                    <TabPanel value='2' index={1}>
                        <DocDataEditDataGrid rows={ doc.responseHeaderDescriptors }
                                             columns={ HeaderSchema }
                                             handleVariant={handleVariant}
                                             getRowIdFunc={getRequestHeaderRowId}
                                             editCommitFunc={editDocRequestHeaderFunc(doc.id, dispatch, handleVariant)}
                                             batchDeleteFunc={batchDeleteFunc(doc.id, SnippetType_ResponseHeader, dispatch, handleVariant,)}
                                             createSnippetFunc={createSnippetFunc(doc.id, SnippetType_ResponseHeader,
                                                 handleVariant, dispatch,
                                                 setDialogPropFuncs,
                                                 {
                                                     title: "Create ",
                                                     text: "",
                                                     showOptionalSelector: true
                                                 }
                                             )}
                        />
                    </TabPanel>
                </TabContext>

            </Grid>
        </Grid>
    )
}

const batchDeleteFunc = (docId, snippetType, dispatch, handleVariant) => {
    return (param) => {
        let data = {
            "snippetIds": param
        };

        if (param === undefined || param.length === 0) {
            handleVariant("Non select rows", WarningVariant)
            return
        }

        data['snippetType'] = snippetType;
        batchDeleteSnippets(docId, data)
            .then(
                res => {
                    let {succ, errorMsg, data} = parseResponseMsg(res)
                    if (!succ) {
                        handleVariant(errorMsg, "error")
                        return
                    }
                    handleVariant("Completed", SuccessVariant)
                    FetchDocById(docId,dispatch)
                },
                err => {
                    handleVariant(JSON.stringify(err), ErrorVariant)
                }
            )
    }
}

// 编辑requestHeader
const editDocRequestHeaderFunc = (docId, dispatch, handleVariant) => {
    return (params, event) => {

        let data = {...params.row}
        data[params.field] = params.value

        editDocRequestHeader(docId, data)
            .then(
                res => {
                    let {succ, errorMsg, data} = parseResponseMsg(res)
                    if (!succ) {
                        handleVariant(errorMsg, ErrorVariant)
                        return
                    }
                    handleVariant("Completed", SuccessVariant)
                    FetchDocById(docId,dispatch)
                },
                err => {
                    let errString = ""
                    if (err) errString = JSON.stringify(err)
                    handleVariant(errString, ErrorVariant)
                }
            )
    }
}

const createSnippetFunc = (docId, snippetType, dispatch, handleVariant,
                           // extra props
                           setDialogPropFuncs, dialogProps) => {

    const {
        setOpenCreateSnippetForm, setSnippetFormTitle, setSnippetFormText,
        setSnippetFormShowOptionalSelector
    } = setDialogPropFuncs;
    const {title, text, showOptionalSelector} = dialogProps;

    return () => {
        setOpenCreateSnippetForm(true)
        setSnippetFormTitle(title)
        setSnippetFormText(text)
        setSnippetFormShowOptionalSelector(showOptionalSelector)
    }
}