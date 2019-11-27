// transactions.js
const { Api, JsonRpc, RpcError } = require('eosjs')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig') // development only
const fetch = require('node-fetch') // node only
const { TextDecoder, TextEncoder } = require('util') // node only
// const { TextEncoder, TextDecoder } = require("text-encoding"); // React Native, IE11, and Edge Browsers only

const privateKeys = ['5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3']

const signatureProvider = new JsSignatureProvider(privateKeys)
// const rpc = new JsonRpc('http://127.0.0.1:8888', { fetch })
const rpc = new JsonRpc('http://10.0.0.44:18888', { fetch })
const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder()
})

// Sending a transaction
async function newdid(eosId, pubKey1, pubKey2) {
  try {
    return await api.transact(
      {
        actions: [
          {
            account: 'eosio',
            name: 'newaccount',
            authorization: [
              {
                actor: 'eosio',
                permission: 'active'
              }
            ],
            data: {
              creator: 'eosio',
              name: eosId,
              owner: {
                threshold: 1,
                keys: [
                  {
                    key: pubKey1,
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
                    key: pubKey2,
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
              receiver: eosId,
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
              receiver: eosId,
              stake_net_quantity: '0.0001 EOS',
              stake_cpu_quantity: '0.0001 EOS',
              transfer: false
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
module.exports.transfer = transfer
