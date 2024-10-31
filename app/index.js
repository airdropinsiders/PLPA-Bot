  import { proxyList } from './config/proxy_list.js';
  import { Core } from './src/core/core.js';
  import { Telegram } from './src/core/telegram.js';
  import { Helper } from './src/utils/helper.js';
  import a0_0x3687b7 from './src/utils/logger.js';
  import a0_0x2621de from './src/utils/twist.js';
  async function operation(_0x36d935, _0x1adac2, _0x5d7d14, _0x196d41) {
    try {
      const _0x3d1db1 = new Core(_0x36d935, _0x1adac2, _0x5d7d14, _0x196d41);
      await _0x3d1db1.login(true);
      await _0x3d1db1.getDailySignIn(true);
      if (_0x3d1db1.user.isSignIn == 0x0) {
        await _0x3d1db1.signIn();
      }
      await _0x3d1db1.getUserTask();
      await _0x3d1db1.getAvailableMissions();
      for (const _0x1a464b of _0x3d1db1.availableTask) {
        if (_0x3d1db1.task[_0x1a464b.key] == 0x0) {
          await _0x3d1db1.completeTask(_0x1a464b);
        }
      }
      while (_0x3d1db1.user.energy != 0x0 && _0x3d1db1.user.isReachTodayLimit == 0x0) {
        await _0x3d1db1.tap(_0x3d1db1.user.energy);
      }
      let _0x47f87b = (_0x3d1db1.user.maxEnergy - _0x3d1db1.user.energy) * 0x2710 + Helper.random(0x0, 0xea60);
      await Helper.delay(_0x47f87b, _0x36d935, "Account " + _0x36d935.id + " Processing Complete, Delaying for " + Helper.msToTime(_0x47f87b), _0x3d1db1);
      await operation(_0x36d935, _0x1adac2, _0x5d7d14, _0x196d41);
    } catch (_0xa1857d) {
      if (_0xa1857d.message.includes('401')) {
        if (_0x36d935.type == "query") {
          await Helper.delay(0x3e8, _0x36d935, "Error : " + _0xa1857d.message + ", Query Is Expired, Please Get New Query");
        } else {
          await Helper.delay(0x1388, _0x36d935, "Error : " + _0xa1857d.message + ", Query Is Expired, Getting New Query in 5 Seconds");
          const _0x23a8b4 = new Telegram();
          await _0x23a8b4.useSession(_0x36d935.accounts, _0x196d41);
          const _0x52820a = await _0x23a8b4.client.getMe();
          _0x52820a.type = 'sessions';
          _0x52820a.accounts = _0x36d935.accounts;
          _0x52820a.id = _0x52820a.id.value;
          const _0x2c05e4 = await _0x23a8b4.resolvePeer().then(async () => {
            return await _0x23a8b4.initWebView();
          })['catch'](_0x5c70b3 => {
            throw _0x5c70b3;
          });
          const _0x5e906d = Helper.queryToJSON(_0x2c05e4);
          await _0x23a8b4.disconnect();
          await Helper.delay(0x1388, _0x52820a, "Successfully get new query");
          await operation(_0x52820a, _0x2c05e4, _0x5e906d, _0x196d41);
        }
      } else {
        await Helper.delay(0x1388, _0x36d935, "Error : " + _0xa1857d.message + ", Retrying after 5 Seconds");
        await operation(_0x36d935, _0x1adac2, _0x5d7d14, _0x196d41);
      }
    }
  }
  let init = false;
  async function startBot() {
    return new Promise(async (_0x51cc06, _0x10b0f4) => {
      try {
        a0_0x3687b7.info("BOT STARTED");
        const _0x45e3d0 = await new Telegram();
        if (init == false) {
          await _0x45e3d0.init();
          init = true;
        }
        const _0x282b15 = Helper.getSession('accounts');
        const _0x27eafb = [];
        if (proxyList.length > 0x0) {
          if (_0x282b15.length != proxyList.length) {
            _0x10b0f4("You have " + _0x282b15.length + " Session but you provide " + proxyList.length + " Proxy");
          }
        }
        for (const _0x4221f3 of _0x282b15) {
          const _0x5d8ba2 = _0x282b15.indexOf(_0x4221f3);
          const _0x2adf1c = proxyList.length > 0x0 ? proxyList[_0x5d8ba2] : undefined;
          if (!_0x4221f3.includes('query')) {
            await _0x45e3d0.useSession('accounts/' + _0x4221f3, _0x2adf1c);
            _0x45e3d0.session = _0x4221f3;
            const _0x41def1 = await _0x45e3d0.client.getMe();
            _0x41def1.type = 'sessions';
            _0x41def1.accounts = 'accounts/' + _0x4221f3;
            _0x41def1.id = _0x41def1.id.value;
            const _0x431c2f = await _0x45e3d0.resolvePeer().then(async () => {
              return await _0x45e3d0.initWebView();
            })['catch'](_0x4b77d7 => {
              throw _0x4b77d7;
            });
            const _0x173136 = Helper.queryToJSON(_0x431c2f);
            await _0x45e3d0.disconnect();
            _0x27eafb.push([_0x41def1, _0x431c2f, _0x173136, _0x2adf1c]);
          } else {
            let _0xe26d3 = Helper.readQueryFile('accounts/' + _0x4221f3 + '/query.txt');
            let _0x44cd48 = Helper.queryToJSON(_0xe26d3);
            if (!_0x44cd48.user) {
              _0x44cd48 = await Helper.queryToJSON(await Helper.launchParamToQuery(_0xe26d3));
              _0xe26d3 = await Helper.launchParamToQuery(_0xe26d3);
            }
            const _0x4b9cbe = _0x44cd48.user;
            _0x4b9cbe.type = 'query';
            _0x4b9cbe.firstName = _0x4b9cbe.first_name;
            _0x4b9cbe.lastName = _0x4b9cbe.last_name;
            _0x27eafb.push([_0x4b9cbe, _0xe26d3, _0x44cd48, _0x2adf1c]);
          }
        }
        const _0x5a20cb = _0x27eafb.map(async _0x4f0688 => {
          await operation(_0x4f0688[0x0], _0x4f0688[0x1], _0x4f0688[0x2], _0x4f0688[0x3]);
        });
        await Promise.all(_0x5a20cb);
        _0x51cc06();
      } catch (_0x5acfd5) {
        a0_0x3687b7.info("BOT STOPPED");
        a0_0x3687b7.error(JSON.stringify(_0x5acfd5));
        _0x10b0f4(_0x5acfd5);
      }
    });
  }
  (async () => {
    try {
      a0_0x3687b7.clear();
      a0_0x3687b7.info('');
      a0_0x3687b7.info("Application Started");
      console.log("PLPA TAP BOT");
      console.log();
      console.log("Join Channel : https://t.me/AirdropInsiderID");
      console.log("Dont forget to run git pull to keep up to date");
      console.log();
      console.log();
      Helper.showSkelLogo();
      await startBot();
    } catch (_0x3d2408) {
      await a0_0x2621de.clear();
      await a0_0x2621de.clearInfo();
      console.log("Error During executing bot", _0x3d2408);
      await startBot();
    }
  })();