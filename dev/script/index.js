import $ from 'jquery';

import '../style/style.scss';
import '../style/graduation.scss';

import Graduation from './graduation';

const $container = $('.container');

new Graduation($container);
