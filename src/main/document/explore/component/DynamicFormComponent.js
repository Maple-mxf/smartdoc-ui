import React from "react";
import {IncreaseFormLineComponent} from "./IncreaseFormLineComponent";
import List from "@mui/material/List";

export const DynamicFormComponent = (props) => {
    const {classes, open, formLines,setFormLines,keyPlaceholder,autoCompleteOptions } = props;

    const clickValueTextFieldFunc = (id) => {
        return () => {
            const newFormLines = [...formLines, {
                id: id + 1,
                showDelBtn: true,
                value1: "",
                value2: ""
            }]
            setFormLines(newFormLines)
        }
    }

    const clickDelBtnFunc = (id) => {
        return () => setFormLines(formLines.filter(item => item.id !== id))
    }

    const valueOnChange = (valueType, id) => {
        return (e) => {
            const value = e.target.value;
            const newFormLine = {...formLines.find(t => t.id === id)}
            const newFormLines = []

            if ('value1' === valueType) {
                newFormLine.value1 = value;
            }
            if ('value2' === valueType) {
                newFormLine.value2 = value;
            }
            formLines.forEach((item, index) => {
                if (item.id === id) {
                    newFormLines.push(newFormLine)
                } else {
                    newFormLines.push(item,)
                }
            })
            setFormLines(newFormLines)
        }
    }

    if (!open) return null;

    return (
        <List className={classes.list}>
            {
                formLines.map((item, index) => {
                    return (
                        <IncreaseFormLineComponent key={index}
                                                   id={item.id}
                                                   keyPlaceholder={keyPlaceholder}
                                                   classes={classes}
                                                   showDelBtn={item.showDelBtn}
                                                   clickValueTextFieldFunc={clickValueTextFieldFunc}
                                                   clickDelBtnFunc={clickDelBtnFunc}
                                                   lastItemId={formLines[formLines.length - 1].id}
                                                   valueOnChange={valueOnChange}
                                                   value1={item.value1}
                                                   value2={item.value2}
                                                   autoCompleteOptions={autoCompleteOptions}
                        />
                    )
                })
            }
        </List>
    )
}