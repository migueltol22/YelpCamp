var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/", function (req, res) {

    // Get campgrounds from DB
    Campground.find({}, function (err, campgrounds) {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index" , {campgrounds: campgrounds});
        }
    });
});



router.post("/", middleware.isLoggedIn, function (req, res) {
    //get data from form to add to campgrounds
    // redirect back to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: description, author: author};
    // Creating new and saving campground to DB
    Campground.create(newCampground, function (err, newCampGround) {
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds", {newCampground: newCampGround});
        }
    });
});

router.get("/new", middleware.isLoggedIn,  function (req, res) {
    res.render("campgrounds/new");
});

// SHOW ROUTE
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});
// UPDATE CAMPGROUND ROUTE
// router.put("/:id", middleware.checkOwnership, function (req, res) {
//    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
//        if(err){
//            res.redirect("/campgrounds");
//        } else {
//            res.redirect("/campgrounds/" + req.params.id);
//        }
//    })
// });

// DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
});


module.exports = router;