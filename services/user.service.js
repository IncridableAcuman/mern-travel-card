const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/user.dto");
const tokenService = require("../services/token.service");
const mailService = require("../services/mail.service");
const BaseErrors = require("../errors/base.error");

class AuthService {
  async register(email, password) {
    const userExist = await User.findOne({ email });
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashPassword });
    const userDto = new UserDto(user);

    // activatsiya xabarni jo'naitish
    await mailService.sendMail(
      email,
      `http://localhost:8000/api/auth/activation/${userDto.id}`
    );

    const tokens = tokenService.generateToken({ ...userDto }); //tokenni generatsiya qilganda foydalanuvchi
    await tokenService.saveToken(userDto.id, tokens.refreshToken); //malumotlarni berish va saqlash

    return { user: userDto, ...tokens };
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw BaseErrors.BadRequest("User is not found");
    }
    const isPswd = await bcrypt.compare(password, user.password);
    if (!isPswd) {
      throw BaseErrors.BadRequest("Password in correct");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto }); //tokenni generatsiya qilganda foydalanuvchi
    await tokenService.saveToken(userDto.id, tokens.refreshToken); //malumotlarni berish va saqlash

    return { user: userDto, ...tokens };
  }
  async activation(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw BaseErrors.BadRequest("User is not found");
    }
    user.isActivated = true;
    await user.save();
  }

  async logout(refreshToken) {
    return await tokenService.removeToken(refreshToken);
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw BaseErrors.Unauthorized("Bad authorized");
    }
    const userPayload = tokenService.validateRefreshToken(refreshToken);
    const tokenDb = tokenService.findtoken(refreshToken);
    if (!userPayload || !tokenDb) {
      throw new Error("Bad authorized");
    }
    const user = await User.findById(userPayload.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto }); //tokenni generatsiya qilganda foydalanuvchi
    await tokenService.saveToken(userDto.id, tokens.refreshToken); //malumotlarni berish va saqlash

    return { user: userDto, ...tokens };
  }

  async getUser() {
    return await User.find();
  }
  async forgotPassword(email) {
    if (!email) {
      throw BaseErrors.BadRequest("Email failed! Please try again");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw BaseErrors.BadRequest("Email failed! Please try again");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await mailService.sendForgotPassword(
      email,
      `http://localhost:5173/recovery-account/${tokens.accessToken}`
    );
    return 200;
  }
  async recoveryAccount(token, password) {
    if (!token) {
      throw BaseErrors.BadRequest("Something went wrong with token");
    }

    const userData = tokenService.validateAccessToken(token);
    if (!userData) {
      throw BaseErrors.Unauthorized();
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(userData.id, { password: hashPassword });
    return 200;
  }
}
module.exports = new AuthService();
