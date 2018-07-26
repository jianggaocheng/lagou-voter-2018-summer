const wdaDriver = require('wda-driver');
const async = require("async");

/**
 * 参数配置部分
 */

// 手机IP地址
const wdaServerURL = 'http://192.168.123.56:8100';

// iphone 6sp/7p/8p
const positon = {
  menuPos: {
    x: 360,
    y: 30,
  },

  shareButton: {
    x: 42,
    y: 481,
  },

  fileHelper: {
    x: 170,
    y: 226
  },

  confirmShare: {
    x: 286,
    y: 480
  },
}

// 按钮点击间隔
const SLEEP = 200;


/**
 * 循环点击各个按钮，进行分享
 */

const client = new wdaDriver.Client(wdaServerURL);

let n = 1;

async function play() {
  let session = await client.session();

  // 点击菜单按钮
  await session.tap(positon.menuPos.x, positon.menuPos.y);

  // 暂停等待UI
  await sleep(SLEEP);

  // 点击分享按钮
  await session.tap(positon.shareButton.x, positon.shareButton.y);

  // 暂停等待UI
  await sleep(SLEEP);

  // 选择分享联系人第一位（文件传输助手）
  await session.tap(positon.fileHelper.x, positon.fileHelper.y);

  // 暂停等待UI
  await sleep(SLEEP);

  // 点击确定分享
  await session.tap(positon.confirmShare.x, positon.confirmShare.y);

  // 暂停等待UI
  await sleep(SLEEP);

  console.log(`第${n++} 轮分享完成`);
};

const sleep = async function (ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async.forever(play, (e) => console.error('程序出错，请重新运行', e));
// play();