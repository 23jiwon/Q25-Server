const express = require("express");
const {logger} = require("./config/winston");
const recordService = require("./src/model/Record/recordService");

require('dotenv').config();
const port = process.env.port;
express().listen(port);
logger.info(`${process.env.NODE_ENV } - API Server Start At port ${port}`);

// recordService.updateOpened();