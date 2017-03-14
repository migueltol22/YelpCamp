var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
        description: "blah blah blah blah"
    },
    {
        name: "Lanier",
        image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
        description: "blah blah blah blah"
    },
    {
        name: "Stone Mountain",
        image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
        description: "blah blah blah blah"
    }
];

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function (err) {
        // if(err)
        //     console.log(err);
        // else
        //     console.log("Database deleted");
        // data.forEach(function (seed) {
        //     Campground.create(seed, function (err, campground) {
        //         if(err)
        //             console.log(err);
        //         else
        //             console.log("Campground added");
        //         //Create a comment
        //         Comment.create({
        //             text: "This place is great but no wifi",
        //             author: "Homer"
        //         }, function (err, comment) {
        //             if(err)
        //                 console.log(err);
        //             else{
        //                 campground.comments.push(comment);
        //                 campground.save();
        //                 console.log("Created new comment");
        //             }
        //         });
        //     });
        // });
    });

}

module.exports = seedDB;

