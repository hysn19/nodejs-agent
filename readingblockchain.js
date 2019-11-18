// readingblockchain.js

const { JsonRpc } = require("eosjs");
const fetch = require("node-fetch"); // node only; not needed in browsers
const rpc = new JsonRpc("http://127.0.0.1:8888", { fetch });

(async () => {
  try {
    // Get table rows
    const resp = await rpc.get_table_rows({
      json: true, // Get the response as json
      code: "omnione", // Contract that we target
      scope: "omnione", // Account that owns the data
      table: "diddoc", // Table name
      limit: 10 // Maximum number of rows that we want to get
      // reverse = false,         // Optional: Get reversed data
      // show_payer = false,      // Optional: Show ram payer
    });

    // Get one row by index
    // const resp = await rpc.get_table_rows({
    //   json: true,                 // Get the response as json
    //   code: 'omnione',            // Contract that we target
    //   scope: 'omnione',           // Account that owns the data
    //   table: 'diddoc',            // Table name
    //   lower_bound: 'testacc',     // Table primary key value
    //   limit: 1,                   // Here we limit to 1 to get only the
    //   reverse = false,            // Optional: Get reversed data
    //   show_payer = false,         // Optional: Show ram payer
    // });

    // Get one row by secondary index
    // const resp = await rpc.get_table_rows({
    //   json: true,                 // Get the response as json
    //   code: 'omnione',            // Contract that we target
    //   scope: 'omnione',           // Account that owns the data
    //   table: 'diddoc',            // Table name
    //   table_key: 'did_id',        // Table secondaray key name
    //   lower_bound: 21,            // Table secondary key value
    //   limit: 1,                   // Here we limit to 1 to get only row
    //   reverse = false,            // Optional: Get reversed data
    //   show_payer = false,         // Optional: Show ram payer
    // });

    console.log("\nget_table_rows:", resp.rows);

    // Get currency balance
    console.log(
      "\nget_currency_balance:",
      await rpc.get_currency_balance("eosio.token", "omnione", "EOS")
    );

    // Get account info
    console.log("\nGet account info:", await rpc.get_account("omnione"));

    // Get block
    console.log("\nGet block:", await rpc.get_block(1));
  } catch (e) {
    console.log("\nCaught exception:" + e);
    if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2));
  }
})();
