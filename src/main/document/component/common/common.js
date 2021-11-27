import {styled} from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import {Box} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import CodeEditorComponent from "../../../../style/component/editor";

export const StyledTab = styled(Tab)(({theme}) => ({
    '&:hover': {
        color: `${theme.palette.primary.main}`,
        backgroundColor: `${theme.palette.action.hover}`
    },
}));


export function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 0, pt: 1}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function EditableCodeTextComponent(props) {
    const {codeText,language,tag} = props;
    const [codeContent, setCodeContent] = React.useState(codeText);
    return (
        <CodeEditorComponent
            tag={tag}
            codeContent={codeContent}
            setCodeContent={setCodeContent}
            language={language}
        />
    )
}