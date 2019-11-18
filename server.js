// server.js

// const http = require("http");

// const hostname = "127.0.0.1";
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World\n");
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello World!\n");
// });
// app.get("/index", (req, res) => {
//   res.send("Hello World! aaaaaa \n");
// });

// app.listen(3000, () => {
//   console.log("Example app listening on port 3000!");
// });

// --------------------------------------

// CommonJS
const { Api, JsonRpc, RpcError } = require("eosjs");
const { JsSignatureProvider } = require("eosjs/dist/eosjs-jssig"); // development only
const fetch = require("node-fetch"); // node only; not needed in browsers // setup : npm install node-fetch --save
const { TextEncoder, TextDecoder } = require("util"); // node only; native TextEncoder/Decoder
// const { TextEncoder, TextDecoder } = require("text-encoding"); // React Native, IE11, and Edge Browsers only

// Signature Provider
const defaultPrivateKey = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"; // local node prikey
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

// JSON-RPC
const rpc = new JsonRpc("http://127.0.0.1:8888", { fetch });

// API
const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder()
});

// Sending a transaction
(async () => {
  try {
    // --------------------------------
    // get info
    // --------------------------------
    const result = await api.transact(
      {
        actions: [
          {
            account: "eosio",
            name: "getinfo",
            authorization: [
              {
                actor: "swlee",
                permission: "active"
              }
            ],
            data: {
              from: "swlee",
              to: "omnione",
              quantity: "0.0001 EOS",
              memo: ""
            }
          }
        ]
      },
      {
        blocksBehind: 3,
        expireSeconds: 30
      }
    );
    // --------------------------------
    // transfer
    // --------------------------------
    // const result = await api.transact(
    //   {
    //     actions: [
    //       {
    //         account: "eosio.token",
    //         name: "transfer",
    //         authorization: [
    //           {
    //             actor: "swlee",
    //             permission: "active"
    //           }
    //         ],
    //         data: {
    //           from: "swlee",
    //           to: "omnione",
    //           quantity: "0.0001 EOS",
    //           memo: ""
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     blocksBehind: 3,
    //     expireSeconds: 30
    //   }
    // );
    // --------------------------------
    // Create New Account (multiple actions)
    // --------------------------------
    // const result = await api.transact(
    //   {
    //     actions: [
    //       {
    //         account: "eosio",
    //         name: "newaccount",
    //         authorization: [
    //           {
    //             actor: "eosio",
    //             permission: "active"
    //           }
    //         ],
    //         data: {
    //           creator: "eosio",
    //           name: "swlee4",
    //           owner: {
    //             threshold: 1,
    //             keys: [
    //               {
    //                 key:
    //                   "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    //                 weight: 1
    //               }
    //             ],
    //             accounts: [],
    //             waits: []
    //           },
    //           active: {
    //             threshold: 1,
    //             keys: [
    //               {
    //                 key:
    //                   "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
    //                 weight: 1
    //               }
    //             ],
    //             accounts: [],
    //             waits: []
    //           }
    //         }
    //       },
    //       {
    //         account: "eosio",
    //         name: "buyrambytes",
    //         authorization: [
    //           {
    //             actor: "eosio",
    //             permission: "active"
    //           }
    //         ],
    //         data: {
    //           payer: "eosio",
    //           receiver: "swlee4",
    //           bytes: 8192
    //         }
    //       },
    //       {
    //         account: "eosio",
    //         name: "delegatebw",
    //         authorization: [
    //           {
    //             actor: "eosio",
    //             permission: "active"
    //           }
    //         ],
    //         data: {
    //           from: "eosio",
    //           receiver: "swlee4",
    //           stake_net_quantity: "1.0000 EOS",
    //           stake_cpu_quantity: "1.0000 EOS",
    //           transfer: false
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     blocksBehind: 3,
    //     expireSeconds: 30
    //   }
    // );
    // --------------------------------
    console.dir(result);
  } catch (e) {
    console.log("\nCaught exception: " + e);
    if (e instanceof RpcError) console.log(JSON.stringify(e.json, null, 2));
  }
})();
