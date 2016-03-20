let mongodb = require('./db'),
    async = require('async')

function User(username, pwd) {
  this.name = username,
  this.password = pwd
}

module.exports = User

//存储用户信息
User.prototype.save = function (callback) {
  //要存入数据库的用户文档
  var user = {
      name: this.name,
      password: this.password
  }

  async.waterfall([
    cb => {
      mongodb.open((err, db) => {
        cb(err, db)
      })
    },
    (db, cb) => {
      db.collection('users', (err, collection) => {
        cb(err, collection)
      })
    },
    (collection, cb) => {
      collection.insert(user, {safe: true}, (err, user) => {
        cb(err, user)
      })
    }
  ], (err, user) => {
    mongodb.close()
    callback(err, user[0])
  })
};

//读取用户信息
User.get = function(name, callback) {
  async.waterfall([
    cb => {
      mongodb.open((err, db) => {
        cb(err, db)
      })
    },
    (db, cb) => {
      db.collection('users', (err, collection) => {
        cb(err, collection)
      })
    },
    (collection, cb) => {
      collection.findOne({name:name}, (err, user) => {
        cb(err, user)
      })
    }
  ], (err, user) => {
    mongodb.close()
    callback(err, user)
  })
};