// reading-blockchain.js
const { JsonRpc, RpcError } = require('eosjs')
const fetch = require('node-fetch') // node only; not needed in browsers
// const rpc = new JsonRpc('http://127.0.0.1:8888', { fetch })
const rpc = new JsonRpc('http://10.0.0.44:8888', { fetch }) // seung-wook-pc

// Get table rows
async function get_table_rows(contract, account, table) {
  try {
    return await rpc.get_table_rows({
      json: true, // Get the response as json
      code: contract, // Contract that we target
      scope: account, // Account that owns the data
      table: table, // Table name
      limit: 10 // Maximum number of rows that we want to get
      // reverse = false,         // Optional: Get reversed data
      // show_payer = false,      // Optional: Show ram payer
    }).rows
  } catch (e) {
    console.log('\nCaught exception:' + e)
    if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2))
  }
}

// Get one row by index
async function get_table_rows_one(contract, account, table, lower_bound) {
  try {
    return await rpc.get_table_rows({
      json: true, // Get the response as json
      code: contract, // Contract that we target
      scope: account, // Account that owns the data
      table: table, // Table name
      lower_bound: lower_bound, // Table primary key value
      limit: 1 // Here we limit to 1 to get only the
      // reverse = false,            // Optional: Get reversed data
      // show_payer = false,         // Optional: Show ram payer
    }).rows
  } catch (e) {
    console.log('\nCaught exception:' + e)
    if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2))
  }
}

// Get one row by secondary index
async function get_table_rows_one_secondary(
  contract,
  account,
  table,
  table_key,
  lower_bound
) {
  try {
    return await rpc.get_table_rows({
      json: true, // Get the response as json
      code: contract, // Contract that we target
      scope: account, // Account that owns the data
      table: table, // Table name
      table_key: table_key, // Table secondaray key name
      lower_bound: lower_bound, // Table secondary key value
      limit: 1 // Here we limit to 1 to get only row
      // reverse = false,            // Optional: Get reversed data
      // show_payer = false,         // Optional: Show ram payer
    }).rows
  } catch (e) {
    console.log('\nCaught exception:' + e)
    if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2))
  }
}

// Get currency balance
async function get_currency_balance(code, account, symbol) {
  try {
    return await rpc.get_currency_balance(code, account, symbol)
  } catch (e) {
    console.log('\nCaught exception:' + e)
    if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2))
  }
}

// Get account info
async function get_account(accountName) {
  try {
    return await rpc.get_account(accountName)
  } catch (e) {
    console.log('\nCaught exception:' + e)
    if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2))
  }
}

// Get block
async function get_block(blockNumOrId) {
  try {
    return await rpc.get_block(blockNumOrId)
  } catch (e) {
    console.log('\nCaught exception:' + e)
    if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2))
  }
}

module.exports.get_table_rows = get_table_rows
module.exports.get_table_rows_one = get_table_rows_one
module.exports.get_table_rows_one_secondary = get_table_rows_one_secondary
module.exports.get_currency_balance = get_currency_balance
module.exports.get_account = get_account
module.exports.get_block = get_block
