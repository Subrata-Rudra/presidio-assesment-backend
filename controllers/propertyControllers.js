const Property = require("../models/propertyModel");

const addProperty = async (req, res) => {
  const {
    location,
    pin,
    area,
    bedrooms,
    bathrooms,
    hospitalDistance,
    collegeDistance,
    sellerDetails,
  } = req.body;
  if (
    !location ||
    !pin ||
    !area ||
    !bedrooms ||
    !bathrooms ||
    !hospitalDistance ||
    !collegeDistance ||
    !sellerDetails
  ) {
    res.status(400);
    throw new Error("Please enter all the required fields");
  }
  const propertyExist = await Property.findOne({
    location,
    pin,
    area,
    bedrooms,
    bathrooms,
    hospitalDistance,
    collegeDistance,
    sellerDetails,
  });

  if (propertyExist) {
    res.status(400).send("Property already exists.");
  }

  let property;
  property = await Property.create({
    location,
    pin,
    area,
    bedrooms,
    bathrooms,
    hospitalDistance,
    collegeDistance,
    sellerDetails,
  });

  if (property) {
    res.status(201).json({
      _id: property._id,
      location: property.location,
      pin: property.pin,
      area: property.area,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      hospitalDistance: property.hospitalDistance,
      collegeDistance: property.collegeDistance,
      sellerDetails: property.sellerDetails,
    });
  } else {
    res.status(500);
    throw new Error("Failed to add property.");
  }
};
const viewAllProperty = async (req, res) => {
  const allProperty = await Property.find();
  if (allProperty) {
    res.status(200).send(allProperty);
  } else {
    res.status(500);
    throw new Error("Failed to get all the properties.");
  }
};

const viewAllPropertyOfSeller = async (req, res) => {
  const sellerId = req.query.id;
  const allPropertyOfSeller = await Property.find({ sellerDetails: sellerId });
  if (allPropertyOfSeller) {
    res.status(200).send(allPropertyOfSeller);
  } else {
    res.status(500);
    throw new Error("Failed to get all the properties of the seller.");
  }
};

const updateProperty = async (req, res) => {
  const {
    id,
    location,
    pin,
    area,
    bedrooms,
    bathrooms,
    hospitalDistance,
    collegeDistance,
  } = req.body;
  const updatedProperty = await Property.findByIdAndUpdate(
    id,
    {
      location,
      pin,
      area,
      bedrooms,
      bathrooms,
      hospitalDistance,
      collegeDistance,
    },
    { new: true, runValidators: true }
  );

  if (updatedProperty) {
    res.status(200).send("Property is updated.");
  } else {
    res.status(404);
    throw new Error("Property not found.");
  }
};
const removeProperty = async (req, res) => {
  const id = req.query.id;
  const isDeleted = await Property.findByIdAndDelete(id);
  if (isDeleted) {
    res.status(200).send("Property deleted.");
  } else {
    res.status(404).send("Property not found.");
  }
};

const getAllByLocation = async (req, res) => {
  const { place } = req.body;
  const allProperties = await Property.find({ place: place });
  if (allProperties) {
    res.status(200).send(allProperties);
  } else {
    res.status(404).send("No properties found.");
  }
};

const getAllByArea = async (req, res) => {
  const { area } = req.body;
  const allProperties = await Property.find({ area: area });
  if (allProperties) {
    res.status(200).send(allProperties);
  } else {
    res.status(404).send("No properties found.");
  }
};

const getAllByPin = async (req, res) => {
  const { pin } = req.body;
  const allProperties = await Property.find({ pin: pin });
  if (allProperties) {
    res.status(200).send(allProperties);
  } else {
    res.status(404).send("No properties found.");
  }
};

const getAllByBedrooms = async (req, res) => {
  const { bedrooms } = req.body;
  const allProperties = await Property.find({ bedrooms: bedrooms });
  if (allProperties) {
    res.status(200).send(allProperties);
  } else {
    res.status(404).send("No properties found.");
  }
};

const getAllByBathrooms = async (req, res) => {
  const { bathrooms } = req.body;
  const allProperties = await Property.find({ bathrooms: bathrooms });
  if (allProperties) {
    res.status(200).send(allProperties);
  } else {
    res.status(404).send("No properties found.");
  }
};

const getAllByHospitalDistance = async (req, res) => {
  const { hospitalDistance } = req.body;
  const allProperties = await Property.find({
    hospitalDistance: hospitalDistance,
  });
  if (allProperties) {
    res.status(200).send(allProperties);
  } else {
    res.status(404).send("No properties found.");
  }
};

const getAllByCollegeDistance = async (req, res) => {
  const { collegeDistance } = req.body;
  const allProperties = await Property.find({
    collegeDistance: collegeDistance,
  });
  if (allProperties) {
    res.status(200).send(allProperties);
  } else {
    res.status(404).send("No properties found.");
  }
};

module.exports = {
  addProperty,
  viewAllProperty,
  viewAllPropertyOfSeller,
  updateProperty,
  removeProperty,
  getAllByLocation,
  getAllByArea,
  getAllByPin,
  getAllByBedrooms,
  getAllByBathrooms,
  getAllByHospitalDistance,
  getAllByCollegeDistance,
};
