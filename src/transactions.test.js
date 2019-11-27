/* eslint-env mocha */
const assert = require('assert')

const trasnx = require('./transactions')

describe('Transaction API', () => {
  it('newdid', function() {
    const accountName = 'test1' // required EOS NameType
    const pubKey = 'EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV'
    const resp = trasnx.newdid(accountName, pubKey, pubKey)
  })
  // it('transfer', function() {
  //   const memo = ''
  //   const resp = trasnx.transfer(memo)
  // })
})
