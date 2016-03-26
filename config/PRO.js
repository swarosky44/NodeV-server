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
      }
    ],
    "replaceConsole": true,
    "levels": {
      "error": "error"
    }
  }
}