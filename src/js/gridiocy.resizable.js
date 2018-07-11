import { resizeToFit } from './gridiocy.src.js';
const resizable = {};

let startX;
let startY;
let startWidth;
let startHeight;
let contentBlock;
let maxColumns;
let thresholdWidth;
let gridiocyGrid;

resizable.init = function (handle, columns) {
    handle.addEventListener('mousedown', initResize, false);
    maxColumns = columns;
};

function initResize(e) {
    contentBlock = e.target.parentElement;
    gridiocyGrid = contentBlock.parentElement.parentElement;
    thresholdWidth = gridiocyGrid.offsetWidth / maxColumns;

    // Expand grid rows to enable resizing beyond current size
    gridiocyGrid.style.gridTemplateRows = new Array(50).fill("1fr").join(' ');

    startX = e.clientX;
    startY = e.clientY;
    startWidth = contentBlock.offsetWidth;
    startHeight = contentBlock.offsetHeight;

    contentBlock.style.zIndex = 999;

    //contentBlock.style.width = `${contentBlock.parentElement.offsetWidth}px`;
    //contentBlock.style.height = `${contentBlock.parentElement.offsetHeight}px`;

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

    gridiocyGrid.style.gridTemplateRows = 'none';
    contentBlock.style.zIndex = 1;
    resizeToFit(contentBlock);

}
function isContentLargerThanContainer(contentBlock) {

    // Width. Check for resized box being + 50% bigger than current grid item, or - 50% smaller. Takes into account changing grid item span.
    const exceedsWidth = (thresholdWidth * (Number(contentBlock.parentElement.dataset.columnSpan) + 0.5)) < contentBlock.offsetWidth;
    const smallerWidthThan = (thresholdWidth * (Number(contentBlock.parentElement.dataset.columnSpan) - 0.5)) > contentBlock.offsetWidth;

    // Set modifier.
    contentBlock.parentElement.dataset.columnSpan = Number(contentBlock.parentElement.dataset.columnSpan) + getSpanModifier(exceedsWidth, smallerWidthThan);
    contentBlock.parentElement.style.gridColumn = `auto / span ${contentBlock.parentElement.dataset.columnSpan}`;

    // Height. Check for resized box being + 50% bigger than current grid item, or - 50% smaller. Takes into account changing grid item span.
    const exceedsHeight = (200 * (Number(contentBlock.parentElement.dataset.rowSpan) + 0.5)) < contentBlock.offsetHeight;
    const smallerHeightThan = (200 * (Number(contentBlock.parentElement.dataset.rowSpan) - 0.5)) > contentBlock.offsetHeight;

    // Set modifier.
    contentBlock.parentElement.dataset.rowSpan =  Number(contentBlock.parentElement.dataset.rowSpan) + getSpanModifier(exceedsHeight, smallerHeightThan);
    contentBlock.parentElement.style.gridRow = `auto / span ${contentBlock.parentElement.dataset.rowSpan}`;
}

/**
 * Determines the modifier for column or row span.
 *
 * @param {boolean} exceeds resized box is bigger than grid-item by a threshold of 50%
 * @param {boolean} smaller resized box is small than grid-item by a threshold of 50%
 * @returns 1, -1, or 0
 */
function getSpanModifier(exceeds, smaller) {
    return exceeds ? 1 : (smaller ? -1 : 0);
}

export default resizable;