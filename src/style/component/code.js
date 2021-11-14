import {styled} from "@mui/material/styles";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {Box} from "@mui/material";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import docco from "react-syntax-highlighter/dist/cjs/styles/prism";
import * as React from 'react';

import {useTheme} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from '@mui/material/ClickAwayListener';


const StyledCopyButton = styled(ContentCopyIcon)(({theme}) => ({
    color: theme.palette.action,
    "&:hover": {
        transform: `scale(1.1)`,
        cursor: 'pointer',
        color: theme.palette.primary.main,
    }
}));


export default function CustomCodeComponent(props) {
    const {codeText, language, tag} = props;
    let theme = useTheme();

    const [open, setOpen] = React.useState(false);
    const handleTooltipClose = () => {
        setOpen(false);
    };
    const handleTooltipOpen = () => {
        setOpen(true);
        navigator.clipboard.writeText(codeText)
    };

    return (
        <Box sx={{
            position: 'relative',
        }}>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: '0px',
                    right: '3px',
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
                <ClickAwayListener onClickAway={handleTooltipClose}>
                    <Tooltip
                        arrow
                        PopperProps={{
                            disablePortal: true,
                        }}
                        onClose={handleTooltipClose}
                        open={open}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        placement="left"
                        title="Copied!"
                    >
                        <StyledCopyButton color="action" onClick={handleTooltipOpen}
                                          onMouseLeave={handleTooltipClose}/>

                    </Tooltip>
                </ClickAwayListener>
            </Box>
            <SyntaxHighlighter language={language} style={docco}
                               wrapLongLines
                               customStyle={{
                                   borderLeftStyle: 'solid',
                                   borderColor: theme.palette.primary.main,
                                   borderWidth: '6px',
                                   backgroundColor: theme.palette.grey.A100,
                                   marginTop: "1rem",

                               }}
            >
                {codeText}
            </SyntaxHighlighter>
        </Box>
    )

}