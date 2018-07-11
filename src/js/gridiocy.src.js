import resizable from './gridiocy.resizable.js';
const gridiocy = {};

gridiocy.initialize = function (indentifier, columns, rows, options) {

    /*const markup = `
        <div class="gridiocy-grid" style="grid-template-columns: ${ new Array(columns).fill("1fr").join(' ')};">
            ${new Array(columns * rows).fill(null).map((item, index) => `<div class="gridiocy-item" style="grid-column: auto / span 1; grid-row: auto / span 1" data-column-span="1" data-row-span="1">
                <div class="gridiocy-item-content gridiocy-item-content-resizable">
                    <div class="gridiocy-item-resizable-handle"></div>
                </div>
            </div>`).join('')}
        </div>
    `;*/

    //document.querySelector(indentifier).innerHTML = markup;

    // Init grid class and style
    let gridElement = document.querySelector(indentifier);
    gridElement.classList.add('gridiocy-grid');
    gridElement.style.gridTemplateColumns = new Array(columns).fill('1fr').join(' ');

    // Wrap content
    Array.from(document.getElementsByClassName('gridiocy-item')).forEach(item => {
        item.innerHTML = `<div class="gridiocy-item-content">${item.innerHTML}</div>`;
    });

    // If resizable
    if (options.resizable) {
        Array.from(document.getElementsByClassName('gridiocy-item')).forEach(item => {
            item.classList.add('gridiocy-item-content-resizable');

            let resizeHandle = document.createElement('div', { class: 'gridiocy-item-resizable-handle' });
            item.appendChild()
        });
        Array.from(document.getElementsByClassName('gridiocy-item-resizable-handle')).forEach(element => { resizable.init(element, columns); });
    }

    //Array.from(document.getElementsByClassName('gridiocy-item-content-resizable')).forEach(element => { resizeToFit(element); });
}

function resizeToFit(contentBlock) {
    contentBlock.style.width = `${contentBlock.parentElement.offsetWidth}px`;
    contentBlock.style.height = `${contentBlock.parentElement.offsetHeight}px`;
}

export { gridiocy, resizeToFit };