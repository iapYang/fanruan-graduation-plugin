import $ from 'jquery';

import Point from './point';

export default class {
    constructor($container, {
        color,
        range,
        value,
        unit,
    }) {
        this.$container = $container;
        this.color = color || 'black';
        this.range = range;
        this.value = value;
        this.unit = unit;

        this.$canvas = $(`
            <canvas class="canvas" width="400" height="400"></canvas>
        `);
        this.canvas = this.$canvas[0];
        this.ctx = this.canvas.getContext('2d');

        console.log(this.canvas.dir);

        this.angleA = 5 / 3;
        this.largeR = 150;
        this.smallR = 130;
        this.percentage = this.value / (this.range[1] - this.range[0]);

        this.pointO = new Point(
            this.canvas.width / 2,
            this.canvas.height / 2
        );

        this.pointA = new Point(
            this.calcPointX(this.angleA, this.largeR),
            this.calcPointY(this.angleA, this.largeR)
        );

        this.pointB = new Point(
            this.calcPointX(this.angleA, this.smallR),
            this.calcPointY(this.angleA, this.smallR)
        );

        this.$container.append(this.$canvas);

        this.fillArc(
            this.pointA,
            this.pointB,
            this.angleA
        );

        this.fillArc(
            this.pointA,
            this.pointB,
            this.angleA,
            this.percentage,
            this.color
        );

        this.drawText(
            this.pointB.getX(),
            this.pointB.getY() - 10,
            this.range[0]
        );
        this.canvas.dir = 'rtl';
        this.drawText(
            2 * this.pointO.getX() - this.pointB.getX(), this.pointB.getY() - 10,
            this.range[1]
        );

        this.$container.append(this.createTitle());
    }
    fillArc(pointA, pointB, angle, percentage = 1, color = '#d6d6d6') {
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

        this.ctx.save();
        this.ctx.lineWidth = 0;
        this.ctx.strokeStyle = 'transparent';
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
        this.ctx.fillStyle = color;
        this.ctx.fill();

        this.ctx.closePath();
        this.ctx.restore();
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
    drawText(x, y, str = '0') {
        this.ctx.save();
        this.ctx.font = '10px Arial';
        this.strokeStyle = 'black';
        this.ctx.lineWidth = 2;
        this.ctx.strokeText(str, x, y);
        this.ctx.restore();
    }
    createTitle() {
        return $(`
            <div class="canvas-titles">
                <span>${this.unit}</span>
                <span style="color: ${this.color}">${this.value}</span>
            </div>
        `);
    }
}
