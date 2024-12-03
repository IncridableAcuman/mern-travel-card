module.exports = class BaseErrors extends Error {
  status;
  errors;

  constructor(status, message, errors) {
    super(message);
    (this.status = status), (this.errors = errors);
  }

  static Unauthorized() {
    return new BaseErrors(401, "User is not define");
  }

  static BadRequest(message, errors = []) {
    return new BaseErrors(400, message, errors);
  }
};
