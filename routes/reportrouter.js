const express = require("express");

const reportRouter = express.Router();

// Controllers
const {
  createResearch,
  getHistory,
  deleteHistory,
} = require("../controller/research.controller");

const {
  validateResearchRequest,
  validateMongoId,
} = require("../validators/report.validator");

// POST /api/research
reportRouter.post("/research", validateResearchRequest, createResearch);

// GET /api/history
reportRouter.get("/history", getHistory);

// DELETE /api/history/:id
reportRouter.delete("/history/:id", validateMongoId(), deleteHistory);

module.exports = reportRouter;
