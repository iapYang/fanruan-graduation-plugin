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
        this.angleTotal = 5 - 2 * this.angleA;
        this.largeR = 150;
        this.smallR = 130;
        this.percentage = 0.6;

        this.angleCalc = this.angleTotal * this.percentage;

        this.pointO = new Point(
            this.canvas.width / 2,
            this.canvas.height / 2
        );

        this.pointE = new Point(
            this.calcPointX(this.angleCalc, this.largeR),
            this.calcPointY(this.angleCalc, this.largeR),
        );

        this.pointF = new Point(
            this.calcPointX(this.angleCalc, this.smallR),
            this.calcPointY(this.angleCalc, this.smallR),
        );

        this.pointA = new Point(
            this.calcPointX(this.angleA, this.largeR),
            this.calcPointY(this.angleA, this.largeR)
        );

        this.pointB = new Point(
            this.calcPointX(this.angleA, this.smallR),
            this.calcPointY(this.angleA, this.smallR)
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

        this.draw(
            this.pointA,
            this.pointB,
            this.pointC,
            this.pointD,
            this.angleA,
        );
    }
    drawBorder() {
        const pointAB = this.pointA.calcMiddlePoint(this.pointB);
        const pointCD = this.pointC.calcMiddlePoint(this.pointD);
        const pointEF = this.pointE.calcMiddlePoint(this.pointF);

        const radius = (this.largeR - this.smallR) / 2;
        const start = this.angleA - 1;
        const end = 2 - this.angleA;

        this.drawArc(pointAB, radius, start - 1, start);
        this.drawArc(pointCD, radius, 1 - start, -start);
        this.drawArc(pointEF, radius, 1 - this.angleCalc, 2 - this.angleCalc);

        // this.drawArc(this.pointO, this.largeR, start, end);
        // this.drawArc(this.pointO, this.smallR, start, end);
    }
    draw(pointA, pointB, pointC, pointD, angle, percentage = 1) {
        const pointAB = pointA.calcMiddlePoint(pointB);
        const pointCD = pointC.calcMiddlePoint(pointD);

        const radius = (this.largeR - this.smallR) / 2;
        const start = angle - 1;

        const angleCalc = percentage * (5 - 2 * angle);
        const startBreaks = [angle - 1, angle - 1, 0, 2 - angle];

        this.ctx.beginPath();
        
        this.drawArc(
            pointAB,
            radius,
            startBreaks[0],
            startBreaks[0] - 1,
            true
        );
        this.drawArc(
            this.pointO,
            this.smallR,
            startBreaks[1],
            startBreaks[1] + angleCalc
        );
        this.drawArc(
            pointCD,
            radius,
            angleCalc + angle - 2,
            angleCalc + angle - 3,
            true
        );
        this.drawArc(
            this.pointO,
            this.largeR,
            startBreaks[3],
            startBreaks[3] - angleCalc,
            true
        );
    }
    drawArc(point, radius, start, end, counterclockwise = false) {
        const startAngle = start * Math.PI;
        const endAngle = end * Math.PI;
        
        this.ctx.arc(
            point.getX(),
            point.getY(),
            radius,
            startAngle,
            endAngle,
            counterclockwise
        );
        this.ctx.stroke();
    }
    calcPointX(angle, radius) {
        return this.pointO.getX() -
            radius * Math.cos(angle * Math.PI);
    }
    calcPointY(angle, radius) {
        return this.pointO.getY() - radius * Math.sin(angle * Math.PI);
    }
}
