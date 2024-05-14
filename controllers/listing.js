const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index=async (req, res, next) => {
    let allListings = await Listing.find({});
    res.render("./listing/index.ejs", { allListings });

};

module.exports.renderNewForm = (req, res, next) => {
    res.render("./listing/new.ejs");
};

module.exports.showListing = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
    .populate({path:"reviews",populate:{path:"author"}})
    .populate("owner");
    if (!listing) {
        req.flash("error", "Listing does not exist!");
        res.redirect("/listing");
    }
    res.render("./listing/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {

    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send();
      
    let url = req.file.path;
    let filename= req.file.filename;
    let listing = new Listing(req.body.listing);
    listing.owner=req.user._id;
    listing.image = {url,filename};
    listing.geometry = response.body.features[0].geometry;
    listing = await listing.save();
   
    req.flash("success", "new listing added!");
    res.redirect("/listing");
};

module.exports.editListing = async (req, res, next) => {
    let { id } = req.params;
    let list = await Listing.findById(id);
    if (!list) {
        req.flash("error", "Listing does not exist!");
        res.redirect("/listing");
    }
    let originalImageUrl = list.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_200,w_200");
    res.render("./listing/edit.ejs", { list , originalImageUrl });
};

module.exports.updateListing = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if( typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename= req.file.filename;
    listing.image = { url, filename };
    await listing.save();
    }
    req.flash("success", "listing updated successfully");
    res.redirect(`/listing/${id}`);

};

module.exports.deleteListing = async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted");
    res.redirect("/listing");
};