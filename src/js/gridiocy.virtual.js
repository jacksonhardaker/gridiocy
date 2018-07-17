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
 * @param {String} id
 * @param {Number} row
 * @param {Number} column
 * @param {Number} rowSpan
 * @param {Number} columnSpan
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

/**
 * Gets an immutable copy of the grid list
 *
 * @returns {Array}
 */
function getList() {
    return [...list.map(obj => { return Object.assign({}, obj); })];
}

/**
 * Gets an immutable copy of the grid item with the given id
 *
 * @param {String} id
 * @returns {Object}
 */
function get(id) {
    return Object.assign({}, list[indexOf(id)]);
}

function setRowPosition(id, pos) {
    // console.log(`Setting Row Position of [${id}] to ${pos}.`);
    list[indexOf(id)].row = pos;

    return pos;
}

function setColumnPosition(id, pos) {
    // console.log(`Setting Column Position of [${id}] to ${pos}.`);
    list[indexOf(id)].column = pos;

    return pos;
}

function setRowSpan(id, span) {
    // console.log(`Setting Row Span of [${id}] to ${span}.`);
    let index = indexOf(id);

    list[index].rowSpan = span;
    updateDataAtributes(list[index]);

    return span;
}

function setColumnSpan(id, span) {
    // console.log(`Setting Column Span of [${id}] to ${span}.`);
    let index = indexOf(id);

    list[index].columnSpan = span;
    updateDataAtributes(list[index]);

    return span;
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

function shiftUp(id) {
    let obj = get(id);

    if (obj.row - 1 >= 1) {
        obj.row--;

        resolveConflicts(obj, DRAG_DIRECTION.UP);
    }
}

function shiftDown(id) {
    let obj = get(id);

    obj.row++;
    resolveConflicts(obj, DRAG_DIRECTION.DOWN);
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
    }
}

function shiftLeft(id) {
    let obj = get(id);

    if (obj.column > 1) {
        obj.column--;

        resolveConflicts(obj, DRAG_DIRECTION.LEFT);
    }
}

/** Private Functions */

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