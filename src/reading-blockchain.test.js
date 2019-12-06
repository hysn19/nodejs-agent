/* eslint-env mocha */
const assert = require('assert')

const rdb = require('./reading-blockchain')

describe('Reading Blockchain API', () => {
  // it('get_table_rows', function() {
  //   const resp = rdb.get_table_rows('omnione', 'omnione', 'diddoc')
  //   console.dir(resp)
  // })
  // it('get_currency_balance', function() {
  //   rdb.get_currency_balance('eosio.token', 'swlee.did', 'EOS').then(resp => {
  //     console.log('\nget_currency_balance')
  //     console.log(resp)
  //   })
  // })
  it('get_account', function() {
    rdb.get_account('swlee').then(resp => {
      console.log('\nget_account')
      console.log(resp)
    })
  })
  it('get_block', function() {
    rdb.get_block(1).then(resp => {
      console.log('\nget_block')
      console.log(resp)
    })
  })
})
