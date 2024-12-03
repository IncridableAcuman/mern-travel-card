const travelService = require("../services/travel.service");

class TravelController {
  async getTravels(req, res, next) {
    try {
      const travel = await travelService.getTravels();
      return res.status(200).send(travel);
    } catch (error) {
      next(error);
    }
  }
  async createTravel(req, res, next) {
    try {
      const travel = await travelService.createTravel(req.body, req.user.id);
      res.status(201).send(travel);
    } catch (error) {
      next(error);
    }
  }
  async editTravel(req, res, next) {
    try {
      const { body, params } = req;
      const travel = await travelService.editTravel(body, params.id);
      res.status(200).send(travel);
    } catch (error) {
      next(error);
    }
  }
  async deleteTravel(req, res, next) {
    try {
      const travel = await travelService.deleteTravel(req.params.id);
      res.status(200).json(travel);
    } catch (error) {
      next(error);
    }
  }
  async getOneTravel(req, res, next) {
    try {
      const travel = await travelService.getOneTravel(req.params.id);
      res.status(200).json(travel);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new TravelController();
