module.exports = {
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