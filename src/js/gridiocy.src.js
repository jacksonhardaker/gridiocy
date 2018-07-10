const gridiocy = {};

gridiocy.initialize = function(indentifier, columns, rows) {
    
    const markup = `
        <div class="gridiocy-grid" style="grid-template-columns: ${ new Array(columns).fill("1fr").join(' ') }; grid-template-rows: ${ new Array(rows).fill("1fr").join(' ') }">
            ${new Array(columns * rows).fill(null).map((item, index) => `<div class="gridiocy-item" style="grid-column: ${ index % columns + 1 } / span 1; grid-row: ${ __calculateRowPosition(index, columns) } / span 1"></div>`).join('')}
        </div>
    `;
    
    document.querySelector(indentifier).innerHTML = markup;
}

function __calculateRowPosition(itemIndex, columns) {
    return Math.ceil((itemIndex + 1) / columns);
}

export default gridiocy;