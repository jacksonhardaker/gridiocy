import { resizeToFit } from './gridiocy.src.js';
const draggable = {};

let _startX;
let _startY;
let _startWidth;
let _startHeight;
let _contentBlock;
let _startingRowSpan;
let _startingColumnSpan;
let _maxColumns;
let _thresholdWidth;

draggable.init = function (handle, maxColumns) {
    handle.addEventListener('mousedown', __initResize, false);
    _maxColumns = maxColumns;
};

function __initResize(e) {
    _contentBlock = e.target.parentElement;
    _thresholdWidth = _contentBlock.parentElement.parentElement.offsetWidth / _maxColumns;

    _startX = e.clientX;
    _startY = e.clientY;
    _startWidth = _contentBlock.offsetWidth;
    _startHeight = _contentBlock.offsetHeight;
    _startingColumnSpan = _contentBlock.parentElement.dataset.columnSpan;
    _startingRowSpan = _contentBlock.parentElement.dataset.rowSpan;

    _contentBlock.style.zIndex = 999;

    window.addEventListener('mousemove', __resizeGridItem, false);
    window.addEventListener('mouseup', __finishResize, false);
}

function __resizeGridItem(e) {
    _contentBlock.style.width = `${_startWidth - (_startX - e.clientX)}px`;
    _contentBlock.style.height = `${_startHeight - (_startY - e.clientY)}px`;

    __isContentLargerThanContainer(_contentBlock);
}

function __finishResize(e) {

    window.removeEventListener('mousemove', __resizeGridItem, false);
    window.removeEventListener('mouseup', __finishResize, false);

    _contentBlock.style.zIndex = 1;
    resizeToFit(_contentBlock);

}
function __isContentLargerThanContainer(contentBlock) {

    // Width
    let exceedsWidth = (_thresholdWidth * (Number(contentBlock.parentElement.dataset.columnSpan) + 0.5)) < contentBlock.offsetWidth;
    let smallerWidthThan = (_thresholdWidth * (Number(contentBlock.parentElement.dataset.columnSpan) - 0.5)) > contentBlock.offsetWidth;
    //let exceedsHeight = (contentBlock.parentElement.offsetHeight * 1.5) < contentBlock.offsetHeight;

    contentBlock.parentElement.dataset.columnSpan = exceedsWidth ? Number(contentBlock.parentElement.dataset.columnSpan) + 1 : contentBlock.parentElement.dataset.columnSpan;
    contentBlock.parentElement.dataset.columnSpan = smallerWidthThan ? Number(contentBlock.parentElement.dataset.columnSpan) - 1 : contentBlock.parentElement.dataset.columnSpan;
    //contentBlock.parentElement.dataset.rowSpan = exceedsHeight ? Number(contentBlock.parentElement.dataset.rowSpan) + 1 : contentBlock.parentElement.dataset.rowSpan;

    contentBlock.parentElement.style.gridColumn = `auto / span ${contentBlock.parentElement.dataset.columnSpan}`;
    //contentBlock.parentElement.style.gridRow = `auto / span ${contentBlock.parentElement.dataset.rowSpan}`;

    // Height
    let exceedsHeight = (200 * (Number(contentBlock.parentElement.dataset.rowSpan) + 0.5)) < contentBlock.offsetHeight;
    let smallerHeightThan = (200 * (Number(contentBlock.parentElement.dataset.rowSpan) - 0.5)) > contentBlock.offsetHeight;

    contentBlock.parentElement.dataset.rowSpan = exceedsHeight ? Number(contentBlock.parentElement.dataset.rowSpan) + 1 : contentBlock.parentElement.dataset.rowSpan;
    contentBlock.parentElement.dataset.rowSpan = smallerHeightThan ? Number(contentBlock.parentElement.dataset.rowSpan) - 1 : contentBlock.parentElement.dataset.rowSpan;

    contentBlock.parentElement.style.gridRow = `auto / span ${contentBlock.parentElement.dataset.rowSpan}`;
}

export default draggable;