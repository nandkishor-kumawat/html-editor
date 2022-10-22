resizable = function() {
    let resizer = document.querySelector('#resizer');
    const direction = resizer.getAttribute('data-direction') || 'horizontal';
    const prevSibling = resizer.previousElementSibling;
    const nextSibling = resizer.nextElementSibling;
    prevSibling.style.height = 'var(--divH)';
    prevSibling.style.width = 'var(--divW)';
    nextSibling.style.height = 'var(--divH)';
    nextSibling.style.width = 'var(--divW)';
    // The current position of mouse
    let x = 0;
    let y = 0;
    let prevSiblingHeight = 0;
    let prevSiblingWidth = 0;

    // Handle the mousedown event
    // that's triggered when user drags the resizer
    mouseDownHandler = function(e) {
        // Get the current mouse position
        x = e.clientX;
        y = e.clientY;
        const rect = prevSibling.getBoundingClientRect();
        prevSiblingHeight = rect.height;
        prevSiblingWidth = rect.width;

        // Attach the listeners to `document`
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    mouseMoveHandler = function(e) {
        // How far the mouse has been moved
        const dx = e.clientX - x;
        const dy = e.clientY - y;
        switch (direction) {
            case 'vertical':
                const h = (prevSiblingHeight + dy) * 100 / resizer.parentNode.getBoundingClientRect().height;
                if (h <= 100) {
                    prevSibling.style.height = `${h}%`;
                    nextSibling.style.height = `${100 - h}%`;
                }
                break;
            case 'horizontal':
                const w = (prevSiblingWidth + dx) * 100 / resizer.parentNode.getBoundingClientRect().width;
                if (w <= 100) {
                    prevSibling.style.width = `${w}%`;
                    nextSibling.style.width = `${100 - w}%`;
                }
                break;
        }
        getSize();
        const cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
        resizer.style.cursor = cursor;
        document.body.style.cursor = cursor;

        prevSibling.style.userSelect = 'none';
        prevSibling.style.pointerEvents = 'none';
        nextSibling.style.userSelect = 'none';
        nextSibling.style.pointerEvents = 'none';
    };

    mouseUpHandler = function() {
        resizer.style.removeProperty('cursor');
        document.body.style.removeProperty('cursor');

        prevSibling.style.removeProperty('user-select');
        prevSibling.style.removeProperty('pointer-events');
        nextSibling.style.removeProperty('user-select');
        nextSibling.style.removeProperty('pointer-events');

        // Remove the handlers of `mousemove` and `mouseup`
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    // Attach the handler
    resizer.addEventListener('mousedown', mouseDownHandler);
};
resizable();

getSize = () => {
    let cr = document.querySelector('#iframewrapper');
    let framesize = document.querySelector('#framesize');
    framesize.innerHTML = `Result Size: ${cr.clientWidth} x ${cr.clientHeight}`;
}
getSize();