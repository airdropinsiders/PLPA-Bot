  import { createLogger, format, transports } from 'winston';
  import a5_0x24254b from 'fs';
  const {
    combine,
    timestamp,
    printf,
    colorize
  } = format;
  const customFormat = printf(({
    level: _0x3b8e3a,
    message: _0x3a0d05,
    timestamp: _0x415bbc
  }) => {
    return _0x415bbc + " [" + _0x3b8e3a + "]: " + _0x3a0d05;
  });
  class Logger {
    constructor() {
      this.logger = createLogger({
        'level': 'debug',
        'format': combine(timestamp({
          'format': "YYYY-MM-DD HH:mm:ss"
        }), colorize(), customFormat),
        'transports': [new transports.File({
          'filename': 'log/app.log'
        })],
        'exceptionHandlers': [new transports.File({
          'filename': 'log/app.log'
        })],
        'rejectionHandlers': [new transports.File({
          'filename': 'log/app.log'
        })]
      });
    }
    ["info"](_0x1db95c) {
      this.logger.info(_0x1db95c);
    }
    ['warn'](_0x57264a) {
      this.logger.warn(_0x57264a);
    }
    ["error"](_0x14033b) {
      this.logger.error(_0x14033b);
    }
    ["debug"](_0x5805b0) {
      this.logger.debug(_0x5805b0);
    }
    ["setLevel"](_0x130b79) {
      this.logger.level = _0x130b79;
    }
    ['clear']() {
      a5_0x24254b.truncate('log/app.log', 0x0, _0x1f3203 => {
        if (_0x1f3203) {
          this.logger.error("Failed to clear the log file: " + _0x1f3203.message);
        } else {
          this.logger.info("Log file cleared");
        }
      });
    }
  }
  export default new Logger();