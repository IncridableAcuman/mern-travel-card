const PostDto = require("../dtos/post.dto");
const BaseErrors = require("../errors/base.error");
const Travel = require("../models/travel.models");
class TravelService {
  async getTravels() {
    const travel = await Travel.find().populate("author"); //userId ni ochish
    return travel;
  }
  async createTravel(post, author) {
    const travel = await Travel.create({ ...post, author });
    return travel;
  }
  async editTravel(post, id) {
    if (!id) {
      throw BaseErrors.BadRequest("User not found");
    }
    const travel = await Travel.findByIdAndUpdate(id, post, { new: true });
    return travel;
  }
  async deleteTravel(id) {
    if (!id) {
      throw BaseErrors.BadRequest("User not found");
    }
    const travel = await Travel.findByIdAndDelete(id);
    return travel;
  }
  async getOneTravel(id) {
    if (!id) {
      throw BaseErrors.BadRequest("User not found");
    }
    const travel = await Travel.findById(id);
    return travel;
  }
}
module.exports = new TravelService();
