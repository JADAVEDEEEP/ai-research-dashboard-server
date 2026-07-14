const mongoose = require("mongoose");

const searchHistorySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Success", "Failed"],
      required: true,
    },

    responseTime: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SearchHistory", searchHistorySchema);