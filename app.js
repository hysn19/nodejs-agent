// app.js
const express = require('express')
var fs = require('fs')

const trasnx = require('./src/transactions')
const rdb = require('./src/reading-blockchain')

const app = express()

/**
 * Account registration
 *
 * @param id
 * @param pubKey1
 * @param pubKey2
 * @returns
 */
app.get('/newaccount', (req, res, next) => {
  const id = req.query.id
  const pubKey1 = req.query.pubKey1
  const pubKey2 = req.query.pubKey2
  if (
    typeof id == 'undefined' ||
    id == null ||
    typeof pubKey1 == 'undefined' ||
    pubKey1 == null ||
    typeof pubKey2 == 'undefined' ||
    pubKey2 == null
  ) {
    res.send(JSON.parse('{"result":false, "message":"parameter is null"}'))
  } else {
    trasnx
      .newaccount(id, pubKey1, pubKey2)
      .then(resp => {
        res.send(resp)
      })
      .catch(next) // error passed on to the error handling route
  }
})

/**
 * Symmetric-key DB storage
 *
 * @param id
 * @param key
 * @returns
 */
app.get('/addsymmetrickey', (req, res, next) => {
  const sesseionId = req.query.id
  const symmetricKey = req.query.key
  if (
    typeof sesseionId == 'undefined' ||
    sesseionId == null ||
    typeof symmetricKey == 'undefined' ||
    symmetricKey == null
  ) {
    res.send(JSON.parse('{"result":false, "message":"parameter is null"}'))
  } else {
    // Symmetric key DB storage (condition : sesseionId)
    fs.writeFileSync('./out/' + sesseionId + '-key.txt', symmetricKey, 'utf-8')
    console.log(
      'file write done. symmetrickey-file path: ./out/%s-key.txt',
      sesseionId
    )
    res.send(true)
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
    rdb
      .get_currency_balance('eosio.token', 'omnione', 'EOS')
      .then(resp => {
        console.log('balance resp: %s', resp)
        // ex) resp : 100.0121 EOS
        let budget = parseFloat(resp.toString().split(' ')[0])
        // remain assert of budget > (cost * 3)
        if (budget > parseInt(cost) * 3) {
          // Symmetric key DB query (condition : did, sesseionId)
          let data = fs.readFileSync(
            './out/' + sesseionId + '-key.txt',
            'utf-8'
          )
          console.log('symmetrickey read: %s', data)
          res.send(data)
        } else {
          res.send(
            JSON.parse('{"result":false, "message":"budget is not enough"}')
          )
        }
      })
      .catch(next) // error passed on to the error handling route
  }
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
