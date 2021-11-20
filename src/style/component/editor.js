import {styled} from "@mui/material/styles";
import SaveIcon from '@mui/icons-material/Save';
import React from "react";
import {useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import AceEditor from "react-ace";
import Tooltip from "@mui/material/Tooltip";

const StyledSaveButton = styled(SaveIcon)(({theme}) => ({
    color: theme.palette.action,
    "&:hover": {
        transform: `scale(1.1)`,
        cursor: 'pointer',
        color: theme.palette.primary.main,
    }
}));

export default function CodeEditorComponent(props) {
    const {tag, language, codeContent, setCodeContent} = props;
    const handleContentChange = (code) => setCodeContent(code);
    let theme = useTheme();
    return (
        <Box sx={{position: 'relative',}}>
            <AceEditor
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'solid',
                    borderWidth: '0.5px',
                    borderColor: `${theme.palette.divider}`
                }}
                mode={language}
                theme='github'
                name='basic-code-editor'
                value={codeContent}
                onChange={handleContentChange}
                fontSize={15}
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
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '1px',
                    right: '1%',
                    color: theme.palette.primary.main,
                    fontSize: '14px',
                    fontStyle: 'italic',
                    fontWeight: 'medium',
                    borderRadius: '2rem'
                }}>
                {tag}
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: '1px',
                    right: '1%',
                    color: theme.palette.primary.main,
                    fontSize: '14px',
                    fontStyle: 'italic',
                    fontWeight: 'medium',
                    borderRadius: '2rem'
                }}>
                <Tooltip title="save" arrow placement="bottom">
                    <StyledSaveButton color='action'/>
                </Tooltip>
            </Box>
        </Box>
    )
}