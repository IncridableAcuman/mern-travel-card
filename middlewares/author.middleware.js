const BaseErrors = require("../errors/base.error");
const Travel = require("../models/travel.models");

module.exports = async (req, res, next) => {
  try {
    const travel = await Travel.findById(req.params.id);
    const authorId = req.user.id;
    if (travel.author !== authorId) {
      next(BaseErrors.BadRequest("Only author can edit this post"));
    }
    next();
  } catch (error) {
    next(BaseErrors.BadRequest("Only author can edit this post"));
  }
};
