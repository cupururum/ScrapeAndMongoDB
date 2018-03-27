const express = require('express')
const router = express.Router()
const db = require('../models')
const request = require("request")
const cheerio = require("cheerio")

router.get("/", function(req, res) {
    res.render("index")


});

router.get("/scrape", function(req, res){
    var temporaryId = 0
    request("https://arstechnica.com/", function(error, response, html) {
        var $ = cheerio.load(html);
        var results = [];
        $("article header").each(function(i, element) {

            var headline = $(this).children("h2").text();

            var link = $(this).children("h2").children("a").attr("href");
            var summary = $(this).children(".excerpt").text();
            temporaryId++ 

            results.push({
            headline: headline,
            summary: summary,
            link: link,
            temporaryId: temporaryId
            });
        });

        res.render("index", {articles: results})
        console.log("********* refresh **********");
        console.log(results);
        });

})

router.get("/saved", function(req, res) {
    db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.render("saved", {articles: dbArticle})
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
        
})

router.post("/articles", function(req, res){
    console.log(req.body)
    db.Article.create(req.body)
    .then(function(dbArticle) {
       console.log("saved article, ", dbArticle)
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      return res.json(err);
    });
})

router.delete("/articles/:id", function(req, res){
    var articleId = req.params.id
    db.Article.findByIdAndRemove(articleId)
    .then(function(dbArticle) {
      // View the added result in the console
      //res.redirect("/saved")
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      return res.json(err);
    });
})

module.exports = router