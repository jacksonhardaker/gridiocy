let list;
let columnsCount;

const DRAG_DIRECTION = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
}

function init(maxColumns) {
    columnsCount = maxColumns;
    list = [];
}

/**
 * Adds an object to the list
 *
 * @param {*} obj
 */
function add(id, row, column, rowSpan, columnSpan) {
    list.push({
        id,
        row,
        column,
        rowSpan,
        columnSpan
    });
}

function rowMajorSort() {
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

    return getList();
}

function getList() {
    return [...list.map(obj => { return Object.assign({}, obj); })];
}

function get(id) {
    return Object.assign({}, list[indexOf(id)]);
}

function setRowPosition(id, pos) {
    let index = indexOf(id);

    list[index].row = pos;
    //updateDataAtributes(list[index]);

    return pos;
}

function setColumnPosition(id, pos) {
    // console.log(`Setting Column Position of [${id}] to ${pos}.`);
    let index = indexOf(id);

    list[index].column = pos;
    //updateDataAtributes(list[index]);

    return pos;
}

function swapColumnPositions(a, b) {
    const aObj = get(a);
    const bObj = get(b);

    setColumnPosition(aObj.id, bObj.column);
    setColumnPosition(bObj.id, aObj.column);
    //updateDataAtributes();
}

function swapRowPositions(a, b) {
    const aObj = get(a);
    const bObj = get(b);

    setRowPosition(aObj.id, bObj.row);
    setRowPosition(bObj.id, aObj.row);
}

function setRowSpan(id, span) {
    let index = indexOf(id);

    list[index].rowSpan = span;
    updateDataAtributes(list[index]);


    return span;
}

function setColumnSpan(id, span) {
    let index = indexOf(id);

    list[index].columnSpan = span;
    updateDataAtributes(list[index]);

    return span;
}

function shiftUp(id) {
    let obj = get(id);

    if (obj.row - 1 >= 1) {
        obj.row--;

        resolveConflicts(obj, DRAG_DIRECTION.UP);
    }

    // let index = indexOf(id);

    // if (index - 1 >= 0) {
    //     move(index, index - 3);
    //     renderChangedOrder();
    // }
}

function shiftDown(id) {
    let obj = get(id);

    obj.row++;
    resolveConflicts(obj, DRAG_DIRECTION.DOWN);

    // let index = indexOf(id);

    // if (index + 1 < list.length) {
    //     move(index, index + 3);
    //     renderChangedOrder();
    // }
}

function shiftRight(id) {

    // Shift column position right.
    let obj = get(id);

    if (obj.column + obj.columnSpan <= columnsCount) {
        //    console.log(getList());
        obj.column++;
        //let columnPos = setColumnPosition(id, obj.column + 1);

        resolveConflicts(obj, DRAG_DIRECTION.RIGHT);
        //rowMajorSort();
        //    console.log(getList());
        //document.getElementsByClassName(`gridiocy-item-${obj.id}`)[0].style.gridArea = `${obj.row} / ${columnPos} / span ${obj.rowSpan} / span ${obj.columnSpan}`;
        //renderChanges();
    }

    // Sort list based on new

    // let index = indexOf(id);

    // if (index + 1 < list.length) {
    //     move(index, index + 1);
    //     renderChangedOrder();
    // }
}

function shiftLeft(id) {
    let obj = get(id);

    if (obj.column > 1) {
        obj.column--;

        resolveConflicts(obj, DRAG_DIRECTION.LEFT);
    }

    // let index = indexOf(id);

    // if (index - 1 >= 0) {
    //     move(index, index - 1);
    //     renderChangedOrder();
    // }
}

function resolveConflicts(obj, direction) {
    getList().forEach(conflicting => {
        switch (direction) {
            case DRAG_DIRECTION.UP:

                // Check for basic conflict
                if (conflicting.column === obj.column && conflicting.row === obj.row) {

                    // Are they the same size?
                    if (conflicting.columnSpan === obj.columnSpan && conflicting.rowSpan === obj.rowSpan) {
                        swapRowPositions(obj.id, conflicting.id);
                    }
                }
                break;
            case DRAG_DIRECTION.DOWN:

                // Check for basic conflict
                if (conflicting.column === obj.column && conflicting.row === obj.row) {

                    // Are they the same size?
                    if (conflicting.columnSpan === obj.columnSpan && conflicting.rowSpan === obj.rowSpan) {
                        swapRowPositions(obj.id, conflicting.id);
                    }
                }
                break;
            case DRAG_DIRECTION.RIGHT:

                // Check for basic conflict
                if (conflicting.column === obj.column && conflicting.row === obj.row) {

                    // Are they the same size?
                    if (conflicting.columnSpan === obj.columnSpan && conflicting.rowSpan === obj.rowSpan) {
                        swapColumnPositions(obj.id, conflicting.id);
                    }
                }

                break;
            case DRAG_DIRECTION.LEFT:

                // Check for basic conflict
                if (conflicting.column === obj.column && conflicting.row === obj.row) {

                    // Are they the same size?
                    if (conflicting.columnSpan === obj.columnSpan && conflicting.rowSpan === obj.rowSpan) {
                        swapColumnPositions(obj.id, conflicting.id);
                    }
                }
                break;
        }
    });
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

function renderChanges() {
    list.forEach((obj, index) => {
        //document.getElementsByClassName(`gridiocy-item-${obj.id}`)[0].style.order = index;
        document.getElementsByClassName(`gridiocy-item-${obj.id}`)[0].style.gridArea = `${obj.row} / ${obj.column} / span ${obj.rowSpan} / span ${obj.columnSpan}`;
    });
}

function updateDataAtributes(obj) {
    if (obj) {
        let element = document.getElementsByClassName(`gridiocy-item-${obj.id}`)[0];

        element.dataset.columnSpan = obj.columnSpan;
        element.dataset.rowSpan = obj.rowSpan;
        element.dataset.columnPosition = obj.column;
        element.dataset.rowPosition = obj.row;
    }
    else {
        list.forEach(item => {
            updateDataAtributes(item);
        })
    }
}

function generateFilledByGrid() {
    let filledByGrid = new Array(list.map(obj => obj.columnSpan * obj.rowSpan).reduce((x, current) => x + current));

    return filledByGrid;

    //return list.reduce((obj, count) => {
    //    return count + Number(obj.columnSpan) * Number(obj.rowSpan);
    //}, 0);
}

/** Private Functions */

function calculateRowMajorOrder(obj) {
    let zeroBasedRowPosition = Number(obj.row) - 1;
    return (zeroBasedRowPosition * columnsCount) + Number(obj.column);
}

export default {
    init,
    add,
    rowMajorSort,
    getList,
    get,
    setRowSpan,
    setColumnSpan,
    shiftDown,
    shiftUp,
    shiftLeft,
    shiftRight
};