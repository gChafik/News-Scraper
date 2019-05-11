let express = require("express");
let axios = require("axios");
let cheerio = require("cheerio");
let mongoose = require("mongoose");
let logger = require("morgan");

let db = require("./models");

let PORT = process.env.PORT || 3000;

// Initialize Express
let app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/News-Scraper";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.get("/scrape", function(req, res){
    axios.get("https://news.ycombinator.com/")
    .then(function(response){
        let $ = cheerio.load(response.data);
        $(".title").each(function(i, element){
            let result = {};
            result.title = $(this)
            .children("a")
            .text();
            result.link = $(this)
            .children("a")
            .attr("href");

            db.Article.create(result)
            .then(function(dbArticle){
                console.log(dbArticle);
            })
            .catch(function(err){
                console.log(err)
            });
        });
        res.send("Scrape Complete");
        res.redirect("/");
    });
});
//Route for getting all articles from db
app.get("/articles", function(req, res){
    db.Article.find({})
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
});
//Route for grabbing a specific article and its note
app.get("/articles/:id", function(req, res){
    db.Article.findOne({_id: req.params.id})
    .populate("note")
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
});

//Route for saving Articles

app.put("/saved/:id", function(req, res) {

    db.Article
      .findByIdAndUpdate({ _id: req.params.id }, { $set: { saved: true }})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

//Route for getting saved articles
app.get("/saved", function(req, res) {

  db.Article
    .find({ saved: true })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

//Route for deleting saved articles
app.put("/delete/:id", function(req, res) {

    db.Article
      .findByIdAndUpdate({ _id: req.params.id }, { $set: { saved: false }})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {

  db.Note
    .create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});
  

app.listen(PORT, function(){
    console.log("App is running on port http://localhost:" + PORT);
})