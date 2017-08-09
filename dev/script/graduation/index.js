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

        new Point(
            this.calcPointX(this.angleA + this.angleTotal, this.largeR),
            this.calcPointY(this.angleA + this.angleTotal, this.largeR),
        ).print();

        this.pointD.print();

        this.$container.append(this.$canvas);

        this.draw(
            this.pointA,
            this.pointB,
            this.angleA,
        );

        this.draw(
            this.pointA,
            this.pointB,
            this.angleA,
            0.95
        );
    }
    draw(pointA, pointB, angle, percentage = 1) {
        const angleTotal = 5 - 2 * angle;
        const angleCalc = percentage * angleTotal;

        const pointC = new Point(
            this.calcPointX(angle + angleTotal * percentage, this.smallR),
            this.calcPointY(angle + angleTotal * percentage, this.smallR),
        );

        const pointD = new Point(
            this.calcPointX(angle + angleTotal * percentage, this.largeR),
            this.calcPointY(angle + angleTotal * percentage, this.largeR),
        );

        const pointAB = pointA.calcMiddlePoint(pointB);
        const pointCD = pointC.calcMiddlePoint(pointD);

        const radius = (this.largeR - this.smallR) / 2;

        const startBreaks = [angle - 1, angle - 1, angleCalc + angle - 2, angleCalc + angle - 1];

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
            startBreaks[2],
            startBreaks[2] - 1,
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
