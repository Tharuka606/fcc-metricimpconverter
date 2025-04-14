const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

  test('1. Whole number input', function () {
    assert.strictEqual(convertHandler.getNum('32L'), 32);
  });

  test('2. Decimal number input', function () {
    assert.strictEqual(convertHandler.getNum('3.1mi'), 3.1);
  });

  test('3. Fractional input', function () {
    assert.strictEqual(convertHandler.getNum('1/2kg'), 0.5);
  });

  test('4. Fractional input with decimal', function () {
    assert.strictEqual(convertHandler.getNum('2.5/5mi'), 0.5);
  });

  test('5. Invalid input (double fraction)', function () {
    assert.strictEqual(convertHandler.getNum('3/2/3kg'), undefined);
  });

  test('6. No numerical input defaults to 1', function () {
    assert.strictEqual(convertHandler.getNum('kg'), 1);
  });

  test('7. Valid unit inputs', function () {
    const validUnits = ['gal','L','mi','km','lbs','kg'];
    validUnits.forEach(unit => {
      assert.strictEqual(convertHandler.getUnit('32' + unit), unit);
    });
  });

  test('8. Invalid unit input', function () {
    assert.strictEqual(convertHandler.getUnit('32g'), undefined);
  });

  test('9. Return unit for each valid input unit', function () {
    const inputUnits = ['gal','L','mi','km','lbs','kg'];
    const expected = ['L','gal','km','mi','kg','lbs'];
    inputUnits.forEach((unit, i) => {
      assert.strictEqual(convertHandler.getReturnUnit(unit), expected[i]);
    });
  });

  test('10. Spelled-out string unit', function () {
    const inputUnits = ['gal','L','mi','km','lbs','kg'];
    const expected = ['gallons','liters','miles','kilometers','pounds','kilograms'];
    inputUnits.forEach((unit, i) => {
      assert.strictEqual(convertHandler.spellOutUnit(unit), expected[i]);
    });
  });

  test('11. gal to L', function () {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.00001);
  });

  test('12. L to gal', function () {
    assert.approximately(convertHandler.convert(1, 'L'), 1 / 3.78541, 0.00001);
  });

  test('13. mi to km', function () {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.00001);
  });

  test('14. km to mi', function () {
    assert.approximately(convertHandler.convert(1, 'km'), 1 / 1.60934, 0.00001);
  });

  test('15. lbs to kg', function () {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.00001);
  });

  test('16. kg to lbs', function () {
    assert.approximately(convertHandler.convert(1, 'kg'), 1 / 0.453592, 0.00001);
  });

});
