const commander = require("commander");
const fs = require("fs").promises;
const path = require("path");
const listSnippets = require("./handlers/list-snippet-names");
const showSnippet = require("./handlers/show-snippet");
const searchSnippets = require("./handlers/search-snippets");
const log = require("./logger/logger");

const parseLogLevel = function (value) {
  switch (value.toLowerCase()) {
    case "debug":
      return 10;
    case "info":
      return 20;
    case "warn":
      return 30;
    default:
      return 40;
  }
};
