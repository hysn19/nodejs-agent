/* eslint-env mocha */
const assert = require('assert')

const trasnx = require('./transactions')

describe('Transaction API', () => {
  it('newaccount', function() {
    const accountName = 'test2' // required EOS NameType
    const resp = trasnx.newaccount(accountName)
  })
  it('transfer', function() {
    const memo = ''
    const resp = trasnx.transfer(memo)
  })
})
