  import { Twisters } from 'twisters';
  import a6_0x560491 from './logger.js';
  import { Core } from '../core/core.js';
  class Twist {
    constructor() {
      this.twisters = new Twisters();
    }
    ["log"](_0x497b3f = '', _0x2ce491 = '', _0x58d35d = new Core(), _0x207b7a) {
      if (_0x207b7a == undefined) {
        a6_0x560491.info(_0x2ce491.id + " - " + _0x497b3f);
        _0x207b7a = '-';
      }
      const _0x4c48ea = _0x58d35d.user ?? {};
      const _0x395218 = _0x4c48ea.coin ?? '-';
      this.twisters.put(_0x2ce491.id, {
        'text': "\n================= Account " + _0x2ce491.id + " =============\nName     : " + (_0x2ce491.firstName ?? 'Unamed') + " " + (_0x2ce491.lastName ?? '') + " \nCoin     : " + _0x395218 + "\n\nStatus : " + _0x497b3f + "\nDelay : " + _0x207b7a + "\n=============================================="
      });
    }
    ['info'](_0x38dd5e = '') {
      this.twisters.put(0x2, {
        'text': "\n==============================================\nInfo : " + _0x38dd5e + "\n=============================================="
      });
      return;
    }
    ["clearInfo"]() {
      this.twisters.remove(0x2);
    }
    async ["clear"](_0x459084) {
      await this.twisters.flush();
    }
  }
  export default new Twist();