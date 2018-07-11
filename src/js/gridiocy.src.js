import draggable from './gridiocy.draggable.js';
const gridiocy = {};

gridiocy.initialize = function (indentifier, columns, rows) {

    const markup = `
        <div class="gridiocy-grid" style="grid-template-columns: ${ new Array(columns).fill("1fr").join(' ')}; grid-template-rows: ${ new Array(50).fill("1fr").join(' ')};">
            ${new Array(columns * rows).fill(null).map((item, index) => `<div class="gridiocy-item" style="grid-column: auto / span 1; grid-row: auto / span 1" data-column-span="1" data-row-span="1">
                <div class="gridiocy-item-content gridiocy-item-content-resizable">
                    <div class="gridiocy-item-draggable-handle"></div>
                </div>
            </div>`).join('')}
        </div>
    `;

    document.querySelector(indentifier).innerHTML = markup;

    Array.from(document.getElementsByClassName('gridiocy-item-content-resizable')).forEach(element => { resizeToFit(element); });

    Array.from(document.getElementsByClassName('gridiocy-item-draggable-handle')).forEach(element => { draggable.init(element, columns); });
}

function resizeToFit(contentBlock) {
    contentBlock.style.width = `${contentBlock.parentElement.offsetWidth}px`;
    contentBlock.style.height = `${contentBlock.parentElement.offsetHeight}px`;
}

export { gridiocy, resizeToFit };