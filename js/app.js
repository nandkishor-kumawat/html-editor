function runCode() {
    if (window.editor) {
        window.editor.save();
    }
    var text = document.getElementById("textareaCode").value;
    var ifr = document.createElement("iframe");
    ifr.setAttribute("frameborder", "0");
    ifr.setAttribute("id", "iframeResult");
    ifr.setAttribute("name", "iframeResult");
    ifr.setAttribute("allowfullscreen", "true");
    document.getElementById("iframewrapper").innerHTML = "";
    document.getElementById("iframewrapper").appendChild(ifr);

    var ifrw = (ifr.contentWindow) ? ifr.contentWindow : (ifr.contentDocument.document) ? ifr.contentDocument.document : ifr.contentDocument;
    ifrw.document.open();
    ifrw.document.write(text);
    ifrw.document.close();
    if (ifrw.document.body && !ifrw.document.body.isContentEditable) {
        ifrw.document.body.contentEditable = true;
        ifrw.document.body.contentEditable = false;
    }
}
runCode();

$('#menu').click(() => {
    $('#menu').toggleClass('active');
    $('#menubar').toggleClass('active');
    $('#menuOverlay').toggleClass('visible');
});
$('#menuOverlay').click(() => {
    $('#menu').click();
});

saveFile = () => {
    const data = document.getElementById('textareaCode').value;
    const textToBLOB = new Blob([data]);
    const sFileName = 'myfile.html'; // The file to save the data.

    let newLink = document.createElement("a");
    newLink.download = sFileName;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    } else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }
    newLink.click();
}

darkmode = () => {
    let html = document.querySelector('html');
    let theme = html.getAttribute('theme') || 'light';
    let newTheme = theme == 'light' ? 'dark' : 'light';
    let editorTheme = theme == 'light' ? 'abcdef' : 'default';
    editor.setOption('theme', editorTheme);
    html.setAttribute('theme', newTheme);
    $('html').toggleClass('darktheme');
}

restack = () => {
    let resizer = document.getElementById('resizer');
    let direction = resizer.getAttribute('data-direction') || 'horizontal';
    let dir = direction === 'horizontal' ? 'vertical' : 'horizontal';
    document.body.setAttribute('class', dir);
    resizer.setAttribute('data-direction', dir);
    resizable();
    editor.setOption('scrollbarStyle', 'simple');
    getSize();
}

togglelive = () => {
    let liveeditor = document.querySelector('#liveeditor');
    let textareawrapper = document.querySelector('.container__left');
    let status = liveeditor.getAttribute('live-editor') || 'true';
    let newStatus = status === 'false' ? 'true' : 'false';
    switch (status) {
        case 'false':
        default:
            textareawrapper.setAttribute('onkeyup', 'runCode()');
            liveeditor.innerHTML = `<ion-icon name="pause-outline"></ion-icon> <span>Pause Live Editor</span>`
            break;
        case 'true':
            textareawrapper.removeAttribute('onkeyup', 'runCode()');
            liveeditor.innerHTML = `<ion-icon name="radio-outline"></ion-icon> <span>Start Live Editor</span>`
            break;
    }
    liveeditor.setAttribute('live-editor', newStatus);
}

var them = document.querySelector('#themes')
var themes = ['default', '3024-night', 'abbott', 'abcdef', 'ayu-dark', 'base16-dark', 'bespin', 'blackboard', 'cobalt', 'colorforth', 'darcula', 'dracula', 'duotone-dark', 'erlang-dark', 'gruvbox-dark', 'hopscotch', 'icecoder', 'isotope', 'juejin', 'lesser-dark', 'liquibyte', 'lucario', 'material', 'material-darker', 'material-palenight', 'material-ocean', 'mbo', 'mdn-like', 'midnight', 'monokai', 'moxer', 'night', 'nord', 'oceanic-next', 'panda-syntax', 'paraiso-dark', 'paraiso-light', 'pastel-on-dark', 'railscasts', 'rubyblue', 'seti', 'shadowfox', 'solarized dark', 'solarized light', 'the-matrix', 'tomorrow-night-bright', 'twilight', 'vibrant-ink', 'xq-dark', 'yonce', 'zenburn'];
for (var i in themes) {
    them.innerHTML += `<option>${themes[i]}</option>`;
}
changeTheme = () => {
    var theme = them.value;
    editor.setOption('theme', theme);
    $('#menu').click();
}
