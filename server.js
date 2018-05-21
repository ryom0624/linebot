'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelAccessToken: 'WUWNeiq6t4bOSZTGxBsIIQDPrq+iHCGxV/qgcSMl3JufaY8UluRZZ7l6NcG7lSUtIKwL6Cz0a7aCBC+yPLP6kQUqBH2KSSjRbGQdXVR3QKM/OE+X1Z5VXKyNS1Uo1nNbsA3WaYUjTHB5ruJZAT2N3QdB04t89/1O/w1cDnyilFU=',
    channelSecret: '1cc12e5274aa62e2b638f2b0ad748a31'
};

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(config);

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);