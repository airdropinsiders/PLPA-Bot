  import a4_0x38c3f7 from 'moment-timezone';
  import a4_0x53581d from 'fs';
  import a4_0x468c71 from 'path';
  import { parse } from 'querystring';
  import a4_0x2f4055 from './twist.js';
  export class Helper {
    static ['delay'] = (_0x5f12ae, _0x1ac711, _0x56f8b4, _0x1ab8ed) => {
      return new Promise(_0x12e2b9 => {
        let _0x17547f = _0x5f12ae;
        if (_0x1ac711 != undefined) {
          a4_0x2f4055.log(_0x56f8b4, _0x1ac711, _0x1ab8ed, "Delaying for " + this.msToTime(_0x5f12ae));
        } else {
          a4_0x2f4055.info((_0x56f8b4 ?? '') + " - Delaying for " + this.msToTime(_0x5f12ae));
        }
        const _0x4b291c = setInterval(() => {
          _0x17547f -= 0x3e8;
          if (_0x1ac711 != undefined) {
            a4_0x2f4055.log(_0x56f8b4, _0x1ac711, _0x1ab8ed, "Delaying for " + this.msToTime(_0x17547f));
          } else {
            a4_0x2f4055.info((_0x56f8b4 ?? '') + " - Delaying for " + this.msToTime(_0x17547f));
          }
          if (_0x17547f <= 0x0) {
            clearInterval(_0x4b291c);
            _0x12e2b9();
          }
        }, 0x3e8);
        setTimeout(async () => {
          clearInterval(_0x4b291c);
          await a4_0x2f4055.clearInfo();
          if (_0x1ac711) {
            a4_0x2f4055.log(_0x56f8b4, _0x1ac711, _0x1ab8ed);
          }
          _0x12e2b9();
        }, _0x5f12ae);
      });
    };
    static ['randomUserAgent']() {
      const _0x458e96 = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
      return _0x458e96[Math.floor(Math.random() * _0x458e96.length)];
    }
    static ['readTime'](_0x25a75f) {
      const _0x5472ce = a4_0x38c3f7.unix(_0x25a75f);
      return _0x5472ce.format("YYYY-MM-DD HH:mm:ss");
    }
    static ['getCurrentTimestamp']() {
      const _0x4c37e1 = a4_0x38c3f7().tz("Asia/Singapore").unix();
      return _0x4c37e1.toString();
    }
    static ['getSession'](_0x3cb391) {
      try {
        if (!a4_0x53581d.existsSync("accounts")) {
          a4_0x53581d.mkdirSync("accounts");
        }
        const _0x4da988 = a4_0x53581d.readdirSync(a4_0x468c71.resolve(_0x3cb391));
        const _0x8ed104 = [];
        _0x4da988.forEach(_0x3fa37e => {
          _0x8ed104.push(_0x3fa37e);
        });
        return _0x8ed104;
      } catch (_0xd16138) {
        throw Error("Error reading sessions directory: " + _0xd16138 + ',');
      }
    }
    static ["resetAccounts"]() {
      try {
        const _0x4d9791 = a4_0x468c71.resolve("accounts");
        const _0x242f07 = a4_0x53581d.readdirSync(_0x4d9791);
        console.log("Deleting Accounts...");
        _0x242f07.forEach(_0x4343de => {
          const _0x2ad892 = a4_0x468c71.join(_0x4d9791, _0x4343de);
          console.log(_0x2ad892);
          a4_0x53581d.rm(_0x2ad892, {
            'recursive': true,
            'force': true
          }, _0x20a8f8 => {
            if (_0x20a8f8) {
              console.error("Error deleting file " + _0x2ad892 + ':', _0x20a8f8);
            }
          });
        });
        console.info("Account reset successfully. Please restart the bot.");
      } catch (_0x998cb1) {
        console.error("Error deleting accounts: " + _0x998cb1);
        throw _0x998cb1;
      }
    }
    static ['getTelegramQuery'](_0x18d610, _0x5cf19e) {
      const _0x7512f5 = _0x18d610.indexOf('#');
      if (_0x7512f5 === -0x1) {
        throw new Error("No query string found in the URL.");
      }
      const _0xb66698 = _0x18d610.substring(_0x7512f5 + 0x1);
      const _0x3d09c4 = _0xb66698.split('&');
      const _0x109391 = _0x3d09c4[0x0].split('&')[0x0].replace('tgWebAppData=', '');
      if (!_0x109391) {
        throw new Error("Param not found in the query string.");
      }
      if (_0x5cf19e == '1') {
        return _0x109391;
      } else {
        if (_0x5cf19e == '2') {
          return this.decodeQueryString(_0x109391);
        } else {
          const _0x3c1a3c = this.decodeQueryString(_0x109391);
          return this.jsonToInitParam(_0x3c1a3c);
        }
      }
    }
    static ["getQueryFromUrl"](_0x5c4573) {
      var _0x21d3c2 = decodeURIComponent(iframeElement.src);
      var _0x43d43e = _0x21d3c2.split('#')[0x1] || '';
      var _0xf89294 = _0x43d43e.split('tgWebAppData=')[0x1] || '';
      var _0x226425 = _0xf89294.split('&');
      var _0x11ec8f = {};
      _0x226425.forEach(_0x1e5058 => {
        var [_0x3144f8, _0x1d1b0d] = _0x1e5058.split('=');
        if (_0x3144f8 && _0x1d1b0d) {
          _0x11ec8f[_0x3144f8] = _0x1d1b0d;
        }
      });
      var _0x213dfc = Object.keys(_0x11ec8f).filter(_0x1660f4 => !_0x1660f4.includes('tgWebApp')).map(_0x48a063 => _0x48a063 + '=' + _0x11ec8f[_0x48a063]).join('&');
      return _0x213dfc;
    }
    static ['jsonToInitParam'](_0x40f239) {
      const _0x54bf00 = parse(_0x40f239);
      if (_0x54bf00.user) {
        const _0x4d3456 = JSON.parse(_0x54bf00.user);
        _0x54bf00.user = encodeURIComponent(JSON.stringify(_0x4d3456));
      }
      const _0x5e1652 = [];
      for (const [_0x2c3cb0, _0x4020a7] of Object.entries(_0x54bf00)) {
        _0x5e1652.push(_0x2c3cb0 + '=' + _0x4020a7);
      }
      const _0x499ef3 = _0x5e1652.join('&');
      return _0x499ef3;
    }
    static ['decodeQueryString'](_0x13f37a) {
      const _0xac1ae3 = decodeURIComponent(_0x13f37a);
      const _0x5b0e57 = _0xac1ae3.split('&');
      const _0xb7be15 = {};
      _0x5b0e57.forEach(_0x8e740c => {
        const [_0x4b7447, _0x282df4] = _0x8e740c.split('=');
        if (_0x4b7447 === "user") {
          _0xb7be15[_0x4b7447] = JSON.parse(decodeURIComponent(_0x282df4));
        } else {
          _0xb7be15[_0x4b7447] = _0x282df4;
        }
      });
      const _0x254e41 = [];
      for (const [_0x492643, _0x5a1612] of Object.entries(_0xb7be15)) {
        if (_0x492643 === "user") {
          _0x254e41.push(_0x492643 + '=' + JSON.stringify(_0x5a1612));
        } else {
          _0x254e41.push(_0x492643 + '=' + _0x5a1612);
        }
      }
      return _0x254e41.join('&');
    }
    static ['createDir'](_0x3c7f1a) {
      try {
        const _0x2f4f6d = a4_0x468c71.join('accounts', _0x3c7f1a);
        if (!a4_0x53581d.existsSync('accounts')) {
          a4_0x53581d.mkdirSync('accounts');
        }
        a4_0x53581d.mkdirSync(_0x2f4f6d, {
          'recursive': true
        });
        console.log(_0x2f4f6d);
        return _0x2f4f6d;
      } catch (_0x36e897) {
        throw new Error("Error creating directory: " + _0x36e897);
      }
    }
    static ["saveQueryFile"](_0x5f2119, _0x2a9dff) {
      const _0x36ac8b = a4_0x468c71.resolve(_0x5f2119, "query.txt");
      a4_0x53581d.writeFile(_0x36ac8b, _0x2a9dff, 'utf8', _0x265b13 => {
        if (_0x265b13) {
          console.error("Error writing file:", _0x265b13);
        } else {
          console.log("Query File Created/Modified Successfully.");
        }
      });
    }
    static ['random'](_0x3a507d, _0x320cf2) {
      const _0xddd750 = Math.floor(Math.random() * (_0x320cf2 - _0x3a507d + 0x1)) + _0x3a507d;
      return _0xddd750;
    }
    static ['randomArr'](_0x35f9c8) {
      return _0x35f9c8[Math.floor(Math.random() * _0x35f9c8.length)];
    }
    static ["msToTime"](_0x114780) {
      const _0x4d4b03 = Math.floor(_0x114780 / 3600000);
      const _0x1bf5df = _0x114780 % 3600000;
      const _0x72e298 = Math.floor(_0x1bf5df / 60000);
      const _0xe389a2 = _0x1bf5df % 60000;
      const _0x625a48 = Math.round(_0xe389a2 / 0x3e8);
      return _0x4d4b03 + " Hours " + _0x72e298 + " Minutes " + _0x625a48 + " Seconds";
    }
    static ['queryToJSON'](_0x518a8b) {
      try {
        const _0x3017c6 = {};
        const _0x569713 = _0x518a8b.split('&');
        _0x569713.forEach(_0x14d3a0 => {
          const [_0x438310, _0x463724] = _0x14d3a0.split('=');
          if (_0x438310 === "user") {
            _0x3017c6[_0x438310] = JSON.parse(decodeURIComponent(_0x463724));
          } else {
            _0x3017c6[_0x438310] = decodeURIComponent(_0x463724);
          }
        });
        return _0x3017c6;
      } catch (_0x189e55) {
        throw Error("Invalid Query");
      }
    }
    static ['generateRandomString'](_0x4f99f4) {
      let _0x58d952 = '';
      const _0x34aadc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".length;
      for (let _0x366b3e = 0x0; _0x366b3e < _0x4f99f4; _0x366b3e++) {
        _0x58d952 += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * _0x34aadc));
      }
      return _0x58d952;
    }
    static ['readQueryFile'](_0x44b0ff) {
      try {
        const _0xd58900 = a4_0x468c71.resolve(_0x44b0ff);
        const _0x19978a = a4_0x53581d.readFileSync(_0xd58900, 'utf8');
        return _0x19978a;
      } catch (_0x1e7eb0) {
        console.log("No query.txt Files Found");
      }
    }
    static ['launchParamToQuery'](_0x181578) {
      const _0x8634b8 = new URLSearchParams(_0x181578);
      let _0x1cabd8 = decodeURIComponent(_0x8634b8.get("tgWebAppData"));
      const _0x2073ff = new URLSearchParams(_0x1cabd8);
      let _0x5a7363 = decodeURIComponent(_0x2073ff.get("user"));
      let _0x26d139 = JSON.parse(_0x5a7363);
      const _0x7ec8cc = {
        'query_id': _0x2073ff.get('query_id'),
        'user': _0x26d139,
        'auth_date': _0x2073ff.get('auth_date'),
        'hash': _0x2073ff.get("hash")
      };
      const _0x52ffb3 = JSON.stringify(_0x7ec8cc.user);
      const _0x7e3605 = encodeURIComponent(_0x52ffb3);
      let _0x7e839d = '';
      if (_0x7ec8cc.query_id) {
        _0x7e839d += 'query_id=' + encodeURIComponent(_0x7ec8cc.query_id) + '&';
      }
      _0x7e839d += 'user=' + _0x7e3605 + '&auth_date=' + encodeURIComponent(_0x7ec8cc.auth_date) + '&hash=' + encodeURIComponent(_0x7ec8cc.hash);
      return _0x7e839d;
    }
    static ["isFutureIso"](_0x177db0) {
      const _0x2719b2 = new Date(_0x177db0);
      const _0x185963 = new Date();
      return !!(_0x2719b2 > _0x185963);
    }
    static ['timeDif'](_0x350b3e) {
      const _0x16cf94 = new Date(_0x350b3e);
      const _0xb1d3bf = new Date();
      return _0x16cf94 - _0xb1d3bf;
    }
    static ['showSkelLogo']() {
      console.log("AirdropInsider");
    }
  }