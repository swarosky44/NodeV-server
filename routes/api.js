let api = require('express').Router(),
    request = require('superagent'),
    User = require('../models/user')


api.get('/user', (req, res) => {
  request
  .get('https://api.github.com/users/'+req.query.username)
  .end((err, Hres) => {
    if(err){
      res.send(err)
    }
    if (Hres.status === 200) {
     res.send(Hres.body)
    }
  })
})

api.get('/starRepo',(req, res) => {
  request
  .get('https://api.github.com/users/'+req.query.username+'/starred')
  .end((err, Hres) => {
    if (err) {
     res.send(err)
    }
    if (Hres.status === 200) {
     res.send(Hres.body)
    }
  })
})

api.post('/login', (req, res) => {
  let {name, password} = req.body
  User.get(name, (err, Hres) => {
    if (err) {
      res.send({err: 1})
    }
    if (Hres.password !== password) {
      res.send({err: 2})
    }
    req.session.user = Hres
    res.send({err: 0})
  })
})

api.post('/regis', (req, res) => {
  let {username, pwd} = req.body
  let newUser = new User(username, pwd)
  User.get(username, (err, Hres) => {
    if (err) {
      console.log(err)
      return
    }
    if (Hres) {
      res.send({err: 2})
      return
    }
    newUser.save((err, Hres) => {
      if (err) {
        console.log('fuck')
        return
      }
      req.session.user = Hres
      res.send({err: 0})
    })
  })
})

api.get('/logout', (req, res) => {
  req.session.user = null
  console.log(req.session)
  res.send({err: 0})
})

api.get('/ready', (req,res) => {
  if (req.session.user) {
    res.send({err: 0, name:req.session.user.name})
  } else {
    res.send({err: 1})
  }
})

module.exports = api;
