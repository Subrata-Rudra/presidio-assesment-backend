const mongoose = require("mongoose");

const propertySchema = mongoose.Schema(
  {
    location: { type: String, required: true },
    pin: { type: Number, required: true },
    area: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    hospitalDistance: { type: Number, required: true },
    collegeDistance: { type: Number, required: true },
    sellerDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
