const BaseErrors = require("../errors/base.error");
const AuthService = require("../services/user.service");
const { validationResult } = require("express-validator");
class AuthController {
  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(BaseErrors.BadRequest("Error with validation", errors.array()));
      }
      const { email, password } = req.body;
      const user = await AuthService.register(email, password);
      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true, //tokenni muddatini belgilash
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.login(email, password);
      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true, //tokenni muddatini belgilash
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async activation(req, res, next) {
    try {
      const userId = req.params.id; //userni isActivated hossani true qilish bu bilan
      await AuthService.activation(userId); //foydalanuvchiga saytda o'tish uchun xabar jo'natiladi
      return res.redirect("http://localhost:5173"); //
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await AuthService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
  async refresh(req, res, next) {
    //tokenni har safar almashtirish
    try {
      const { refreshToken } = req.cookies;
      const user = await AuthService.refresh(refreshToken);
      res.cookie("refreshToken", user.refreshToken, {
        httpOnly: true, //tokenni muddatini belgilash
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const user = await AuthService.getUser();
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const { data } = await AuthService.forgotPassword(req.body.email);
      return res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }
  async recoveryAccount(req, res, next) {
    try {
      const { token, password } = req.body;
      await AuthService.recoveryAccount(token, password);
      return res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new AuthController();
