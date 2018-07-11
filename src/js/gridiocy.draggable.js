import { resizeToFit } from './gridiocy.src.js';
const draggable = {};

let startX;
let startY;
let startWidth;
let startHeight;
let contentBlock;
let maxColumns;
let thresholdWidth;
let gridiocyGrid;

draggable.init = function (handle, columns) {
    handle.addEventListener('mousedown', initResize, false);
    maxColumns = columns;
};

function initResize(e) {
    contentBlock = e.target.parentElement;
    gridiocyGrid = contentBlock.parentElement.parentElement;
    thresholdWidth = gridiocyGrid.offsetWidth / maxColumns;

    gridiocyGrid.style.gridTemplateRows = new Array(50).fill("1fr").join(' ');
    //grid-template-rows: ${ new Array(50).fill("1fr").join(' ')};

    startX = e.clientX;
    startY = e.clientY;
    startWidth = contentBlock.offsetWidth;
    startHeight = contentBlock.offsetHeight;

    contentBlock.style.zIndex = 999;

    window.addEventListener('mousemove', resizeGridItem, false);
    window.addEventListener('mouseup', finishResize, false);
}

function resizeGridItem(e) {
    contentBlock.style.width = `${startWidth - (startX - e.clientX)}px`;
    contentBlock.style.height = `${startHeight - (startY - e.clientY)}px`;

    isContentLargerThanContainer(contentBlock);
}

function finishResize(e) {

    window.removeEventListener('mousemove', resizeGridItem, false);
    window.removeEventListener('mouseup', finishResize, false);

    gridiocyGrid.style.gridTemplateRows = 'auto';
    contentBlock.style.zIndex = 1;
    resizeToFit(contentBlock);

}
function isContentLargerThanContainer(contentBlock) {

    // Width
    let exceedsWidth = (thresholdWidth * (Number(contentBlock.parentElement.dataset.columnSpan) + 0.5)) < contentBlock.offsetWidth;
    let smallerWidthThan = (thresholdWidth * (Number(contentBlock.parentElement.dataset.columnSpan) - 0.5)) > contentBlock.offsetWidth;

    contentBlock.parentElement.dataset.columnSpan = exceedsWidth ? Number(contentBlock.parentElement.dataset.columnSpan) + 1 : contentBlock.parentElement.dataset.columnSpan;
    contentBlock.parentElement.dataset.columnSpan = smallerWidthThan ? Number(contentBlock.parentElement.dataset.columnSpan) - 1 : contentBlock.parentElement.dataset.columnSpan;

    contentBlock.parentElement.style.gridColumn = `auto / span ${contentBlock.parentElement.dataset.columnSpan}`;

    // Height
    let exceedsHeight = (200 * (Number(contentBlock.parentElement.dataset.rowSpan) + 0.5)) < contentBlock.offsetHeight;
    let smallerHeightThan = (200 * (Number(contentBlock.parentElement.dataset.rowSpan) - 0.5)) > contentBlock.offsetHeight;

    contentBlock.parentElement.dataset.rowSpan = exceedsHeight ? Number(contentBlock.parentElement.dataset.rowSpan) + 1 : contentBlock.parentElement.dataset.rowSpan;
    contentBlock.parentElement.dataset.rowSpan = smallerHeightThan ? Number(contentBlock.parentElement.dataset.rowSpan) - 1 : contentBlock.parentElement.dataset.rowSpan;

    contentBlock.parentElement.style.gridRow = `auto / span ${contentBlock.parentElement.dataset.rowSpan}`;
}

export default draggable;