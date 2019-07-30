const path = require('path');

const mars = require('../src');

const input = process.argv[2] || path.resolve('test', 'fixtures', 'e2e', 'orders.txt');
const output = process.argv[3] || path.resolve('output.txt');

mars(input, output);