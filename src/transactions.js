// transactions.js
const { Api, JsonRpc, RpcError } = require('eosjs')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig') // development only
const fetch = require('node-fetch') // node only
const { TextDecoder, TextEncoder } = require('util') // node only
// const { TextEncoder, TextDecoder } = require("text-encoding"); // React Native, IE11, and Edge Browsers only

const privateKeys = ['5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3']

const signatureProvider = new JsSignatureProvider(privateKeys)
// const rpc = new JsonRpc('http://10.0.0.44:8888', { fetch }) // seung-wook-pc
const rpc = new JsonRpc('http://15.164.140.232:18888', { fetch }) // aws-test
const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder()
})

// Sending a transaction
async function newdid(did, ownerkeyid, ownerpubkey, activekeyid, activepubkey) {
  console.log('did: ' + did)
  console.log('ownerkeyid: ' + ownerkeyid)
  console.log('ownerpubkey: ' + ownerpubkey)
  console.log('activekeyid: ' + activekeyid)
  console.log('activepubkey: ' + activepubkey)
  try {
    let transaction = {
      actions: [
        {
          account: 'eosio',
          name: 'newdid',
          authorization: [
            {
              actor: 'eosio',
              permission: 'active'
            }
          ],
          data: {
            creator: 'eosio',
            did: did,
            ownerkeyid: ownerkeyid,
            activekeyid: activekeyid,
            owner: {
              threshold: 1,
              keys: [
                {
                  key: ownerpubkey,
                  weight: 1
                }
              ],
              accounts: [],
              waits: []
            },
            active: {
              threshold: 1,
              keys: [
                {
                  key: activepubkey,
                  weight: 1
                }
              ],
              accounts: [],
              waits: []
            }
          }
        },
        {
          account: 'eosio',
          name: 'buyrambytes',
          authorization: [
            {
              actor: 'eosio',
              permission: 'active'
            }
          ],
          data: {
            payer: 'eosio',
            receiver: did,
            bytes: 8192
          }
        },
        {
          account: 'eosio',
          name: 'delegatebw',
          authorization: [
            {
              actor: 'eosio',
              permission: 'active'
            }
          ],
          data: {
            from: 'eosio',
            receiver: did,
            stake_net_quantity: '0.0001 EOS',
            stake_cpu_quantity: '0.0001 EOS',
            transfer: false
          }
        }
      ]
    }
    console.dir(transaction)
    console.dir(transaction.actions[0])
    console.dir(transaction.actions[1])
    console.dir(transaction.actions[2])

    return await api.transact(transaction, {
      blocksBehind: 3,
      expireSeconds: 30
    })
  } catch (e) {
    if (e instanceof RpcError) return e.json
    else console.log('Caught exception: ' + e)
  }
}

async function addauth() {
  try {
    return await api.transact(
      {
        actions: [
          {
            account: 'eosio',
            name: 'addauth',
            authorization: [
              {
                actor: 'eosio',
                permission: 'active'
              }
            ],
            data: {
              from: 'swlee',
              to: 'omnione',
              quantity: '0.0001 EOS',
              memo: memo
            }
          }
        ]
      },
      {
        blocksBehind: 3,
        expireSeconds: 30
      }
    )
  } catch (e) {
    if (e instanceof RpcError) return e.json
    else console.log('Caught exception: ' + e)
  }
}

async function modifyauth() {
  try {
    return await api.transact(
      {
        actions: [
          {
            account: 'eosio',
            name: 'modifyauth',
            authorization: [
              {
                actor: 'eosio',
                permission: 'active'
              }
            ],
            data: {
              from: 'swlee',
              to: 'omnione',
              quantity: '0.0001 EOS',
              memo: memo
            }
          }
        ]
      },
      {
        blocksBehind: 3,
        expireSeconds: 30
      }
    )
  } catch (e) {
    if (e instanceof RpcError) return e.json
    else console.log('Caught exception: ' + e)
  }
}

async function removeauth() {
  try {
    return await api.transact(
      {
        actions: [
          {
            account: 'eosio',
            name: 'removeauth',
            authorization: [
              {
                actor: 'eosio',
                permission: 'active'
              }
            ],
            data: {
              from: 'swlee',
              to: 'omnione',
              quantity: '0.0001 EOS',
              memo: memo
            }
          }
        ]
      },
      {
        blocksBehind: 3,
        expireSeconds: 30
      }
    )
  } catch (e) {
    if (e instanceof RpcError) return e.json
    else console.log('Caught exception: ' + e)
  }
}

async function transfer(memo) {
  try {
    return await api.transact(
      {
        actions: [
          {
            account: 'eosio.token',
            name: 'transfer',
            authorization: [
              {
                actor: 'swlee',
                permission: 'active'
              }
            ],
            data: {
              from: 'swlee',
              to: 'omnione',
              quantity: '0.0001 EOS',
              memo: memo
            }
          }
        ]
      },
      {
        blocksBehind: 3,
        expireSeconds: 30
      }
    )
  } catch (e) {
    console.log('\nCaught exception:' + e)
    if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2))
    return JSON.stringify(e.json, null, 2)
  }
}

module.exports.newdid = newdid
module.exports.addauth = addauth
module.exports.modifyauth = modifyauth
module.exports.removeauth = removeauth
module.exports.transfer = transfer
