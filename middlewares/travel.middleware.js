const validateTravel = (req, res, next) => {
  if (!req.params.id) {
    throw new Error("User in not defined");
  }
  next();
};
module.exports = validateTravel;
