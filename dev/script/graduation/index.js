import $ from 'jquery';

import Point from './point';

export default class {
    constructor($container) {
        this.$container = $container;
        this.$canvas = $(`
            <canvas class="canvas" width="400" height="400"></canvas>
        `);
        this.canvas = this.$canvas[0];
        this.ctx = this.canvas.getContext('2d');

        this.angleA = 5 / 3;
        this.largeR = 150;
        this.smallR = 130;

        this.pointO = new Point(
            this.canvas.width / 2,
            this.canvas.height / 2
        );

        this.pointA = new Point(
            this.pointO.getX() - this.largeR * Math.cos(this.angleA * Math.PI),
            this.pointO.getY() - this.largeR * Math.sin(this.angleA * Math.PI)
        );

        this.pointB = new Point(
            this.pointO.getX() - this.smallR * Math.cos(this.angleA * Math.PI),
            this.pointO.getY() - this.smallR * Math.sin(this.angleA * Math.PI)
        );

        this.pointC = new Point(
            2 * this.pointO.getX() - this.pointB.getX(),
            this.pointB.getY(),
        );

        this.pointD = new Point(
            2 * this.pointO.getX() - this.pointA.getX(),
            this.pointA.getY(),
        );

        this.$container.append(this.$canvas);

        this.pointA.print();
        this.pointB.print();
        this.pointC.print();
        this.pointD.print();


        this.drawBorder();
    }
    drawBorder() {
        const radius = (this.largeR - this.smallR) / 2;

        const pointAB = this.pointA.calcMiddlePoint(this.pointB);
        const pointCD = this.pointC.calcMiddlePoint(this.pointD);

        const start = this.angleA - 1;
        const end = 2 - this.angleA;

        this.drawArc(pointAB, radius, start - 1, start);
        this.drawArc(pointCD, radius, 1 - start, -start);

        this.drawArc(this.pointO, this.largeR, start, end);
        this.drawArc(this.pointO, this.smallR, start, end);
    }
    drawArc(point, radius, start, end) {
        const startAngle = start * Math.PI;
        const endAngle = end * Math.PI;
        
        this.ctx.beginPath();
        this.ctx.arc(
            point.getX(),
            point.getY(),
            radius,
            startAngle,
            endAngle
        );
        this.ctx.stroke();
    }
}
