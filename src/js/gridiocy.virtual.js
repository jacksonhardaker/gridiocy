import { getColumnsCount } from './gridiocy.src.js';
const virtualGrid = {};

let list = [];

virtualGrid.add = function (obj) {
    list.push(obj);
}

virtualGrid.sort = function () {
    list.sort((a,b) => {
         let aOrder = calculateRowMajorOrder(a);
         let bOrder = calculateRowMajorOrder(b);

         if (a < b) {
             return -1;
         }

         if (a > b) {
             return 1;
         }

         return 0;
    })

    return virtualGrid.getList();
}

virtualGrid.getList = function () {
    return [...list.map(obj => { return Object.assign({}, obj); })];
}

function calculateRowMajorOrder(obj) {
    let zeroBasedRowPosition = Number(obj.row) - 1;
    return (zeroBasedRowPosition * getColumnsCount()) + Number(obj.column);
}
export default virtualGrid;