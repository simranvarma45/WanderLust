const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const {validateReview, isLoggedIn , isAuthor}=require("../middleware.js");
const reviewController = require("../controllers/review.js");

//Post Review Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.reviewCreated));

//Delete Review Route
router.delete("/:reviewId", isLoggedIn , isAuthor ,wrapAsync(reviewController.reviewDestroy));
module.exports=router;