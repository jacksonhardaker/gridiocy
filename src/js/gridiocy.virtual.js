import { getColumnsCount } from './gridiocy.src.js';
const virtualGrid = {};

let list = [];

/**
 * Adds an object to the list
 *
 * @param {*} obj
 */
virtualGrid.add = function (id, rowSpan, columnSpan) {
    list.push({
        id,
        rowSpan,
        columnSpan
    });
}

virtualGrid.rowMajorSort = function () {
    list.sort((a, b) => {
        let aOrder = calculateRowMajorOrder(a);
        let bOrder = calculateRowMajorOrder(b);

        if (aOrder < bOrder) {
            return -1;
        }

        if (aOrder > bOrder) {
            return 1;
        }

        return 0;
    })

    return virtualGrid.getList();
}

virtualGrid.getList = function () {
    return [...list.map(obj => { return Object.assign({}, obj); })];
}

virtualGrid.get = function (id) {
    return Object.assign({}, list[indexOf(id)]);
}

virtualGrid.setRowSpan = function(id, span) {
    let index = indexOf(id);

    list[index].rowSpan = span;
    renderChangedSpan(list[index]);

    return span;
}

virtualGrid.setColumnSpan = function(id, span) {
    let index = indexOf(id);

    list[index].columnSpan = span;
    renderChangedSpan(list[index]);

    return span;
}

virtualGrid.shiftUp = function (id) {
}

virtualGrid.shiftDown = function (id) {
}

virtualGrid.shiftRight = function (id) {
    let index = indexOf(id);

    if (index + 1 < list.length) {
        move(index, index + 1);
        renderChangedOrder();
    }
}

virtualGrid.shiftLeft = function (id) {
    let index = indexOf(id);

    if (index - 1 >= 0) {
        move(index, index - 1);
        renderChangedOrder();
    }
}

function move(fromIndex, toIndex) {
    list.splice(toIndex, 0, list.splice(fromIndex, 1)[0]);
};

function indexOf(id) {
    return list.map(obj => { return obj.id }).indexOf(id);
}

function renderChangedOrder() {
    list.forEach((obj, index) => {
        document.getElementsByClassName(`gridiocy-item-${obj.id}`)[0].style.order = index;
    });
}

function renderChangedSpan(obj) {
    let element = document.getElementsByClassName(`gridiocy-item-${obj.id}`)[0];

    element.dataset.columnSpan = obj.columnSpan;
    element.dataset.rowSpan = obj.rowSpan;

}

virtualGrid.generateFilledByGrid = function () {
    let filledByGrid = [];

    return list.map(obj => obj.columnSpan * obj.rowSpan).reduce((x, current) => x + current);

    //return list.reduce((obj, count) => {
    //    return count + Number(obj.columnSpan) * Number(obj.rowSpan);
    //}, 0);
}

/** Private Functions */

function calculateRowMajorOrder(obj) {
    let zeroBasedRowPosition = Number(obj.row) - 1;
    return (zeroBasedRowPosition * getColumnsCount()) + Number(obj.column);
}

export default virtualGrid;