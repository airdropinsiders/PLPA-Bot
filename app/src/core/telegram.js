  import a3_0x309651 from 'input';
  import { Helper } from '../utils/helper.js';
  import { Api, TelegramClient } from 'telegram';
  import { StoreSession } from 'telegram/sessions/StoreSession.js';
  import a3_0x5addbc from '../utils/logger.js';
  import { FloodWaitError } from 'telegram/errors/RPCErrorList.js';
  import { Config } from '../../config/config.js';
  import { HttpsProxyAgent } from 'https-proxy-agent';
  export class Telegram {
    ['storeSession'];
    constructor() {
      this.accountName = 'accounts';
      this.url = "https://b.bittime.com/exchange-web-gateway/tg-mini-app/login?appName=Netscape&appCodeName=Mozilla&appVersion=5.0+(Macintosh%3B+Intel+Mac+OS+X+10_15_7)+AppleWebKit%2F605.1.15+(KHTML,+like+Gecko)&userAgent=Mozilla%2F5.0+(Macintosh%3B+Intel+Mac+OS+X+10_15_7)+AppleWebKit%2F605.1.15+(KHTML,+like+Gecko)&cookieEnabled=true&platform=MacIntel&userLanguage=en-GB&vendor=Apple+Computer,+Inc.&onLine=true&product=Gecko&productSub=20030107&mimeTypesLen=2&pluginsLen=5&javaEnbled=false&windowScreenWidth=1440&windowScreenHeight=900&windowColorDepth=24";
      this.bot = "plpa_tap_to_earn_bot";
    }
    async ['init']() {
      try {
        await this.onBoarding();
      } catch (_0x984d4b) {
        console.log(_0x984d4b);
        a3_0x5addbc.error('' + JSON.stringify(_0x984d4b));
        throw _0x984d4b;
      }
    }
    async ['onBoarding']() {
      try {
        let _0x18cda3 = "Welcome to Bot \nBy : AirdropInsider \n \nLets getting started.\n \nYour Session List:\n";
        const _0x44e53d = Helper.getSession("accounts");
        if (_0x44e53d.length == 0x0) {
          _0x18cda3 += '<empty>';
        } else {
          for (const _0x40d6da of _0x44e53d) {
            _0x18cda3 += "- " + _0x40d6da + "\n";
          }
        }
        _0x18cda3 += "\n \nPlease Choose a menu: \n";
        _0x18cda3 += "\n \n1. Create Account \n2. Reset Account \n3. Start Bot\n4. Query modification\n \nInput your choice :";
        const _0xa9e9e4 = await a3_0x309651.text(_0x18cda3);
        if (_0xa9e9e4 == 0x1) {
          await this.accountType();
        } else {
          if (_0xa9e9e4 == 0x2) {
            Helper.resetAccounts();
            await Helper.delay(0xbb8);
            await this.onBoarding();
          } else {
            if (_0xa9e9e4 == 0x3) {
              if (Helper.getSession(this.accountName)?.['length'] == 0x0) {
                console.info("You don't have any Accounts, please create first");
                await this.onBoarding();
              }
            } else if (_0xa9e9e4 == 0x4) {
              await this.queryModificaiton();
            } else {
              console.error("Invalid input, Please try again");
              await this.onBoarding();
            }
          }
        }
      } catch (_0x5f39bf) {
        throw _0x5f39bf;
      }
    }
    async ['queryModificaiton']() {
      try {
        const _0x49e8b1 = Helper.getSession('accounts');
        const _0x5d1642 = _0x49e8b1.filter(_0x1fc8cf => _0x1fc8cf.includes("query"));
        let _0x570d2a = "Your Query Account List :\n \n";
        for (const _0x583847 of _0x5d1642) {
          _0x570d2a += _0x49e8b1.indexOf(_0x583847) + 0x1 + ". " + _0x583847 + "\n";
        }
        if (_0x5d1642.length == 0x0) {
          console.log("You dont have any Query Account.");
          await this.onBoarding();
        } else {
          _0x570d2a += "\n \nPlease Select Query Account for modification:";
        }
        const _0x2cd544 = await a3_0x309651.text(_0x570d2a);
        if (_0x5d1642[_0x2cd544 - 0x1] != undefined) {
          const _0x7bbd0d = _0x5d1642[_0x2cd544 - 0x1];
          this.accountName = 'accounts/' + _0x7bbd0d;
          const _0x5055e8 = "Old Query : " + Helper.readQueryFile(this.accountName + "/query.txt") + "\n \nPlease Enter New Query ";
          const _0x42b081 = await a3_0x309651.text(_0x5055e8);
          await Helper.saveQueryFile(this.accountName, _0x42b081);
          await Helper.delay(0xbb8);
          await this.onBoarding();
        } else {
          console.error("Invalid input, Please try again");
          await this.queryModificaiton();
        }
      } catch (_0x289560) {
        throw _0x289560;
      }
    }
    async ['sessionCreation']() {
      try {
        if (Config.TELEGRAM_APP_ID == undefined || Config.TELEGRAM_APP_HASH == undefined) {
          throw new Error("Please configure your TELEGRAM_APP_ID and TELEGRAM_APP_HASH first");
        }
        const _0x5d84ee = Helper.getSession("accounts");
        let _0x356aa4 = "Your Account List :\n \n";
        for (const _0x4e0af6 of _0x5d84ee) {
          _0x356aa4 += _0x5d84ee.indexOf(_0x4e0af6) + 0x1 + ". " + _0x4e0af6 + "\n";
        }
        if (_0x5d84ee.length == 0x0) {
          _0x356aa4 += "<empty> \n \nPlease enter Session Name :";
        } else {
          _0x356aa4 += "\n \nYou already have sessions, cancel(CTRL+C) or create new Session :";
        }
        const _0x1d54ac = await a3_0x309651.text(_0x356aa4);
        this.accountName = Helper.createDir('sessions-' + _0x1d54ac);
        await this.useSession(this.accountName);
        await this.disconnect();
        a3_0x5addbc.info("Session " + this.accountName + " - Created");
        console.log("Session " + _0x1d54ac + " - Created, Please Restart The Bot Again");
        this.storeSession.save();
        await Helper.delay(0xbb8);
        process.exit();
      } catch (_0x3d12db) {
        throw _0x3d12db;
      }
    }
    async ['queryCreation']() {
      try {
        const _0x25f862 = Helper.getSession("accounts");
        let _0x1b4774 = "Your Account List :\n \n";
        for (const _0x37fd84 of _0x25f862) {
          _0x1b4774 += _0x25f862.indexOf(_0x37fd84) + 0x1 + ". " + _0x37fd84 + "\n";
        }
        if (_0x25f862.length == 0x0) {
          _0x1b4774 += "<empty> \n \nPlease enter Account Name :";
        } else {
          _0x1b4774 += "\n \nYou already have Account, cancel(CTRL+C) or create new Account :";
        }
        const _0x8a7b79 = await a3_0x309651.text(_0x1b4774);
        this.accountName = Helper.createDir('query-' + _0x8a7b79);
        const _0x248b63 = await a3_0x309651.text("Please Enter Telegram Query : ");
        await Helper.saveQueryFile(this.accountName, _0x248b63);
        a3_0x5addbc.info("Query " + this.accountName + " - Created");
        console.log("Query " + _0x8a7b79 + " - Created, Please Restart The Bot Again");
        await Helper.delay(0xbb8);
        process.exit();
      } catch (_0x1cf6a3) {
        throw _0x1cf6a3;
      }
    }
    async ['accountType']() {
      try {
        const _0x3180ba = Helper.getSession('accounts');
        let _0x529ab8 = "Your Account List :\n \n";
        if (_0x3180ba.length > 0x0) {
          for (const _0x10a6d4 of _0x3180ba) {
            _0x529ab8 += _0x3180ba.indexOf(_0x10a6d4) + 0x1 + ". " + _0x10a6d4 + "\n";
          }
        } else {
          _0x529ab8 += "<empty>\n";
        }
        _0x529ab8 += "\n \nAvailable Account Type: \n1. Session \n2. Query\n \nPlease Entery Your Choice : ";
        const _0x370684 = await a3_0x309651.text(_0x529ab8);
        if (_0x370684 == 0x1) {
          await this.sessionCreation();
        } else {
          if (_0x370684 == 0x2) {
            await this.queryCreation();
          } else {
            console.log("Invalid Input");
            await this.accountType();
          }
        }
      } catch (_0x1ef7dd) {
        throw _0x1ef7dd;
      }
    }
    async ["useSession"](_0x4608aa, _0x3f5c8b) {
      try {
        this.proxy = _0x3f5c8b;
        const _0x52df55 = {
          'connectionRetries': 0x5
        };
        if (this.proxy) {
          _0x52df55.agent = new HttpsProxyAgent(this.proxy);
        }
        this.storeSession = new StoreSession(_0x4608aa);
        this.client = new TelegramClient(this.storeSession, Config.TELEGRAM_APP_ID, Config.TELEGRAM_APP_HASH, _0x52df55);
        this.storeSession.save();
        await this.client.start({
          'phoneNumber': async () => await a3_0x309651.text("Enter your Telegram Phone Number ?"),
          'password': async () => await a3_0x309651.text("Enter your Telegram Password?"),
          'phoneCode': async () => await a3_0x309651.text("Enter your Telegram Verification Code ?"),
          'onError': _0xf245e2 => {
            console.log(_0xf245e2.message);
          }
        });
      } catch (_0x513ce7) {
        throw _0x513ce7;
      }
    }
    async ['resolvePeer']() {
      try {
        a3_0x5addbc.info("Session " + this.session + " - Resolving Peer");
        while (this.peer == undefined) {
          try {
            this.peer = await this.client.getEntity(this.bot);
            break;
          } catch (_0x32e644) {
            if (_0x32e644 instanceof FloodWaitError) {
              const _0x13f93c = _0x32e644.seconds;
              a3_0x5addbc.warn(this.client.session.serverAddress + " | FloodWait " + _0x32e644);
              a3_0x5addbc.info(this.client.session.serverAddress + " | Sleep " + _0x13f93c + 's');
              await Helper.delay((_0x13f93c + 0x3) * 0x3e8);
            } else {
              throw _0x32e644;
            }
          }
        }
      } catch (_0x5d3435) {
        throw _0x5d3435;
      }
    }
    async ['initWebView']() {
      try {
        const _0xa4e9c8 = await this.client.invoke(new Api.messages.RequestWebView({
          'peer': this.peer,
          'bot': this.peer,
          'fromBotMenu': true,
          'url': this.url,
          'platform': "android"
        }));
        a3_0x5addbc.info("Session " + this.session + " - Webview Connected");
        const _0x3e804c = _0xa4e9c8.url;
        return Helper.getTelegramQuery(_0x3e804c, 0x3);
      } catch (_0xf15db9) {
        throw _0xf15db9;
      }
    }
    async ['disconnect']() {
      await this.client.disconnect();
      await this.client.destroy();
      this.peer = undefined;
      this.accountName = undefined;
    }
  }