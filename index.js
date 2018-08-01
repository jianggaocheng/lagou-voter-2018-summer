const wdaDriver = require('wda-driver');
const async = require("async");

// 手机IP地址
const wdaServerURL = 'http://192.168.2.2:8100';

// 按钮点击间隔
const SLEEP = 100;

const client = new wdaDriver.Client(wdaServerURL);

// 缓存按键位置，减少查询element时间开销
const positionMap = {};

(async () => {
  let session = await client.session();

  let n = 1;

  // 切换为竖屏
  await session.orientation('PORTRAIT')

  // 循环脚本，点击各个按钮
  async function play() {
    await clickElementByName(session, '更多', 'more');
    await sleep(SLEEP);

    await clickElementByName(session, '发送给朋友', 'share');
    await sleep(SLEEP);

    await clickElementByName(session, '文件传输助手', 'file');
    await sleep(SLEEP);

    await clickElementByName(session, '发送', 'send');
    await sleep(SLEEP);

    console.log(`第 ${n++} 轮分享完成`);
  };

  /**
   * 暂停等待UI响应
   * @param {*} ms 毫秒数
   */
  const sleep = async (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  /**
   * 查找element并模拟点击
   * @param {*} session wda session
   * @param {*} name elememt的name
   * @param {*} key 缓存key
   */
  const clickElementByName = async (session, name, key = '') => {
    let rect = {};

    // 优先从缓存中查找，避免重复搜索element
    if (key && positionMap[key]) {
      rect = positionMap[key];
    } else {
      let element = await session.selector({ name: name }).get();
      rect = await element.getBounds();
      positionMap[key] = rect;
    }

    let clickX = rect.x + parseInt(Math.random() * rect.width * 0.8);
    let clickY = rect.y + parseInt(Math.random() * rect.height * 0.5);

    console.log(`Tap ${name}  [ ${clickX}, ${clickY} ]`);

    return await session.tap(clickX, clickY);
  }

  async.forever(play, (e) => console.error('程序出错，请重新运行', e));
  // play();
})();
