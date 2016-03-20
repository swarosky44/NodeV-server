module.exports = {
  server: 'http://172.26.141.121:9080/e4s-mp',
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
      },
      {
        "type": "dateFile",
        "filename": "logs/record.log",
        "alwaysIncludePattern": true,
        "pattern": "-yyyy-MM-dd"
      }
    ],
    "replaceConsole": true,
    "levels": {
      "error": "error"
    }
  }
}