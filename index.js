const wda = require("wda");
const wdaDriver = require('wda-driver');

const wdaServerURL = 'http://192.168.2.2:8100';

const c = new wdaDriver.Client(wdaServerURL);

async function play(){
  let s = await c.session();
  console.log('c',s);
};

// connect();
play();