import { resizeToFit, getColumnsCount, getColumnWidth, toggleAutoPositioning } from './gridiocy.src.js';
import virtualGrid from './gridiocy.virtual.js';
const draggable = {};

let startX = 0;
let startY = 0;
let inMotion = false;
let dragHandle;
let thresholdWidth;
let gridiocyGrid;

/**
 * Initialize draggability.
 *
 * @param {Element} handle HTML Element to attach events to
 * @param {Number} columns Number of columns in grid
 */
draggable.init = function (handle) {
    handle.classList.add('gridiocy-item-content-draggable');

    // Attach event listeners.
    handle.addEventListener('mousedown', beginDrag, false);
};

function beginDrag(e) {
    if (!Array.from(e.target.classList).find(identifier => 'gridiocy-item-resizable-handle')) {
        toggleAutoPositioning();
        dragHandle = findParentHandle(e.target);
        inMotion = true;
        startX = e.clientX;
        startY = e.clientY;

        // Resizing content should be on top.
        dragHandle.style.zIndex = 999;

        // Attach event listeners.
        window.addEventListener('mousemove', dragObject, false);
        window.addEventListener('mouseup', finishDrag, false);
    }
}

function dragObject(e) {
    if (inMotion) {
        let moveUp = e.clientY < dragHandle.parentElement.offsetTop;
        let moveRight = e.clientX - dragHandle.parentElement.offsetLeft > getColumnWidth();
        let moveDown = e.clientY - dragHandle.parentElement.offsetTop > 200;
        let moveLeft = e.clientX < dragHandle.parentElement.offsetLeft;
        //console.log(`moveup: ${moveUp}, movedown: ${moveDown}, moveleft: ${moveLeft}, moveright: ${moveRight}`);

        dragHandle.style.transform = `translate(${e.clientX - startX}px, ${e.clientY - startY}px)`;

        handleMove(e, moveUp, moveRight, moveDown, moveLeft)
    }

    e.preventDefault();
}

function finishDrag() {
    // Remove event listeners.
    window.removeEventListener('mousemove', dragObject, false);
    window.removeEventListener('mouseup', finishDrag, false);

    // Reset styles and flags
    dragHandle.style.zIndex = 1;
    dragHandle.style.transform = 'none';
    inMotion = false;
}

function handleMove(e, moveUp, moveRight, moveDown, moveLeft) {
    const gridItem = dragHandle.parentElement;

    if (moveRight) {
        virtualGrid.shiftRight(gridItem.dataset.gridId);
    }

    if (moveLeft) {
        virtualGrid.shiftLeft(gridItem.dataset.gridId);
    }

    if (moveDown) {
        virtualGrid.shiftDown(gridItem.dataset.gridId);
    }

    if (moveUp) {
        virtualGrid.shiftUp(gridItem.dataset.gridId);
    }

    // Any changes?
    if (moveRight || moveLeft) {
        startX = e.clientX;
    }
    else if (moveDown || moveUp) {
        startY = e.clientY;
    }
}

/**
 * Determines if the click event is comming from the intended target, and if not, searches the parent elements for the correct element.
 *
 * @param {Element} target
 * @returns The correct drag handle.
 */
function findParentHandle(target) {

    if (Array.from(target.classList).find(() => 'gridiocy-item-content-draggable')) {
        return target;
    }
    else {
        return findParentHandle(target.parentElement);
    }
}
export default draggable;