import $ from 'jquery';

import '../style/style.scss';
import '../style/graduation.scss';

import Graduation from './graduation';

const $container1 = $('.container-1');
const $container2 = $('.container-2');
const $container3 = $('.container-3');

new Graduation($container1, {
    color: '#0000FF',
    range: [500, 2700],
    value: 1000,
    unit: 'dollars',
});

new Graduation($container2, {
    color: '#9ACC00',
    range: [0, 2700],
    value: 2000,
    unit: 'ms',
});

new Graduation($container3, {
    color: '#FFC900',
    range: [0, 3500],
    value: 1000,
    unit: 'tons',
});
