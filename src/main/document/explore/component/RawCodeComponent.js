import React from "react";
import AceEditor from "react-ace";

export const RawComponent = (props) => {
    const {open, codeType} = props;
    const [codeContent, setCodeContent] = React.useState("")
    const handleContentChange = (code) => setCodeContent(code);
    if (!open) return null;
    return (
        <AceEditor
            style={{
                height: '56vh',
                width: '100%',
            }}
            mode={codeType}
            theme='monokai'
            name='basic-code-editor'
            value={codeContent}
            onChange={handleContentChange}
            fontSize={14}
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

    )
}