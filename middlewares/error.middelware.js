const BaseErrors = require("../errors/base.error");
module.exports = (err, req, res, next) => {
  if (err instanceof BaseErrors) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Internal Server Error" });
};
