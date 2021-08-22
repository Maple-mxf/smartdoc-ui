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
                height: '35vh',
                width: '95%',
            }}
            mode={codeType}
            theme='monokai'
            name='basic-code-editor'
            value={codeContent}
            onChange={handleContentChange}
            fontSize={13}
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