// app.js
const express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')

const trasnx = require('./src/transactions')
const rdb = require('./src/reading-blockchain')
const logger = require('./config/winston')

const app = express()

// post request : body parser using
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/**
 * Account registration
 *
 * @param id
 * @param pubKey1
 * @param pubKey2
 * @returns
 */
app.post('/newdid', (req, res, next) => {
  const id = req.body.id
  const pubKey1 = req.body.pubKey1
  const pubKey2 = req.body.pubKey2
  logger.info('id: ' + id)
  logger.info('pubKey1: ' + pubKey1)
  logger.info('pubKey2: ' + pubKey2)

  if (
    typeof id == 'undefined' ||
    id == null ||
    typeof pubKey1 == 'undefined' ||
    pubKey1 == null ||
    typeof pubKey2 == 'undefined' ||
    pubKey2 == null
  ) {
    let resp = {
      code: 400,
      message: 'parameter is null',
      body: {}
    }
    res.send(resp)
  } else {
    trasnx.newdid(id, pubKey1, pubKey2).then(resp => {
      logger.info(typeof resp)
      if (typeof /s/ === 'object') {
        if (resp.transaction_id != undefined) {
          let success = {
            code: 200,
            message: 'success',
            body: {
              id: resp.processed.id,
              block_num: resp.processed.block_num
            }
          }
          console.log(success)
          res.send(success)
        } else {
          let fail = {
            code: resp.code,
            message: resp.message,
            body: {
              code: resp.error.code,
              // name: resp.error.name,
              what: resp.error.what
            }
          }
          console.log(fail)
          res.send(fail)
        }
      }
      if (typeof resp == 'string') {
        console.log(resp)
        res.send(resp)
      }
    })
  }
})

// ------------------------------------- /
// node contract api test action
// ------------------------------------- /
app.get('/addauth', (req, res, next) => {
  trasnx.addauth().then(resp => {
    console.log(resp)
  })
})
app.get('/modifyauth', (req, res, next) => {
  trasnx.modifyauth().then(resp => {
    console.log(resp)
  })
})
app.get('/removeauth', (req, res, next) => {
  trasnx.removeauth().then(resp => {
    console.log(resp)
  })
})
// ------------------------------------- /

/**
 * Symmetric-key DB storage
 *
 * @param id
 * @param key
 * @returns
 */
app.post('/addsymmetrickey', (req, res, next) => {
  const sesseionId = req.body.id
  const symmetricKey = req.body.key
  if (
    typeof sesseionId == 'undefined' ||
    sesseionId == null ||
    typeof symmetricKey == 'undefined' ||
    symmetricKey == null
  ) {
    let resp = {
      code: 400,
      message: 'parameter is null',
      body: {}
    }
    res.send(resp)
  } else {
    // Symmetric key DB storage (condition : sesseionId)
    fs.writeFileSync('./out/' + sesseionId + '-key.txt', symmetricKey, 'utf-8')
    logger.info(
      'file write done. symmetrickey-file path: ./out/%s-key.txt',
      sesseionId
    )
    res.send(true)
  }
})

/**
 * Symmetric-key DB query
 *
 * @param id
 * @param auth
 * @parm cost
 * @returns
 */
app.post('/getsymmetrickey', (req, res, next) => {
  const auth = req.body.auth
  const sesseionId = req.body.id
  const cost = req.body.cost
  if (
    typeof auth == 'undefined' ||
    auth == null ||
    typeof sesseionId == 'undefined' ||
    sesseionId == null ||
    typeof cost == 'undefined' ||
    cost == null
  ) {
    let resp = {
      code: 400,
      message: 'parameter is null',
      body: {}
    }
    res.send(resp)
  } else {
    rdb
      .get_currency_balance('eosio.token', 'omnione', 'EOS')
      .then(resp => {
        logger.info('balance resp: %s', resp)
        // ex) resp : 100.0121 EOS
        let budget = parseFloat(resp.toString().split(' ')[0])
        // remain assert of budget > (cost * 3)
        if (budget > parseInt(cost) * 3) {
          // Symmetric key DB query (condition : did, sesseionId)
          let data = fs.readFileSync(
            './out/' + sesseionId + '-key.txt',
            'utf-8'
          )
          logger.info('symmetrickey read: %s', data)
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
  logger.info('staging server listening on port 3000')
})
