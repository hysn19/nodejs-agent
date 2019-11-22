/* eslint-env mocha */
const assert = require('assert')

const transactions = require('./transactions')

describe('Transaction API', () => {
  it('newaccount', function() {
    const accountName = 'test2' // required EOS NameType
    const resp = transactions.newaccount(accountName)
  })
  it('transfer', function() {
    const memo = ''
    const resp = transactions.transfer(memo)
  })
})
