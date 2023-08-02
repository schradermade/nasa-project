const express = require("express");

const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} = require("./launches.controller");

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);
//  parameter syntax ("/:id")
launchesRouter.delete("/:id", httpAbortLaunch);

module.exports = launchesRouter;
