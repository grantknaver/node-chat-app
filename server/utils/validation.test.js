const expect = require('expect');
var {isRealString} = require('./validation.js');


describe('isRealString', () => {
  it('should reject non-string values', () => {
    var res = isRealString(1);
    expect(res).toBe(false);
  });

  it('should reject string with only spaces', () => {
    var res = isRealString('   ');
    expect(res).toBe(false);
  });

  it('should allow string with non-spaces characters', () => {
    var res = isRealString(' room1 ');
    expect(res).toBe(true);
  });
});//describe isRealString
