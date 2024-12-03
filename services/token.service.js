const jwt = require("jsonwebtoken");
const Token = require("../models/token.model");
class TokenService {
  generateToken(payload) {
    //shu f-ya orqali
    const accessToken = jwt.sign(payload, "tokenaccesskey", {
      expiresIn: "15m", ///tokenlarni generatsiya qilish jwt bilan
    }); //refresh va access tokenlar generatisyasi
    const refreshToken = jwt.sign(payload, "tokenrefreshkey", {
      expiresIn: "30d",
    });
    return { accessToken, refreshToken };
  }
  async saveToken(userId, refreshToken) {
    //tokenlar bazaga saqlash
    const existToken = await Token.findOne({ user: userId });
    if (existToken) {
      //foydalanuvchi bo'lsa
      existToken.refreshToken = refreshToken; //tokenlarni almashtiramiz
      return existToken.save(); //bazaga saqlash
    }
    const token = await Token.create({ user: userId, refreshToken }); //aks holda qaytadan yaratib olamiz
    return token;
  }
  async removeToken(refreshToken) {
    //tokenni o'chirish yani
    return await Token.findOneAndDelete(refreshToken); //bazadan token orqali topib o'chirish
  }
  async findtoken(refreshToken) {
    return await Token.findOne({ refreshToken });
  }
  validateAccessToken(token) {
    //tokenni ochish
    try {
      return jwt.verify(token, "tokenaccesskey");
    } catch (error) {
      return null;
    }
  }
  validateRefreshToken(token) {
    try {
      return jwt.verify(token, "tokenrefreshkey");
    } catch (error) {
      return null;
    }
  }
}
module.exports = new TokenService();
