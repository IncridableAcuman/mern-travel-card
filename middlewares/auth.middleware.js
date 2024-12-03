const BaseErrors = require("../errors/base.error");
const tokenService = require("../services/token.service");
module.exports = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      next(BaseErrors.Unauthorized());
    }
    const accessToken = authorization.split(" ")[1];
    if (!accessToken) {
      next(BaseErrors.Unauthorized());
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      next(BaseErrors.Unauthorized());
    }
    req.user = userData;
    next();
  } catch (error) {
    next(BaseErrors.Unauthorized());
  }
};
