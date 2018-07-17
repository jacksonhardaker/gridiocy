import _virtualGrid_ from '../../src/js/gridiocy.virtual.js';

describe('gridiocy.virtual.js', () => {
    let virtualGrid;

    beforeEach(() => {
        virtualGrid = _virtualGrid_;
    });

    it("should be defined", () => {
        expect(virtualGrid).toBeDefined();
    });

    describe('methods', () => {

        it('should have "init()"', () => {
            expect(virtualGrid.init).toBeDefined();
        });

        it('should have "add()"', () => {
            expect(virtualGrid.add).toBeDefined();
        });

        it('should have "rowMajorSort()"', () => {
            expect(virtualGrid.rowMajorSort).toBeDefined();
        });

        it('should have "getList()"', () => {
            expect(virtualGrid.getList).toBeDefined();
        });

        it('should have "get()"', () => {
            expect(virtualGrid.get).toBeDefined();
        });

        it('should have "setRowSpan()"', () => {
            expect(virtualGrid.setRowSpan).toBeDefined();
        });

        it('should have "setColumnSpan()"', () => {
            expect(virtualGrid.setColumnSpan).toBeDefined();
        });

        it('should have "shiftDown()"', () => {
            expect(virtualGrid.shiftDown).toBeDefined();
        });

        it('should have "shiftUp()"', () => {
            expect(virtualGrid.shiftUp).toBeDefined();
        });

        it('should have "shiftLeft()"', () => {
            expect(virtualGrid.shiftLeft).toBeDefined();
        });

        it('should have "shiftRight()"', () => {
            expect(virtualGrid.shiftRight).toBeDefined();
        });
    });

    describe('shifting', () => {
        
        /*
        +---------------------+-----------------------+--------------------+
        |                     |                       |                    |
        |                     |                       |                    |
        |      red            |       white           |      blue          |
        |                     |                       |                    |
        |                     |                       |                    |
        +------------------------------------------------------------------+
        |                     |                       |                    |
        |                     |                       |                    |
        |        green        |        purple         |      pink          |
        |                     |                       |                    |
        |                     |                       |                    |
        +------------------------------------------------------------------+
        |                     |                       |                    |
        |                     |                       |                    |
        |        yellow       |      brown            |     black          |
        |                     |                       |                    |
        |                     |                       |                    |
        +---------------------+-----------------------+--------------------+*/

        beforeEach(() => {
            // Initiate virtual grid.
            virtualGrid.init(3); // Maximum number of columns

            [
                { id: 'red', row: 1, col: 1, width: 1, height: 1 },
                { id: 'white', row: 1, col: 2, width: 1, height: 1 },
                { id: 'blue', row: 1, col: 3, width: 1, height: 1 },
                { id: 'green', row: 2, col: 1, width: 1, height: 1 },
                { id: 'purple', row: 2, col: 2, width: 1, height: 1 },
                { id: 'pink', row: 2, col: 3, width: 1, height: 1 },
                { id: 'yellow', row: 3, col: 1, width: 1, height: 1 },
                { id: 'brown', row: 3, col: 2, width: 1, height: 1 },
                { id: 'black', row: 3, col: 3, width: 1, height: 1 },
            ].forEach(obj => {
                virtualGrid.add(obj.id, obj.row, obj.col, obj.width, obj.height);
            });
        });

        it('shiftRight("red") should swap the positions of "red" and "white"', () => {
            expect(virtualGrid.get('red').column).toBe(1);
            expect(virtualGrid.get('white').column).toBe(2);

            virtualGrid.shiftRight('red');

            expect(virtualGrid.get('red').column).toBe(2);
            expect(virtualGrid.get('white').column).toBe(1);
        });

        it('shiftLeft("purple") should swap the positions of "purple" and "green"', () => {
            expect(virtualGrid.get('green').column).toBe(1);
            expect(virtualGrid.get('purple').column).toBe(2);

            virtualGrid.shiftLeft('purple');

            expect(virtualGrid.get('green').column).toBe(2);
            expect(virtualGrid.get('purple').column).toBe(1);
        });

        it('shiftDown("purple") should swap the positions of "purple" and "brown"', () => {
            expect(virtualGrid.get('purple').row).toBe(2);
            expect(virtualGrid.get('brown').row).toBe(3);

            virtualGrid.shiftDown('purple');

            expect(virtualGrid.get('purple').row).toBe(3);
            expect(virtualGrid.get('brown').row).toBe(2);
        });

        it('shiftUp("pink") should swap the positions of "pink" and "blue"', () => {
            expect(virtualGrid.get('pink').row).toBe(2);
            expect(virtualGrid.get('blue').row).toBe(1);

            virtualGrid.shiftUp('pink');

            expect(virtualGrid.get('pink').row).toBe(1);
            expect(virtualGrid.get('blue').row).toBe(2);
        });
    });
});