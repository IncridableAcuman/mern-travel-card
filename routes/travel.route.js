const express = require("express");
const Travel = require("../models/travel.models");
const travelController = require("../controllers/travel.controller");
const travelMiddleware = require("../middlewares/travel.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const authorMiddleware = require("../middlewares/author.middleware");

const router = express.Router();

router.get("/api/get-all", travelController.getTravels);
router.post("/api/post", authMiddleware, travelController.createTravel);
router.put(
  "/api/edit/:id",
  authMiddleware,
  authorMiddleware,
  travelController.editTravel
);
router.delete(
  "/api/delete/:id",
  authMiddleware,
  authorMiddleware,
  travelController.deleteTravel
);
router.get("/api/get-one/:id", travelMiddleware, travelController.getOneTravel);

module.exports = router;
