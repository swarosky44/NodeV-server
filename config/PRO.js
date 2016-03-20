module.exports = {
  server: 'http://e4s.stg.dongfeng-nissan.com.cn/e4s-mp',
  db: {
    secret: 'abc123!!',
    host: '127.0.0.1',
    port: 6379
  },
  log: {
    "appenders": [
      { "type": "console" },
      {
        "type": "file",
        "filename": "logs/error.log",
        "maxLogSize": 2097152,
        "backup": 10,
        "category": "error"
      }
    ],
    "replaceConsole": true,
    "levels": {
      "error": "error"
    }
  }
}