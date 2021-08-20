import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {DOC_REDUCER_NAMESPACE,} from "../../../util/constants";
import {changeParamTypeTag} from "../store/actionCreators";
import {FormDataParamBlock, RawComponent} from "./btnTabData";
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from '@material-ui/core/InputBase';
import withStyles from "@material-ui/core/styles/withStyles";


const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

export const BtnTabComponent = (props) => {
    const {classes} = props;
    const bodyParamTypeTabs = useSelector(state => state[DOC_REDUCER_NAMESPACE].bodyParamTypeTabs);
    const dispatch = useDispatch();
    const [codeType, setCodeType] = React.useState("json");

    const handleChange = (event) => setCodeType(event.target.value);

    const onClickTab = (id) => {
        return () => {
            dispatch(changeParamTypeTag(
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
                            <FormControl style={{marginLeft:'2vh'}}  color='primary' size='small' >
                                <NativeSelect
                                    id="demo-customized-select-native"
                                    value={codeType}
                                    onChange={handleChange}
                                    input={<BootstrapInput />}
                                >
                                    <option value='json'>json</option>
                                    <option value='xml'>xml</option>
                                </NativeSelect>
                            </FormControl>
                        ) : null
                }

            </div>
            <div style={{marginTop: '1vh'}}>
                {
                    bodyParamTypeTabs.map((item, index) => {
                        if (item.id === 1) {
                            return <RawComponent key={index} classes={classes} open={item.active} codeType={codeType}/>
                        }
                        if (item.id === 2) {
                            return <FormDataParamBlock key={index}  classes={classes} open={item.active}/>
                        }
                        if (item.id === 3) {
                            return <FormDataParamBlock key={index}  classes={classes} open={item.active}/>
                        }
                        return null
                    })
                }
            </div>
        </div>
    )
}