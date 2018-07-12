// js
import { gridiocy } from './js/gridiocy.src.js';
import './js/gridiocy.resizable.js';
import './js/gridiocy.draggable.js';
import './js/gridiocy.virtual.js';
import './js/gridiocy.utils.js';

// external modules
import '../node_modules/uniqid/index.js';

// scss
import './scss/gridiocy.src.scss';

gridiocy.initialize('.gridiocy', { columns: 3, resizable: true, draggable: true });