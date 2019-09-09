var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var app = express();

// APP CONFIG
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true});

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema(
    {
        title: String,
        image: String,
        body: String,
        created: {type: Date, default: Date.now}
    }
);
var Blog = mongoose.model("Blog",blogSchema);
/*Blog.create({
    title: "This is the Cat blog",
    image:"data:image/jpeg;base64,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",
    body:"Hello I am a Black Cat"

}); */

// ROUTES RESTFUL
app.get("/",function(req,res){
    res.redirect("/blogs");
});

//INDEX ROUTE
app.get("/blogs",function(req, res){
    Blog.find({},function(err, blogs){
        if(err){
            console.log(err);
        }
        else{
            res.render("index", {blogs: blogs})
        }
    });

});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new");
});

//CREATE ROUTE
app.post("/blogs", function(req,res){
  //  var datacheck = req.body.blog.title;
  //  console.log(datacheck);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        }
        else{
            res.redirect("/blogs");
        }
    });
});

//SHOW ROUTE
app.get("/blogs/:id", function(req,res){
    Blog.findById(req.params.id , function(err , foundBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("show", {blog: foundBlog});
        }
    });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.render("edit", {blog: foundBlog});
        }
    });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req,res){
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       if(err)
       {
           res.redirect("/blogs");
       }
       else {
           res.redirect("/blogs/" + req.params.id);
       }
   });
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req,res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        }
        else{
            res.redirect("/blogs");
        }
    });

});

app.listen(3000, function(){
    console.log("Server started!");
});