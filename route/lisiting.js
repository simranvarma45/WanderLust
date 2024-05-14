const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const lisitingController = require("../controllers/listing.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
  .get(wrapAsync(lisitingController.index))
  .post(isLoggedIn,
    upload.single('listing[image]') ,
    validateListing,
    wrapAsync(lisitingController.createListing));



//New Route
router.get("/new", isLoggedIn, lisitingController.renderNewForm);

router.route("/:id")
  .get(wrapAsync(lisitingController.showListing))
  .put(isLoggedIn, 
    isOwner, 
    upload.single("listing[image]"),
    validateListing,
     wrapAsync(lisitingController.updateListing))
  .delete(isOwner, isLoggedIn, wrapAsync(lisitingController.deleteListing));


//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(lisitingController.editListing));

module.exports = router;
