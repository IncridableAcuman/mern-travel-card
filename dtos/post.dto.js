module.exports = class {
  picture;
  title;
  description;
  id;

  constructor(model) {
    this.picture = model.picture;
    this.title = model.title;
    this.description = model.description;
    this.id = model._id;
  }
};
