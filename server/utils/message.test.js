const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generageMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Grant';
    var text = 'This should work';
    var message = generateMessage(from, text);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
  });//it should generate correct
});// describe


describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Grant';
    var latitude = 15;
    var longitude = 15;
    var url = 'https://www.google.com/maps?q=15,15'
    var location = generateLocationMessage(from, latitude, longitude);
    expect(from).toBe('Grant');
    expect(latitude).toBe(15);
    expect(longitude).toBe(15);
    expect(url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
    expect(location.createdAt).toBeA('number');
    expect(location).toInclude({from,url});
  });//it should generate correct location object
});//describe generateLocationMessage
