var editor = CodeMirror.fromTextArea(document.getElementById("textareaCode"), {
    lineNumbers: true, // gives a lineNumber gutter
    mode: 'htmlmixed', // sets syntax mode
    theme: 'default',
    indentUnit: 4, // default is 2
    tabSize: 4, // default already is 4
    indentWithTabs: true, // default is false
    lineWrapping: true,
    fixedGutter: true,
    coverGutterNextToScrollbar: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    showCursorWhenSelecting: true,
    electricChars: true,
    keyMap: 'sublime',
    autoCloseBrackets: true,
    autoCloseTags: true,
    scrollbarStyle: 'simple', //'simple' or 'menuOverlay'
    extraKeys: {
        "Ctrl-Space": "autocomplete"
    },
    matchBrackets: true,
});