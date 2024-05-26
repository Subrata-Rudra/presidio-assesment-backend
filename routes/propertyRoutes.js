const express = require("express");
const {
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
} = require("../controllers/propertyControllers");
const router = express.Router();

router.route("/add").post(addProperty);
router.route("/viewAll").get(viewAllProperty);
router.route("/viewAllofSeller").get(viewAllPropertyOfSeller);
router.route("/update").post(updateProperty);
router.route("/remove").get(removeProperty);
router.route("/getByLocation").post(getAllByLocation);
router.route("/getByArea").post(getAllByArea);
router.route("/getByPin").post(getAllByPin);
router.route("/getByBedrooms").post(getAllByBedrooms);
router.route("/getByBathrooms").post(getAllByBathrooms);
router.route("/getByHospitalDistance").post(getAllByHospitalDistance);
router.route("/getByCollegeDistance").post(getAllByCollegeDistance);

module.exports = router;
