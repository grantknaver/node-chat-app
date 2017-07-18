[{
  id:'/sldfjlasdjflsadjf23',
  name: 'Grant',
  room: 'Office Fans'
}]

//addUser(id, name, room)
//removeUser(id)
//getUsser(id)
//getUserList(room)

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    var user = this.users.filter((user) => user.id === id)[0];

    if (user) {
        this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0]
  }

  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old.`
//   }
// }//Person
// var me = new Person('Grant', 29);
// console.log('this.name', me.name);
// console.log('this.name', me.age);
//
// var description = me.getUserDescription();
// console.log(description);

module.exports = {Users};
