import resizable from './gridiocy.resizable.js';
import draggable from './gridiocy.draggable.js';
import { setAttributes } from './gridiocy.utils.js';
import virtualGrid from './gridiocy.virtual.js';
import uniqid from '../../node_modules/uniqid/index.js';
const gridiocy = {};

console.log(virtualGrid);

let options;
let gridiocyGrid;

gridiocy.initialize = function (indentifier, opt) {

    // Save settings.
    options = opt;

    // Init grid class and style
    gridiocyGrid = document.querySelector(indentifier);
    gridiocyGrid.classList.add('gridiocy-grid');
    gridiocyGrid.style.gridTemplateColumns = `repeat(${options.columns}, 1fr)`;

    // Wrap content
    Array.from(document.getElementsByClassName('gridiocy-item')).forEach((item, index) => {

        // Add identifier class
        let indentifier = uniqid();
        item.classList.add(`gridiocy-item-${indentifier}`);

        // Wrap inner HTML with content wrapper
        item.innerHTML = `<div class="gridiocy-item-content">${item.innerHTML}</div>`;

        item.style.gridArea = 'auto / auto / span 1/ span 1';
        item.style.order = index;
        setAttributes(item, { 'data-grid-id': indentifier, 'data-column-span': 1, 'data-row-span': 1 });

        // Initiate virtual grid.
        virtualGrid.add(indentifier, 1, 1);
    });

    // If resizable
    if (options.resizable) {
        Array.from(document.getElementsByClassName('gridiocy-item-content')).forEach(item => {
            resizable.init(item, options.columns);
        });
    }

    // If draggable
    if (options.draggable) {
        Array.from(document.getElementsByClassName('gridiocy-item-content')).forEach(item => {
            draggable.init(item, options.columns);
        });
    }
}

function resizeToFit(contentBlock) {
    contentBlock.style.width = '100%';
    contentBlock.style.height = '100%';
}

function getColumnsCount() {
    return options.columns;
}

function getColumnWidth() {
    return gridiocyGrid.offsetWidth / getColumnsCount();
}

function toggleAutoPositioning() {
    Array.from(document.getElementsByClassName('gridiocy-item')).forEach((item) => {
        item.style.gridArea = `auto / auto / span ${item.dataset.rowSpan} / span ${item.dataset.columnSpan}`;
        //setAttributes(item, { 'data-column-span': 1, 'data-row-span': 1, 'data-column-position': columnPos, 'data-row-position': rowPos });
    });
}

export { gridiocy, resizeToFit, getColumnsCount, getColumnWidth, toggleAutoPositioning };