const path = require('path');
const fs = require('fs');

const mars = require('../src');

describe('Mars full cycle test', function() {
	const output = path.resolve('test', 'fixtures', 'output.txt');

	afterAll(() => {
		fs.unlinkSync(output);
	});

	test('should generate the output file properly', function() {
		const input = path.resolve('test', 'fixtures', 'e2e', 'orders.txt');

		mars(input, output);

		const resultFile = fs.readFileSync(output, 'utf8');
		const expectedFile = fs.readFileSync(path.resolve('test', 'fixtures', 'e2e', 'output.txt'), 'utf8');

		expect(resultFile).toEqual(expectedFile);
	});
});