  import { HttpsProxyAgent } from 'https-proxy-agent';
  import { Helper } from '../utils/helper.js';
  import a1_0x14754a from '../utils/logger.js';
  export class API {
    constructor(_0x58b0a9, _0xe22665, _0xace2a0, _0x5c0d4e, _0x1b1c46, _0x4bebad) {
      this.url = _0x5c0d4e;
      this.queryObj = _0xe22665;
      this.host = _0x1b1c46;
      this.origin = _0x4bebad;
      this.ua = Helper.randomUserAgent();
      this.query = _0x58b0a9;
      this.proxy = _0xace2a0;
    }
    async ["generateHeaders"]() {
      const _0x186cef = {
        'Accept': "application/json, text/plain, */*",
        'Content-Type': 'application/json',
        'User-Agent': this.ua,
        'Host': this.host,
        'Origin': this.origin,
        'Connection': 'keep-alive',
        'Priority': "u=3, i",
        'Sec-Fetch-Dest': "empty",
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site'
      };
      return _0x186cef;
    }
    async ['fetch'](_0x16677b, _0x5a8fed = "GET", _0x5d63e4, _0x144f8a = {}, _0x4bb7a7 = {}) {
      try {
        let _0x546feb = _0x16677b.includes('raw.githubusercontent.com') ? _0x16677b : '' + this.url + _0x16677b + '?appName=Netscape&appCodeName=Mozilla&appVersion=5.0+(Macintosh%3B+Intel+Mac+OS+X+10_15_7)+AppleWebKit%2F605.1.15+(KHTML,+like+Gecko)&userAgent=Mozilla%2F5.0+(Macintosh%3B+Intel+Mac+OS+X+10_15_7)+AppleWebKit%2F605.1.15+(KHTML,+like+Gecko)&cookieEnabled=true&platform=MacIntel&userLanguage=en-GB&vendor=Apple+Computer,+Inc.&onLine=true&product=Gecko&productSub=20030107&mimeTypesLen=2&pluginsLen=5&javaEnbled=false&windowScreenWidth=1440&windowScreenHeight=900&windowColorDepth=24';
        const _0x5e2caf = {
          ..._0x4bb7a7,
          ...(await this.generateHeaders())
        };
        if (_0x5d63e4) {
          _0x546feb = _0x546feb + '&' + _0x5d63e4;
        }
        const _0x4d1c8b = {
          'method': _0x5a8fed,
          'headers': _0x5e2caf,
          'body': _0x5a8fed !== 'GET' ? JSON.stringify(_0x144f8a) : undefined,
          'referer': this.origin + '/'
        };
        if (this.proxy) {
          _0x4d1c8b.agent = new HttpsProxyAgent(this.proxy, {
            'rejectUnauthorized': false
          });
        }
        a1_0x14754a.info(_0x5a8fed + " : " + _0x546feb + " " + (this.proxy ? this.proxy : ''));
        a1_0x14754a.info("Request Header : " + JSON.stringify(_0x5e2caf));
        a1_0x14754a.info("Request Body : " + JSON.stringify(_0x144f8a));
        const _0x130cfd = await fetch(_0x546feb, _0x4d1c8b);
        const _0x2a1193 = _0x130cfd.headers.get('Content-Type');
        let _0x11c6fd;
        if (_0x2a1193 && _0x2a1193.includes('application/json')) {
          _0x11c6fd = await _0x130cfd.json();
        } else {
          if (_0x546feb.includes('raw.githubusercontent.com')) {
            _0x11c6fd = await _0x130cfd.json();
          } else {
            _0x11c6fd = await _0x130cfd.text();
          }
        }
        const _0x3fa107 = {
          'rc': _0x130cfd.ok ? 0xc8 : _0x130cfd.status,
          ..._0x11c6fd
        };
        a1_0x14754a.info("Response : " + _0x130cfd.status + " " + _0x130cfd.statusText);
        a1_0x14754a.info("Response Data : " + JSON.stringify(_0x11c6fd).substring(0x0, 0x96) + "...");
        return _0x3fa107;
      } catch (_0xde1333) {
        a1_0x14754a.error("Error : " + _0xde1333.message);
        if (_0xde1333.response) {
          if (_0xde1333.response.status === 0x190) {
            const _0xb2540d = {
              'rc': _0xde1333.response.status,
              ...(await _0xde1333.response.json())
            };
            return _0xb2540d;
          } else {
            throw Error('' + _0xde1333.response.status);
          }
        } else {
          throw Error(_0xde1333.status + " - " + _0xde1333.statusText);
        }
      }
    }
  }