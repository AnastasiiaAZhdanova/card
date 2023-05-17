/* eslint-disable prettier/prettier */
const assert = require('assert').strict;
const { calcTime } = require('./tests/calcTime');

{
    const sec = 1;
    const min = 5;
    const zeroing = true;

    const expect = 0;

    const result = calcTime(sec, min, zeroing);

    assert.equal(result, expect);
}
