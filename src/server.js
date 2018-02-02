"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
app.use(express.static('public'));
app.listen(3000, function () { return console.log('Example app listening on port 3000!'); });
//# sourceMappingURL=server.js.map