export default class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    print() {
        console.log(this.x, this.y);
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    calcMiddlePoint(point) {
        return new this.constructor(
            (this.x + point.getX()) / 2,
            (this.y + point.getY()) / 2
        );
    }
}
