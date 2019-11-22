/* eslint-env mocha */
const assert = require('assert')

const rdb = require('./reading-blockchain')

describe('Reading Blockchain API', () => {
  it('get_table_rows', function() {
    const resp = rdb.get_table_rows('omnione', 'omnione', 'diddoc')
    console.dir(resp)
  })
  it('get_currency_balance', function() {
    const resp = rdb.get_currency_balance('eosio.token', 'omnione', 'EOS')
    console.dir(resp)
  })
  it('get_account', function() {
    const resp = rdb.get_account('omnione')
    console.dir(resp)
  })
  it('get_block', function() {
    const resp = rdb.get_block(1)
    console.dir(resp)
  })
})
