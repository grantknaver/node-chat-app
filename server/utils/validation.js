var isRealString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
};

var userTaken = (userName, roomUserArray) => {
  var nameUpdate = userName.trim();
  var userCheck = roomUserArray.filter((user) => user === nameUpdate)[0];
  return userCheck;
}

module.exports = {isRealString, userTaken};
