const db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = {
  scrape: function(req, res) {

    axios
      .get("https://www.indeed.com/jobs?q=" + req.body.name + "&l=Atlanta%2C+GA")
      .then(function(response) {
        var $ = cheerio.load(response.data);

        $(".result[data-tn-component='organicJob']").each(function(i, element) {
          var result = {};

          result.title = $(this)
            .children("h2")
            .text()
            .trim();

          result.company = $(this)
            .children("span.company")
            .text()
            .trim();

          result.location = $(this)
            .children("span.location")
            .text()
            .trim();

          result.description = $(this)
            .children("table")
            .last(".summary")
            .text()
            .trim()
            .split("...")[0];

          result.link =
            "https://www.indeed.com" +
            $(this)
              .children("h2")
              .children("a")
              .attr("href");

          // Create a new Job using the `result` object built from scraping
          console.log( "RESULT!!!", result );
          db.Job.create(result)
            .then(function(dbJob) {
              db.Technology.findByIdAndUpdate(req.body.id,{$push: {jobs: dbJob._id }})
            })
            .catch(function(err) {
              // If an error occurred, send it to the client
              console.log( err )
              return res.json(err);
            });
        });
        // If we were able to successfully scrape and save an Job, send a message to the client
        res.send("Scrape Complete");
      });
  }
};