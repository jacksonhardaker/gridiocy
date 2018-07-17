import _virtualGrid_ from '../../src/js/gridiocy.virtual.js';

describe('gridiocy.virtual.js', () => {
    let virtualGrid;

    beforeEach(() => {
        virtualGrid = _virtualGrid_;
    });

    it("should be defined", () => {
        expect(virtualGrid).toBeDefined();
    });
});