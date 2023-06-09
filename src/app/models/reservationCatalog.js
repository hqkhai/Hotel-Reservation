const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationCatalog = new Schema(
  {
    statusName: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "reservation_status_catalog",
  reservationCatalog
);
