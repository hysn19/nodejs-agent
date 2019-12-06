/* eslint-env mocha */
const assert = require('assert')

const trasnx = require('./transactions')

describe('Transaction API', () => {
  it('newdid', function() {
    const did = 'swlee.did' // required EOS NameType
    const keyId1 = 'key1'
    const pubKey1 = 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV'
    const keyId2 = 'key1'
    const pubKey2 = 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV'
    trasnx.newdid(did, keyId1, pubKey1, keyId2, pubKey2).then(resp => {
      console.log(resp)
    })
  })
  // it('transfer', function() {
  //   const memo = ''
  //   const resp = trasnx.transfer(memo)
  // })
})
