const ReservationEvent = require("../models/reservationStatusEvent");
const ReservationCatalog = require("../models/reservationCatalog");
const createError = require("../../utils/error");
class ReservationEventController {
  index(req, res) {
    res.send("Hello from room");
  }
  async createReservationStatusEvent(req, res, next) {
    const newReservationEvent = new ReservationEvent(req.body);
    try {
      const savedReservationEvent = await newReservationEvent.save();
      res.status(200).json(savedReservationEvent);
    } catch (err) {
      next(err);
    }
  }
  async updateReservationStatusEvent(req, res, next) {
    try {
      const updatedReservationEvent = await ReservationEvent.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (!updatedReservationEvent) return next(createError(404, "Not Found"));
      res.status(200).json(updatedReservationEvent);
    } catch (err) {
      next(err);
    }
  }

  async deleteReservationStatusEvent(req, res, next) {
    try {
      const deletedReservationEvent = await ReservationEvent.findByIdAndDelete(
        req.params.id
      );
      if (!deletedReservationEvent) return next(createError(404, "Not Found"));
      res.status(200).json("reservation has been deleted");
    } catch (err) {
      next(err);
    }
  }

  async getReservationStatusEvent(req, res, next) {
    try {
      const reservation = await ReservationEvent.findById(req.params.id);
      if (!reservation) return next(createError(404, "Not Found"));
      res.status(200).json(reservation);
    } catch (err) {
      next(err);
    }
  }

  async getAllReservationStatusEvent(req, res, next) {
    try {
      const reservationEvents = await ReservationEvent.find();
      res.status(200).json(reservationEvents);
    } catch (err) {
      //res.status(500).json(err)
      next(err);
    }
  }

  async cancelReservationStatus(req, res, next) {
    try {
      console.log(req.params.reservationId);
      const reservationEvent = await ReservationEvent.findOne({
        reservationId: req.params.reservationId,
      });
      const cancelReservationEvent = await ReservationCatalog.findOne({
        statusName: "cancel",
      });
      const updatedReservationEvent = await ReservationEvent.findByIdAndUpdate(
        reservationEvent._id,
        { $set: { reservationStatusCatalogId: cancelReservationEvent._id } },
        { new: true }
      );
      res.status(200).json(updatedReservationEvent);
    } catch (err) {
      //res.status(500).json(err)
      next(err);
    }
  }
}

module.exports = new ReservationEventController();
