const express = require("express");
const AuthController = require("../controllers/user.controller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
  "/api/auth/register",
  body("password").isLength({ min: 3, max: 30 }),
  body("email").isEmail(),
  AuthController.register
);
router.post("/api/auth/login", AuthController.login);
router.get("/api/auth/activation/:id", AuthController.activation);
router.post("/api/auth/logout", AuthController.logout);
router.get("/api/auth/refresh", AuthController.refresh);
router.get("/api/get-users", authMiddleware, AuthController.getUser);
router.post("/api/forgot-password", AuthController.forgotPassword);
router.put("/api/recovery-account", AuthController.recoveryAccount);

module.exports = router;
