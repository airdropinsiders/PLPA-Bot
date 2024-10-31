  import { API } from '../api/api.js';
  import { Helper } from '../utils/helper.js';
  export class Core extends API {
    constructor(_0x70ceb2, _0x43b7fd, _0xe2328c, _0x410d69) {
      super(_0x43b7fd, _0xe2328c, _0x410d69, 'https://b.bittime.com/exchange-web-gateway/tg-mini-app', 'b.bittime.com', "https://palapaminiapp.bittime.com");
      this.account = _0x70ceb2;
      this.query = _0x43b7fd;
      this.queryObj = _0xe2328c;
      this.body = _0x58d003 => {
        return {
          'initData': this.query,
          'uid': this.queryObj.user.id,
          'type': _0x58d003.toString()
        };
      };
    }
    async ['login'](_0x1566cd = false) {
      try {
        if (_0x1566cd) {
          await Helper.delay(0x3e8, this.account, "Try To Login...", this);
        }
        if (!this.queryObj.user.username) {
          throw Error("Please set Username to your Telegram Account first");
        }
        const _0xde7d7e = {
          'initData': this.query,
          'username': this.queryObj.username,
          'lang': 'en'
        };
        const _0x2e1edb = await this.fetch('/login', 'POST', undefined, _0xde7d7e);
        if (_0x2e1edb.rc == 0xc8) {
          this.user = _0x2e1edb.data;
          if (_0x1566cd) {
            await Helper.delay(0x3e8, this.account, "Successfully Login", this);
          }
        } else {
          throw Error("Login Failed");
        }
      } catch (_0x5e2a99) {
        throw _0x5e2a99;
      }
    }
    async ['getDailySignIn'](_0x44881a = false) {
      try {
        if (_0x44881a) {
          await Helper.delay(0x3e8, this.account, "Try to get Daily Sign In information...", this);
        }
        const _0x1c2590 = await this.fetch('/sign-in-page', 'GET', 'initData=' + encodeURIComponent(this.query) + '&uid=' + this.queryObj.user.id);
        if (_0x1c2590.rc == 0xc8) {
          this.daily = _0x1c2590.data;
          if (_0x44881a) {
            await Helper.delay(0x3e8, this.account, "Successfully get Daily Sign information", this);
          }
        } else {
          throw Error("Failed to get Daily Sign In information");
        }
      } catch (_0x3760ce) {
        throw _0x3760ce;
      }
    }
    async ['signIn']() {
      try {
        await Helper.delay(0x3e8, this.account, "Try to Daily Sign In...", this);
        const _0x1a9b0d = this.body(0x1);
        const _0x251ec1 = await this.fetch('/sign-in', 'POST', undefined, _0x1a9b0d);
        if (_0x251ec1.code == 0xc8) {
          this.daily = _0x251ec1.data;
          await this.login();
          await Helper.delay(0x3e8, this.account, "Successfully get Daily Sign information", this);
        } else {
          await Helper.delay(0x3e8, this.account, "User already Sign In", this);
        }
      } catch (_0x3ad9a5) {
        throw _0x3ad9a5;
      }
    }
    async ['getUserTask']() {
      try {
        await Helper.delay(0x3e8, this.account, "Try to get User Task List..", this);
        const _0xb6a62f = await this.fetch("/task-list", 'GET', "initData=" + encodeURIComponent(this.query) + '&uid=' + this.queryObj.user.id);
        if (_0xb6a62f.code == 0xc8) {
          this.task = _0xb6a62f.data;
          await Helper.delay(0x3e8, this.account, "Successfully get Task List information", this);
        } else {
          throw Error("Failed to get Task List Information");
        }
      } catch (_0x254ee4) {
        throw _0x254ee4;
      }
    }
    async ['completeTask'](_0x4e0624) {
      try {
        await Helper.delay(0x3e8, this.account, "Try to Completing Task Type " + _0x4e0624.key + "...", this);
        const _0x4da481 = this.body(_0x4e0624.value);
        const _0x2a681d = await this.fetch("/sign-in", 'POST', undefined, _0x4da481);
        if (_0x2a681d.code == 0xc8) {
          await this.login();
          await Helper.delay(0x3e8, this.account, "Successfully Complete Task Type " + _0x4e0624.key, this);
        } else {
          await Helper.delay(0x3e8, this.account, "Task " + _0x4e0624.key + " already Completed", this);
        }
      } catch (_0x453993) {
        throw _0x453993;
      }
    }
    async ['getAvailableMissions']() {
      try {
        await Helper.delay(0x3e8, this.account, "Getting Availbale Task...", this);
        const _0x1e8eb2 = await this.fetch('https://raw.githubusercontent.com/airdropinsiders/PLPA-Bot/refs/heads/main/task.json', "GET");
        delete _0x1e8eb2.rc;
        this.availableTask = _0x1e8eb2.available_task;
      } catch (_0x428171) {
        throw _0x428171;
      }
    }
    async ['tap'](_0x2791b2) {
      try {
        await Helper.delay(0x3e8, this.account, "Try to Tapping For " + _0x2791b2 + " X...", this);
        const _0x5f4654 = this.user.shakeCoin * _0x2791b2;
        const _0x14f1e8 = {
          'initData': this.query,
          'uid': this.queryObj.user.id,
          'shakeNum': _0x2791b2,
          'coin': _0x5f4654
        };
        const _0x2f6f93 = await this.fetch('/shake', 'POST', undefined, _0x14f1e8);
        if (_0x2f6f93.code == 0xc8) {
          await this.login();
          await Helper.delay(0x3e8, this.account, "Successfully Tapping For " + _0x2791b2 + " X Got " + _0x5f4654 + " Coin", this);
        } else {
          await Helper.delay(0x3e8, this.account, "Failed to tap", this);
        }
      } catch (_0x2def04) {
        throw _0x2def04;
      }
    }
  }