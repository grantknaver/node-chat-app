const expect = require('expect');
var {generateMessage} = require('./message');

describe('generageMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Grant';
    var text = 'This should work';
    var message = generateMessage(from, text);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
  });//it should generate correct
});// describe
