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


/**
 * Initialize resizability
 *
 * @param {Element} handle HTML Element to attach events to
 * @param {Number} columns Number of columns in grid
 */
resizable.init = function (handle, columns) {
    handle.addEventListener('mousedown', beginResize, false);
    maxColumns = columns;
};

/**
 *Begin resizing, set initial variables.
 *
 * @param {Event} e
 */
function beginResize(e) {
    contentBlock = e.target.parentElement;
    gridiocyGrid = contentBlock.parentElement.parentElement;
    thresholdWidth = gridiocyGrid.offsetWidth / maxColumns;

    // Expand grid rows to enable resizing beyond current size.
    gridiocyGrid.style.gridTemplateRows = new Array(50).fill("1fr").join(' ');

    startX = e.clientX;
    startY = e.clientY;
    startWidth = contentBlock.offsetWidth;
    startHeight = contentBlock.offsetHeight;

    // Resizing content should be on top.
    contentBlock.style.zIndex = 999;

    // Attach event listeners.
    window.addEventListener('mousemove', resizeGridItem, false);
    window.addEventListener('mouseup', finishResize, false);
}

/**
 * Actively resize content block when dragging.
 *
 * @param {Event} e
 */
function resizeGridItem(e) {
    contentBlock.style.width = `${startWidth - (startX - e.clientX)}px`;
    contentBlock.style.height = `${startHeight - (startY - e.clientY)}px`;

    // Determine if grid item needs to change its number of rows/columns spanned.
    isContentLargerThanContainer();
}

/**
 * Finish resizing.
 *
 */
function finishResize() {

    // Remove event listeners.
    window.removeEventListener('mousemove', resizeGridItem, false);
    window.removeEventListener('mouseup', finishResize, false);

    // Reset styles.
    gridiocyGrid.style.gridTemplateRows = 'none';
    contentBlock.style.zIndex = 1;
    resizeToFit(contentBlock);

}

/**
 * Determines whether grid item needs to alter column/row span, and executes change.
 *
 */
function isContentLargerThanContainer() {
    let gridItem = contentBlock.parentElement;

    // Width. Check for resized box being + 50% bigger than current grid item, or - 50% smaller. Takes into account changing grid item span.
    const exceedsWidth = (thresholdWidth * (Number(gridItem.dataset.columnSpan) + 0.5)) < contentBlock.offsetWidth;
    const smallerWidthThan = (thresholdWidth * (Number(gridItem.dataset.columnSpan) - 0.5)) > contentBlock.offsetWidth;

    // Set modifier.
    gridItem.dataset.columnSpan = Number(gridItem.dataset.columnSpan) + getSpanModifier(exceedsWidth, smallerWidthThan);
    gridItem.style.gridColumn = `auto / span ${gridItem.dataset.columnSpan}`;

    // Height. Check for resized box being + 50% bigger than current grid item, or - 50% smaller. Takes into account changing grid item span.
    const exceedsHeight = (200 * (Number(gridItem.dataset.rowSpan) + 0.5)) < contentBlock.offsetHeight;
    const smallerHeightThan = (200 * (Number(gridItem.dataset.rowSpan) - 0.5)) > contentBlock.offsetHeight;

    // Set modifier.
    gridItem.dataset.rowSpan =  Number(gridItem.dataset.rowSpan) + getSpanModifier(exceedsHeight, smallerHeightThan);
    gridItem.style.gridRow = `auto / span ${gridItem.dataset.rowSpan}`;
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