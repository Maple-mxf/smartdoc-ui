import {useDispatch, useSelector} from "react-redux";
import {DOC_REDUCER_NAMESPACE} from "../../../../util/constants";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import React from "react";
import {changeParamTypeTagAction} from "../../store/actionCreators";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import {BootstrapInputComponent} from "./BootstrapInputComponent";


export const RequestBodyTypeSelectorComponent = (props) => {
    const {codeType,setCodeType} = props;
    const handleChange = (event) => setCodeType(event.target.value);
    const bodyParamTypeTabs = useSelector(state => state[DOC_REDUCER_NAMESPACE].bodyParamTypeTabs);
    const dispatch = useDispatch();

    const onClickTab = (id) => {
        return () => {
            dispatch(changeParamTypeTagAction(
                bodyParamTypeTabs.map((item, index) => {
                    const newItem = JSON.parse(JSON.stringify(item));
                    if (item.id === id) {
                        newItem.color = 'primary'
                        newItem.active = true
                    } else {
                        newItem.color = 'default'
                        newItem.active = false
                    }
                    return newItem
                })))
        }
    }
    return (
        <div>
            <ButtonGroup size="large" color="primary" variant="contained"
                         aria-label="large outlined primary button group">
                {
                    bodyParamTypeTabs.map((item, index) =>
                        (<Button key={item.id}
                                 color={item.color}
                                 onClick={onClickTab(item.id)}
                                 size="medium"
                        >
                            {item.name}
                        </Button>))
                }

            </ButtonGroup>

            {
                bodyParamTypeTabs.find(item => item.name === 'raw' && item.active) ?
                    (
                        <FormControl style={{marginLeft: '2vh'}} color='primary' size='small'>
                            <NativeSelect
                                id="demo-customized-select-native"
                                value={codeType}
                                onChange={handleChange}
                                input={<BootstrapInputComponent/>}
                            >
                                <option value='json'>json</option>
                                <option value='xml'>xml</option>
                            </NativeSelect>
                        </FormControl>
                    ) : null
            }
        </div>
    )
}