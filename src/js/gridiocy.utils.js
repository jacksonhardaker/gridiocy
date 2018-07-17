import virtualGrid from './gridiocy.virtual.js';

function setAttributes(el, attrs) {
    Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
}

function applyVirtualGridToDOM(obj) {
    if (obj) {
        let element = document.getElementsByClassName(`gridiocy-item-${obj.id}`)[0];

        element.dataset.columnSpan = obj.columnSpan;
        element.dataset.rowSpan = obj.rowSpan;
        element.dataset.columnPosition = obj.column;
        element.dataset.rowPosition = obj.row;
    }
    else {
        virtualGrid.getList().forEach(applyVirtualGridToDOM);
    }

}

export { setAttributes, applyVirtualGridToDOM };