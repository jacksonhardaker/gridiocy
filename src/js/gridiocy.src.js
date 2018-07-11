import resizable from './gridiocy.resizable.js';
const gridiocy = {};

gridiocy.initialize = function (indentifier, columns, options) {

    // Init grid class and style
    const gridElement = document.querySelector(indentifier);
    gridElement.classList.add('gridiocy-grid');
    gridElement.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

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
            item.classList.add('gridiocy-item-content-resizable');

            // Create handle element and append
            const resizeHandle = document.createElement('div');
            resizeHandle.classList.add('gridiocy-item-resizable-handle');
            resizable.init(resizeHandle, columns);
            item.appendChild(resizeHandle);
        });
    }
}

function resizeToFit(contentBlock) {
    contentBlock.style.width = '100%';
    contentBlock.style.height = '100%';
}

export { gridiocy, resizeToFit };