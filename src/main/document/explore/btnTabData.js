import AceEditor from "react-ace";
import React from "react";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";


export const RawComponent = (props) =>{
    const {open} = props;
    if (!open) return null;
    return (
        <div>
            <AceEditor
                style={{
                    height: '62vh',
                    width: '100%',
                }}
                placeholder='Start Coding'
                mode='json'
                theme='monokai'
                name='basic-code-editor'

                fontSize={20}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}

                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 4,
                }}
            />
        </div>
    )
}

export const FormDataParamBlock = (props) => {
    const {classes,open} = props;
    const [formLinesData, setFormLinesData] = React.useState([
        {
            id: 0,
            showDelBtn: false,
            value1: "",
            value2: ""
        }
    ])

    const clickValueTextFieldFunc = (id) => {
        return () => {
            const newFormLinesData = [...formLinesData, {
                id: id + 1,
                showDelBtn: true,
                value1: "",
                value2: ""
            }]
            setFormLinesData(newFormLinesData)
        }
    }

    const clickDelBtnFunc = (id) => {
        return () => setFormLinesData(formLinesData.filter(item => item.id !== id))
    }

    const valueOnChange = (valueType, id) => {
        return (e) => {
            const value = e.target.value;
            const targetObj = formLinesData.find(t => t.id === id)
            const newObj = JSON.parse(JSON.stringify(targetObj));
            if (undefined === targetObj) return;

            const newFormLinesData = []
            if ('value1' === valueType) {
                newObj.value1 = value;
            }
            if ('value2' === valueType) {
                newObj.value2 = value;
            }

            formLinesData.forEach((item, index) => {
                if (item.id === id) {
                    newFormLinesData.push(newObj)
                } else {
                    newFormLinesData.push(item,)
                }
            })

            setFormLinesData(newFormLinesData)
        }
    }

    if (!open)return null;

    return (
        <React.Fragment>
            <List className={classes.list}>
                {
                    formLinesData.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <FormDataLine key={index}
                                              id={item.id}
                                              classes={classes}
                                              showDelBtn={item.showDelBtn}
                                              clickValueTextFieldFunc={clickValueTextFieldFunc}
                                              clickDelBtnFunc={clickDelBtnFunc}
                                              lastItemId={formLinesData[formLinesData.length - 1].id}
                                              valueOnChange={valueOnChange}
                                              value1={item.value1}
                                              value2={item.value2}
                                />
                            </React.Fragment>

                        )
                    })
                }
            </List>
        </React.Fragment>
    )
}

const FormDataLine = (props) => {
    const {
        classes, id, showDelBtn, clickValueTextFieldFunc, clickDelBtnFunc, lastItemId,
        value1, value2, valueOnChange
    } = props;
    return (
        <div>
            <TextField id="key-basic"
                       label="Key"
                       color="primary"
                       style={{width: '20%'}}
                       margin="dense"
                       value={value1}
                       className={classes.formDataTextField}
                       placeholder="Key"
                       onChange={valueOnChange('value1', id)}
            />
            <TextField id="Value-basic"
                       label="Value"
                       color="primary"
                       style={{width: '30%'}}
                       className={classes.formDataTextField}
                       margin="dense"
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
                                onClick={clickDelBtnFunc(id)}
                    >
                        <HighlightOffIcon fontSize="medium"/>
                    </IconButton>
                    : null
            }
        </div>
    )
}