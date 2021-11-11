import {styled} from "@mui/material/styles";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {Box} from "@mui/material";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import docco from "react-syntax-highlighter/dist/cjs/styles/prism";
import React from "react";
import { useTheme} from "@mui/material";

const StyledCopyButton = styled(ContentCopyIcon)(({theme}) => ({
    color: theme.palette.action,
    "&:hover": {
        transform: `scale(1.1)`,
        cursor:'pointer',
        color: theme.palette.primary.main,
    }
}));

export default function  CustomCodeComponent(props){
    const {codeText,language,tag} = props;
    let theme = useTheme();
    return (
        <Box sx={{
            position: 'relative',
        }}>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '0px',
                    right: '1px',
                    // backgroundColor: theme.palette.primary.main,
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
                    top: '2px',
                    right: '1px',
                    color: theme.palette.primary.main,
                    fontSize: '14px',
                    fontStyle: 'italic',
                    fontWeight: 'medium',
                    padding: theme.spacing(0.5),
                    borderRadius: '2rem'

                }}>
                <StyledCopyButton />
            </Box>
            <SyntaxHighlighter language={language} style={docco}
                               wrapLongLines
                               customStyle={{
                                   borderLeftStyle: 'solid',
                                   borderColor: theme.palette.primary.main,
                                   borderWidth: '6px',
                                   backgroundColor: theme.palette.grey.A200,
                                   marginTop: "1rem",

                               }}
            >
                {codeText}
            </SyntaxHighlighter>
        </Box>
    )
}