//create web server
var express = require("express");
var router = express.Router();
//connect to mongodb
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/MyDataBase");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
});
//create schema
var commentSchema = mongoose.Schema({
  Name: String,
  Comment: String
});
//create model
var Comment = mongoose.model("Comment", commentSchema);
//create function
router.post("/comment", function(req, res, next) {
  var newComment = new Comment(req.body);
  newComment.save(function(err, comment) {
    if (err) return console.error(err);
    console.log(comment);
    res.sendStatus(200);
  });
});
//export router
module.exports = router;