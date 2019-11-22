// app.js
const express = require('express')
var fs = require('fs')

const trasnx = require('./src/transactions')
const rdb = require('./src/reading-blockchain')

const app = express()

/**
 * Account registration
 *
 * @param
 * @returns
 */
app.get('/newaccount', (req, res, next) => {
  const eosId = req.query.eosId
  const pubKey1 = req.query.pubKey1
  const pubKey2 = req.query.pubKey2

  if (
    typeof eosId == 'undefined' ||
    eosId == null ||
    typeof pubKey1 == 'undefined' ||
    pubKey1 == null ||
    typeof pubKey2 == 'undefined' ||
    pubKey2 == null
  ) {
    res.send(JSON.parse('{"result":false, "message":"parameter is null"}'))
  } else {
    trasnx
      .newaccount(eosId, pubKey1, pubKey2)
      .then(resp => {
        res.send(resp)
      })
      .catch(next) // error passed on to the error handling route
  }
})

/**
 * Symmetric-key DB storage
 *
 * @param
 * @returns
 */
app.get('/addsymmetrickey', (req, res, next) => {
  const symmetricKey = req.query.key
  const sesseionId = req.query.id
  if (
    typeof symmetricKey == 'undefined' ||
    symmetricKey == null ||
    typeof sesseionId == 'undefined' ||
    sesseionId == null
  ) {
    res.send(JSON.parse('{"result":false, "message":"parameter is null"}'))
  } else {
    // Symmetric key DB storage
    // query : sesseionId
    try {
      fs.writeFileSync(
        './out/' + sesseionId + '-key.txt',
        symmetricKey,
        'utf-8'
      )
      console.log('File Write Done!')
      res.send(true)
    } catch (e) {
      console.log(e)
    }
  }
})

/**
 * Symmetric-key DB query
 *
 * @param
 * @returns
 */
app.get('/getsymmetrickey', (req, res, next) => {
  const auth = req.query.auth
  const sesseionId = req.query.id
  const cost = req.query.cost
  if (
    typeof auth == 'undefined' ||
    auth == null ||
    typeof sesseionId == 'undefined' ||
    sesseionId == null ||
    typeof cost == 'undefined' ||
    cost == null
  ) {
    res.send(JSON.parse('{"result":false, "message":"parameter is null"}'))
  } else {
    // Budget Confirm By Node
    let balance = rdb.get_currency_balance('eosio.token', 'omnione', 'EOS')
    var budget
    balance.then(function(resp) {
      // ex) resp : 100.0121 EOS
      budget = parseFloat(resp.toString().split(' ')[0]).toFixed(4)
      console.log(typeof budget + ', ' + budget)
    })

    budget = 10
    // remain assert of sp > (day*3)
    if (parseInt(budget) > 3 * cost) {
      // Symmetric key DB query
      // query : did, sesseionId
      let data = fs.readFileSync('./out/' + sesseionId + '-key.txt', 'utf-8')
      console.log('symmetrickey read: %s', data)
      res.send(data + '\n')
    }
  }
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
