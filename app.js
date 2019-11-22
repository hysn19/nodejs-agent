// app.js
const express = require('express')

const transactions = require('./src/transactions')
const reading = require('./src/reading-blockchain')

const app = express()

app.get('/', (req, res, next) => {
  res.send('hello world!\n')
})

app.get('/newaccount', (req, res, next) => {
  transactions
    .newaccount(req.query.id)
    .then(resp => {
      res.send(resp)
    })
    .catch(next) // error passed on to the error handling route
})

app.get('/transfer', (req, res, next) => {
  var memo = ''
  transactions
    .transfer(memo)
    .then(resp => {
      res.send(resp)
    })
    .catch(next) // error passed on to the error handling route
})

app.get('/get_table_rows', (req, res, next) => {
  reading
    .get_table_rows('omnione', 'omnione', 'diddoc')
    .then(resp => {
      res.send(resp)
    })
    .catch(next) // error passed on to the error handling route
})

app.get('/get_currency_balance', (req, res, next) => {
  reading
    .get_currency_balance('eosio.token', 'omnione', 'EOS')
    .then(resp => {
      res.send(resp)
    })
    .catch(next) // error passed on to the error handling route
})

app.get('/get_account', (req, res, next) => {
  reading
    .get_account('omnione')
    .then(resp => {
      res.send(resp)
    })
    .catch(next) // error passed on to the error handling route
})

app.get('/get_block', (req, res, next) => {
  reading
    .get_block(1)
    .then(resp => {
      res.send(resp)
    })
    .catch(next)
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
