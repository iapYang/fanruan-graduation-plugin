import $ from 'jquery';

export default class {
    constructor($container) {
        this.$container = $container;
        this.$canvas = $(`
            <canvas class="canvas" width="400" heigth="400"></canvas>
        `);

        this.$container.append(this.$canvas);

        console.log(123);
    }
}
