import { expect } from 'code';
import * as lab from 'lab';
var it = lab.script().it;
it('returns true when 1 + 1 equals 2', function () {
    expect(1 + 1).to.equal(2);
});
