import resizable from './gridiocy.resizable.js';
import draggable from './gridiocy.draggable.js';
const gridiocy = {};

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
    Array.from(document.getElementsByClassName('gridiocy-item')).forEach(item => {

        // Wrap inner HTML with content wrapper
        item.innerHTML = `<div class="gridiocy-item-content">${item.innerHTML}</div>`;

        // Add default styles and data attributes
        item.style.gridArea = 'auto / auto / span 1 / span 1';
        item.setAttribute('data-column-span', 1);
        item.setAttribute('data-row-span', 1);
    });

    // If resizable
    if (options.resizable) {
        Array.from(document.getElementsByClassName('gridiocy-item-content')).forEach(item => {
            

            resizable.init(item, options.columns);
        });
    }

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

export { gridiocy, resizeToFit, getColumnsCount, getColumnWidth };