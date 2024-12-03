module.exports = class {
  email;
  isActivated;
  id;
  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
};
