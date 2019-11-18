// server.js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("hello world!\n");
});

app.get("/newaccount", (req, res) => {
  var newaccountName = "selee1";

  var getapi = require("./transactions.js");
  getapi.newaccount(newaccountName).then(resp => {
    res.send(resp);
  });
});

app.get("/transfer", (req, res) => {
  var memo = {
    authentication: [
      {
        publicKey: "did:omn:3F7BRt7Dpkvqm2da21uUPsJMXMRk#key-1"
      }
    ],
    id: "did:omn:3F7BRt7Dpkvqm2da21uUPsJMXMRk",
    proof: {
      created: "2019-11-18T16:23:49",
      creator: "did:omn:3F7BRt7Dpkvqm2da21uUPsJMXMRk#key-1",
      nonce: "2MbmFfgqsuKir4Tafgvaxytrd5cB",
      signatureValue:
        "3kAWg4uAAyLTwMGzm3W89Zq2u5mG4Y2QMo2qmqTHYgmPEXEgbNxp11Q3gjDnJuTWgQeq9kS3gh61Wbhtbea7cpG9c",
      type: "EcdsaKoblitzSignature2016"
    },
    publicKey: [
      {
        id: "did:omn:3F7BRt7Dpkvqm2da21uUPsJMXMRk#key-1",
        publicKeyBase58: "iQmXiBxL9MHkGb1PP8gpqspAqxBxxYq43N8ukNyMSV7u",
        type: "EdDsaSASignatureSecp256k1"
      }
    ]
  };

  var getapi = require("./transactions.js");
  getapi.transfer(memo).then(resp => {
    res.send(resp);
  });
});

app.get("/get_table_rows", (req, res) => {
  var contract = "omnione";
  var account = "omnione";
  var table = "diddoc";

  var getapi = require("./readingblockchain.js");
  getapi.get_table_rows(contract, account, table).then(resp => {
    res.send(resp);
  });
});

app.get("/get_currency_balance", (req, res) => {
  var code = "eosio.token";
  var account = "omnione";
  var symbol = "EOS";

  var getapi = require("./readingblockchain.js");
  getapi.get_currency_balance(code, account, symbol).then(resp => {
    res.send(resp);
  });
});

app.get("/get_account", (req, res) => {
  var accountName = "omnione";
  // var accountName = req.params.accountName;

  var getapi = require("./readingblockchain.js");
  getapi.get_account(accountName).then(resp => {
    res.send(resp);
  });
});

app.get("/get_block", (req, res) => {
  var blockNumOrId = 1;
  // var blockNumOrId = req.params.blockNumOrId;

  var getapi = require("./readingblockchain.js");
  getapi.get_block(blockNumOrId).then(resp => {
    res.send(resp);
  });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
